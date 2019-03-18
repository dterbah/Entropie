const data = votes;
const JSON_STUDENTS_URL = "./assets/js/data/students.json";

class DataExtractor {

    static getSubjects() {
        var subjects = [];
        var firstStudent = Object.keys(data)[0]; //retrieve the first student to get all of the subjects
        
        for(var key in data[firstStudent]) {
            subjects.push(key);
        }

        return subjects;
    }

    // old version
    // static getVotesBySubject(subject) {
    //     var count = 0;

    //     for(var studentKey in data) {
    //         //student context
    //         var student = data[studentKey];
    //         for(var subjectKey in student) {
    //             //subject context
    //             if(subjectKey === subject) {
    //                 currentSubject = student[subjectKey];
    //                 count += currentSubject.length;
    //             }
    //         }
    //     }

    //     return count;
    // }


    //example of result
    // {
    //    'abreudia': ['vaurie', 'baaziz', ...],
    //     ...
    //}

    static getVotesBySubject(subject) {
        var result = {};

        for(var studentKey in data) {
            var allVotes = data[studentKey];

            //context of student -> all votes of this student
            for(var subjectKey in allVotes) {
                if((subjectKey == subject) && (allVotes[subjectKey].length)) {
                    result[studentKey] = allVotes[subjectKey];
                    break; //ugly
                }
            }
        }

        return result;
    }

    static getVotesBySubjects(subjects) {
        var result = {};
        var map;

        for(var studentKey in data) {
            var allVotes = data[studentKey];

            //context of student -> all votes of this student 
            map = {};
            for(var subjectKey in allVotes) {
                if(subjects.includes(subjectKey) && (allVotes[subjectKey].length)) {
                    map[subjectKey] = allVotes[subjectKey];                     
                }
            }
                            //add the result for each student who have voted
            if(!jQuery.isEmptyObject(map)) {
                result[studentKey] = map;
            }
        }

        return result;
    }

    //get the number of votes for a student for a subject
    static getCountByStudentAndSubject(student, subject) {
        //retrieve all of the votes for the subject
        var allVotes = DataExtractor.getVotesBySubject(subject);

        var count = 0;

        for(var studentKey in allVotes) {
            var votes = allVotes[studentKey];
            if(votes.includes(student)) {
                count++;
            }
        }

        return count;
    }

    static getVotesByStudentAndSubject(student, subject) {
        const map = {};

        const concernedData = data[student];

        for(const subjectKey in concernedData) {
            if(subjectKey == subject) {
                const votes = concernedData[subjectKey];
                votes.forEach( (value, index) => {
                    map[value] = 1; // default value
                });

                return map;
            }
        }
    }

    static getStudents() {
        var students = []
        for(var key in data) {
            students.push(key);
        }

        return students;
    }

    static getStudentsByJSON() {
        $.getJSON(JSON_STUDENTS_URL, (json) => {
        });
    }

    static getTargetStudentsBySubject(subject) {
        var targetStudents = [];

        var allVotes = DataExtractor.getVotesBySubject(subject);

        for(var studentKey in allVotes) {
            var votes = allVotes[studentKey];

            votes.forEach( ( student, index ) => {
                if(!targetStudents.includes(student)) {
                    targetStudents.push(student);
                }
            });
        }

        return targetStudents;
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

    static getCountForStudentBySubject(subject) {
        var result = {};
        var targetStudents = DataExtractor.getTargetStudentsBySubject(subject);

        targetStudents.forEach( (student, index) => {
            let count = DataExtractor.getCountByStudentAndSubject(student, subject);
            result[student] = count;
        });

        

        return result;
    }

    static sortedData(data) {
        const maxCount = Object.keys(data).length;
        const sortedMap = {};

        var currentMax = 0, currentStudentKey;

        for(let count = 0; count < maxCount; count++) {
            //retrieve the max at each loop
            
            // default values
            currentMax = 0;
            currentStudentKey = "";

            for(const student in data) {
                const studentCount = data[student];
                if(studentCount > currentMax) {
                    currentMax = studentCount;
                    currentStudentKey = student;
                }
            }

            sortedMap[currentStudentKey] = currentMax;
            delete data[currentStudentKey];
        }

        return sortedMap;
    }
}