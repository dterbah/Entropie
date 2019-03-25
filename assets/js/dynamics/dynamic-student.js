const studentClass = "student-element";
const linkClass = "w3-bar-item w3-border-bottom ";

function initializeStudents() {
    //enter dynamicly the students
    $('input').val(''); // set empty the inut search
    
    var studentDiv = $('.students-container');
    const students = DataExtractor.getStudents()//.beginWith(studentDiv.find('input').val());

    students.forEach((student, index) => {
        studentDiv.append('<div class="' + studentClass + '"><span class="' + linkClass + '">' + student + '</span><br/></div>');
    });
}

$(document).ready(function() {
    initializeStudents(); //add the students at the beginning 
});

$(document).ready(function() {
    //filter elements 
    const students = DataExtractor.getStudents();
    const studentDiv = $('.students-container');
    const allStudentDivs = $('.' + studentClass);

    $('.students-container input').on('keyup', function() {
        var studentName = $(this).val();
        const filteredStudents = students.beginWith(studentName);

        allStudentDivs.each( (index, div) => {
            const divText = $(div).text();
            if(!filteredStudents.includes(divText)) {
                $(div).css('display', 'none');
            } else {
                $(div).css('display', 'block');
            }
        });
    });
});