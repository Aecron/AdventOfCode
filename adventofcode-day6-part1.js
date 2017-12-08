function isEqualBanks (a, b) {

    for (let i = 0 ; i < a.length ; i++)
        if (a[i] != b[i]) return false;

    return true;
}

function isSeenBanks() {

    for (let i = 0 ; i < seen_banks.length ; i++)
        if (isEqualBanks(banks, seen_banks[i])) return true;

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

let banks = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11];
let seen_banks = new Array();
let cycles = 0;

do {

    saveBanks();
    RunCycle();
} while (!isSeenBanks())

console.log(cycles);

