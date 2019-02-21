const SUBJECT_SEPARATOR_FOR_REDIRECTION = "|";
const RESULT_URL = "result.php";

$(document).ready(function() {
    $('.' + studentClass).on('click', function(event) {
        var activeSubjects = getActiveSubjects();
        if(activeSubjects.length == 0) {
            $('.w3-modal').css('display', 'block');
        }

        const student = $(this).text();

        redirect(RESULT_URL, student, activeSubjects);
    }); 
}); 

$(document).ready(function() {
    $('.w3-display-topright').on('click', function() {
        $('.w3-modal').css('display', 'none');
    });
});

function redirect(url, student, subjects) {
    //params for the url
    var urlParams = {};
    urlParams['student'] = student;    

    var urlSubjects = "";

    subjects.forEach( (subject, index) => {
        urlSubjects += subject + SUBJECT_SEPARATOR_FOR_REDIRECTION;
    });

    urlParams['subjects'] = urlSubjects;

    $.ajax({
        type: "POST",
        url: url,
        data: "student=" + urlParams['student'] + "&subjects=" + urlParams['subjects'],
        success: function() {
            alert('ok');
        }
    });
}