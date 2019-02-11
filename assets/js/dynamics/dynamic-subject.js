const subjectClass = "w3-bar-item subject-selection";

$(document).ready(function() {
    const subjects = DataExtractor.getSubjects();
    var header = $('header');
    subjects.forEach((subject, index) => {
        header.append('<div class="' + subjectClass + '">' + subject + '</div>');
    });
});

$(document).ready(function() {
    
});