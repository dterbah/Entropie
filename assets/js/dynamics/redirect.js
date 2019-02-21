$(document).ready(function() {
    $('.' + studentClass).on('click', function(event) {
        var activeSubjects = getActiveSubjects();
        if(activeSubjects.length == 0) {
            $('.w3-modal').css('display', 'block');
            return;
        }

        const student = $(this).text();

        Redirection.redirect(RESULT_URL, student, activeSubjects);
    }); 
}); 

$(document).ready(function() {
    $('.w3-display-topright').on('click', function() {
        $('.w3-modal').css('display', 'none');
    });
});