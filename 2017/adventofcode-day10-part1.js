function HTTPGet(url) {
 
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();  
    return xhr.responseText;  
}

function CircularReverse(arr, index, length) {

    for (let i = 0, tmp ; i < (length/2) ; i++) {

        tmp = arr[(index + i) % arr.length];
        arr[(index + i) % arr.length] = arr[(index + length - (i + 1)) % arr.length];
        arr[(index + length - (i + 1)) % arr.length] = tmp;
    }
}

let input = HTTPGet('http://adventofcode.com/2017/day/10/input');
let raw = input.split(',');

let array = new Array(256);
let lengths = [];

for (let i = 0 ; i < 256 ; i++) array[i] = i;
for (let i = 0 ; i < raw.length ; i++) lengths.push(parseInt(raw[i]));

for (let i = 0, cur = 0, skip = 0 ; i < lengths.length ; i++, skip++) {

    if (lengths[i] <= array.length) {

        CircularReverse(array, cur, lengths[i]);
        cur += lengths[i] + skip;
        cur %= array.length;
    }
}

console.log(array[0] * array[1]);
