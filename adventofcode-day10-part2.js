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

let array = new Array(256);
let lengths = [];

for (let i = 0 ; i < 256 ; i++) array[i] = i;
for (let i = 0 ; i < input.length - 1 ; i++) lengths.push(input.charCodeAt(i));

lengths.push(17);
lengths.push(31);
lengths.push(73);
lengths.push(47);
lengths.push(23);

for (let i = 0, cur = 0, skip = 0 ; i < 64 ; i++) {

    for (let j = 0 ; j < lengths.length ; j++, skip++) {

        if (lengths[j] <= array.length) {

            CircularReverse(array, cur, lengths[j]);
            cur += lengths[j] + skip;
            cur %= array.length;
        }
    }
}

let dense_hash = [];
let xor = 0;
for (let i = 0 ; i < 256 ; i++) {

    xor ^= array[i];
    if (i % 16 == 15) {

        dense_hash.push(xor);
        xor = 0;
    }
}

let output = '';
for (let i = 0 ; i < dense_hash.length ; i++)
    output += (dense_hash[i] < 16) ? '0' + dense_hash[i].toString(16) : dense_hash[i].toString(16);


console.log(output);
