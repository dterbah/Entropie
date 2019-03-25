generateEntropy = (subject, student) => {
    const matrix = getVotesMatrix(subject);

    const globalRow = new Array(matrix[0].length);
    globalRow.fill(0);
    matrix.forEach( (student, index) => {
        student.forEach( (vote, index) => {
            globalRow[index] += vote;
        });
    });
    
    normalizeVector(globalRow);

    const voteRow = getVoteRow(subject, student);

    normalizeVector(voteRow);

    const divergence = klDivergence(voteRow, globalRow);

    return divergence;
}

getVotesMatrix = (subject) => {
    const result = [];

    // retrieve the sources / target students
    const sourceStudents = Object.keys(DataExtractor.getVotesBySubject(subject));
    const targetStudents = Object.keys(
        DataExtractor.sortedData(
        DataExtractor.getCountForStudentBySubject(subject))
    );

    sourceStudents.forEach( (sourceStudent, index) => {
        const votesForSourceStudent = [];
        const votes = DataExtractor.getVotesByStudentAndSubject(sourceStudent, subject);
        const keys = Object.keys(votes);

        targetStudents.forEach( (targetStudent, index) => {
            if(!keys.includes(targetStudent)) votesForSourceStudent.push(0);
            else votesForSourceStudent.push(votes[targetStudent]);
        });      
        
        normalizeVector(votesForSourceStudent);

        result.push(votesForSourceStudent);
    });

    return result;
}

getVoteRow = (subject, student) => {
    const result = [];

    const data = DataExtractor.getCountForStudentBySubject(subject);
    const sortedData = DataExtractor.sortedData(data);
    const targetStudents = Object.keys(sortedData);

    const studentMap = DataExtractor.getVotesByStudentAndSubject(student, subject);

    const keys = Object.keys(studentMap);

    targetStudents.forEach( (targetStudent, index) => {
        if(!keys.includes(targetStudent)) result.push(0); // default value
        else {
            result.push(studentMap[targetStudent]);
        } 
    });

    return result;
}

klDivergence = (p1, p2) => {
    var klDiv = 0.0;
    for(let i = 0; i < p1.length; i++) {
        if(p1[i] == 0.0 || p2[i] == 0.0) continue;

        klDiv += p1[i] * Math.log(p1[i] / p2[i]);
    }

    return klDiv;
}

normalizeVector = (vector) => {
    var max = 1.0;
    vector.forEach( (value, index) => {
        max = (value > max) ? value : max;
    });
    vector.forEach( (x, index) => {
        vector[index] = x / max;
    });
}
