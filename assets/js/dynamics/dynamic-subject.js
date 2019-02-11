const subjectClass = "w3-bar-item subject-selection";

$(document).ready(function() {
    const subjects = DataExtractor.getSubjects();
    var header = $('ul');
    subjects.forEach((subject, index) => {
        header.append('<li class="' + subjectClass + '">' + subject + '</li>');
    });
});

$(document).ready(function() {
    
});