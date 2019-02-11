const studentClass = "student-element";
const linkClass = "w3-bar-item w3-border-bottom ";

function initializeStudents() {
    //enter dynamicly the students
    const students = DataExtractor.getStudents();
    var studentDiv = $('.students-container');

    students.forEach((student, index) => {
        studentDiv.append('<div class="' + studentClass + '"><a href="" class="' + linkClass + '">' + student + '</a><br/></div>');
    });
}

$(document).ready(function() {
    initializeStudents(); //add the students at the beginning 
});

$(document).ready(function() {
    //filter elements 
    const students = DataExtractor.getStudents();
    const studentDiv = $('.students-container');

    $('.students-container input').on('keyup', function() {
        $('.students-container .' + studentClass).remove();
        var studentName = $(this).val();
        if(studentName === "") initializeStudents();
        else {
            const filteredStudents = students.beginWith(studentName);
            filteredStudents.forEach((student, index) => {
                studentDiv.append('<div class="' + studentClass + ' w3-row"><a href="" class="' + linkClass + '">' + student + '</a><br/></div>');             
            });
        }
    });
});