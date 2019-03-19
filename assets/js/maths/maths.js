function generalEntropy(name) {

}

generateEntropy = (subject, sourceStudents, targetStudents) => {
    const result = [];

    sourceStudents.forEach( (sourceStudent, index) => {
        const votesForSourceStudent = [];
        const votes = DataExtractor.getVotesByStudentAndSubject(sourceStudent, subject);
        const keys = Object.keys(votes);

        targetStudents.forEach( (targetStudent, index) => {
            if(!keys.includes(targetStudent)) votesForSourceStudent.push(0);
            else votesForSourceStudent.push(votes[targetStudent]);
        });      

        normalizeVector(votesForSourceStudent);

        console.log(sourceStudent, votesForSourceStudent);

        result.push(votesForSourceStudent);
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

function normalizeVector(vector) {
    var sum = 0.0;
    vector.forEach( (value, index) => {
        sum += value;
    });

    vector.map(x => x / sum);
}

function addVector(vector1, vector2) {
    var vector3 = vector1.slice(0);
    vector1.forEach( (value, index) => {
        vector3[index] = vector1[index] + vector2[index];
    });
    return vector3;
}
