generateEntropy = (subject, student) => {
    const matrix = getVotesMatrix(subject);

    globalRow = new Array(matrix[0].length);
    globalRow.fill(0);
    matrix.forEach( (student, index) => {
        student.forEach( (vote, index) => {
            globalRow[index] += vote;
        });
    });

    normalizeVector(globalRow);
    smoothVector(globalRow);

    voteRow = getVoteRow(subject, student);

    normalizeVector(voteRow);
    smoothVector(voteRow);

    console.log(voteRow);

    const maxValue = maxVectorValue(voteRow);
    if(maxValue == 0.0) {
        return 0.0;
    } else {
        return klDivergence(voteRow, globalRow);
    }
}

smoothVector = (vector) => {
    var avg = avgVector(vector);
    vector.forEach((value, index) => {
        var delta = (Math.abs(avg - value) * 0.0000001);
        if(avg - value > 0.0) {
            vector[index] = value + delta;
        } else {
            vector[index] = value - delta;
        }
    });
}

avgVector = (vector) => {
    var avg = 0.0;
    vector.forEach((value, index) => {
        avg += value;
    });
    avg /= vector.length;
    return avg;
}

getVotesMatrix = (subject) => {
    const result = [];

    // retrieve the sources / target students
    const sourceStudents = Object.keys(DataExtractor.getVotesBySubject(subject));

    sourceStudents.forEach( (sourceStudent, index) => {
        const votesForSourceStudent = getVoteRow(subject, sourceStudent);

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
        klDiv += p1[i] * Math.log(p1[i] / p2[i]);
    }

    klDiv = Math.exp(-klDiv * 0.5);

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

maxVectorValue = (vector) => {
    var max = 0.0;
    vector.forEach( (value, index) => {
        max = (value > max) ? value : max;
    });
    return max;
}