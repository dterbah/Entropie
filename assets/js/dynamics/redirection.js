const SUBJECT_SEPARATOR_FOR_REDIRECTION = "|";
const RESULT_URL = "results.php";
const URL_PARAMS_BEGIN = "?";
const URL_PARAMS_SPLIT_PARAMETER = "&";

const SUBJECTS_URL_TAG = "subjects";
const STUDENT_URL_TAG = "student";


class Redirection {

    static redirect(url, student, subjects) {

        var urlParams = {};
        urlParams['student'] = student;    
    
        var urlSubjects = subjects[0];
        
        if(subjects.length > 1) {
            subjects.forEach( (subject, index) => {
                urlSubjects += SUBJECT_SEPARATOR_FOR_REDIRECTION + subject;
            });
        }
        urlParams['subjects'] = urlSubjects;
    
        url += URL_PARAMS_BEGIN + STUDENT_URL_TAG + "=" + student + "&" + SUBJECTS_URL_TAG + "=" + urlSubjects;
        
        window.location.replace(url);
    }

    static urlToData() {
        const url = $(location).attr('href');
        
        var params = url.split(URL_PARAMS_BEGIN)[1];
        params = params.split(URL_PARAMS_SPLIT_PARAMETER);

        var result = {};

        for(var i = 0; i < params.length; i++) {
            let urlParam = params[i].split("=");
            let key = urlParam[0], value = urlParam[1];

            result[key] = value;

        }

        //split the subjects
        if(result[SUBJECTS_URL_TAG]) {
            const subjects = result[SUBJECTS_URL_TAG];
            result[SUBJECTS_URL_TAG] = subjects.split(SUBJECT_SEPARATOR_FOR_REDIRECTION);
        }

        return result;
    }
}