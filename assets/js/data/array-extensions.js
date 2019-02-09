//extensions for the array object

Array.prototype.beginWith = function(str) {
    const regex = new RegExp("^(" + str + ")");

    var result = [];

    this.filter(function(element, index) {
        if(regex.test(element)) {
            result.push(element);
        }
    });

    return result;
}