const data = votes;

class DataExtractor {

    static getSubjects() {
        var subjects = [];
        var firstStudent = Object.keys(data)[0]; //retrieve the first student to get all of the subjects
        
        for(var key in data[firstStudent]) {
            subjects.push(key);
        }

        return subjects;
    }

    static getVotesBySubject(subject) {
        var count = 0;

        for(var studentKey in data) {
            //student context
            var student = data[studentKey];
            for(var subjectKey in student) {
                //subject context
                if(subjectKey === subject) {
                    currentSubject = student[subjectKey];
                    count += currentSubject.length;
                }
            }
        }

        return count;
    }

    static getVotesByStudent(student) {
        
    }

    static getStudents() {
        var students = []
        for(var key in data) {
            students.push(key);
        }

        return students;
    }

    static getTargetVotes(student, subject) {
        var targets = [];

        for(var studentKey in data) {
            //stduent context
            var sourceStudient = data[studentKey];
            for(var subjectKey in sourceStudient) {
                //subject context
                var studentSubject = sourceStudient[subject];
                if(subjectKey === subject) {
                    for(var targetStudient in studentSubject) {
                        if(studentSubject[targetStudient] == student) {
                            targets.push(studentKey);
                        }
                    }
                }
            }
        }

        return targets;
    }

    static getAllTargetVotes(subject) {
        var votes = new Array();
        for(var student in data) {
                votes[student] = DataExtractor.getTargetVotes(student, subject);

        }

        return votes;
    }

    static getSourceVotes(student) {

    }
}