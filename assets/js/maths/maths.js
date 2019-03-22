generateEntropy = (subject) => {
    const result = getVotesMatrix(subject);

    const sumResult = new Array(result[0].length);
    sumResult.fill(0);
    result.forEach( (student, index) => {
        student.forEach( (vote, index) => {
            sumResult[index] += vote;
        });
    });
    
    normalizeVector(sumResult);

    return result;
}

getVotesMatrix = (subject) => {
    const result = [];

    // retrieve the sources / target students
    const sourceStudents = Object.keys(DataExtractor.getVotesBySubject(subject));
    const targetStudents = Object.keys(DataExtractor.getCountForStudentBySubject(subject));

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

    const studentMap = DataExtractor.getVotesByStudentAndSubject(student, subject);
    const keys = Object.keys(studentMap);

    const targetStudents = Object.keys(DataExtractor.getCountForStudentBySubject(subject));

    targetStudents.forEach( (targetStudent, index) => {
        if(!keys.includes(targetStudent)) result.push(0); // default value
        else result.push(studentMap[targetStudent]); 
    });

    return result;
}

klDivergence = (p1, p2) => {
    var klDiv = 0.0;
    for(let i = 0; i < p1.length; i++) {
        if(p1[i] == 0.0 || p2[i] == 0.0) continue;

        klDiv += p[i] * Math.log(p1[i] / p2[i]);
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

addVector = (vector1, vector2) => {
    var vector3 = vector1.slice(0);
    vector1.forEach( (value, index) => {
        vector3[index] = vector1[index] + vector2[index];
    });
    return vector3;
}
