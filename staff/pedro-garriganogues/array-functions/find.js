/**
 * Abstraction of fill.
 * 
 * Finds a word.
 * 
 * 
 * @param {Word} - word to find
 * @param {Array} array
 * 
 * @throws {TypeError} - If array is not an array
 */
var arr = ["1","2","3","4","5"];

function buscar(array, word){    
for(var i = 1; i < array.length+1;i++){
    if (!(array instanceof Array))
    throw new TypeError(ele + ' is not an array');

        if(array[i] === word){
            
        console.log(word + ' is element num ' + (i+1) + ' at the array.')
        }
    }
};

buscar(arr, "4")


// use case 1

test('use case 1', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 0, 2);

    var expected = [0, 0, 3, 4, 5];

    if (res !== arr) throw Error('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
    if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
});
