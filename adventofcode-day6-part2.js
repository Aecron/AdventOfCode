function HTTPGet(url) {
 
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();  
    return xhr.responseText;  
}

function isEqualBanks (a, b) {

    for (let i = 0 ; i < a.length ; i++)
        if (a[i] != b[i]) return false;

    return true;
}

function isSeenBanks() {

    for (let i = 0 ; i < seen_banks.length ; i++)
        if (isEqualBanks(banks, seen_banks[i])) return i;

    return false;
}

function saveBanks() {

    let tmp = new Array();
    for (let i = 0 ; i < banks.length ; i++)
        tmp.push(banks[i]);

    seen_banks.push(tmp);
}

function RunCycle() {

    let index = 0, max = 0;
    for (i = 0 ; i < banks.length ; i++)
        if (banks[i] > max) {max = banks[i]; index = i;}

    banks[index] = 0;
    for (i = index + 1 ; max > 0 ; max--, i++) {

        i = i % banks.length;
        banks[i]++;
    }

    cycles++;
}

let input = HTTPGet('http://adventofcode.com/2017/day/6/input');
let raw = input.split('\t');

let banks = []
let seen_banks = [];
let cycles = 0;

for (let i = 0 ; i < raw.length ; i++)
    banks.push(parseInt(raw[i]));

do {

    saveBanks();
    RunCycle();
} while (!isSeenBanks())

console.log(cycles - isSeenBanks());

