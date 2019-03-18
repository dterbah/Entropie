const activeSubject = "active-subject";
const subjectSelection = "subject-selection";
const subjectClass = "w3-bar-item " + subjectSelection;

$(document).ready(function() {
    const subjects = DataExtractor.getSubjects();
    var header = $('ul');
    subjects.forEach((subject, index) => {
        header.append('<li class="' + subjectClass + '">' + subject + '</li>');
    });
});

$(document).ready(function() {
    $('.' + subjectSelection).on('click', function() {
        var li = $(this);
        if(li.hasClass(activeSubject)) {
            li.removeClass(activeSubject);
        } else {
            li.addClass(activeSubject);
        }
    });
});

var subjectAll = false;

$(document).ready(function() {
    $('.subject-all').on('click', function() {
        $('.subject-selection').each(function(index){
            var li = $(this);
            if(!subjectAll) {
                li.addClass(activeSubject);
            } else {
                li.removeClass(activeSubject);
            }
        });
        subjectAll = !subjectAll;
    });

});

function getActiveSubjects() {
    var subjects = [];
    $('.' + activeSubject).each(function(index) {
        subjects.push($(this).text());
    });

    return subjects;
}