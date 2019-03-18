function generalEntropy(name) {

}

function normalizeVector(vector) {
    var sum = 0.0;
    vector.forEach(function(value, index){
        sum += value;
    });

    vector.map(x => x / sum);
}
function addVector(vector1, vector2) {
    var vector3 = vector1.slice(0);
    vector1.forEach(function(value, index){
        vector3[index] = vector1[index] + vector2[index];
    });
    return vector3;
}
