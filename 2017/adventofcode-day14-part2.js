const CircularReverse = (arr, index, length) => {

    for (let i = 0, tmp ; i < (length/2) ; i++) {

        tmp = arr[(index + i) % arr.length];
        arr[(index + i) % arr.length] = arr[(index + length - (i + 1)) % arr.length];
        arr[(index + length - (i + 1)) % arr.length] = tmp;
    }
}

const KnotHash = (input) => {

    let array = new Array(256);
    let lengths = [];

    for (let i = 0 ; i < 256 ; i++) array[i] = i;
    for (let i = 0 ; i < input.length ; i++) lengths.push(input.charCodeAt(i));

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

    return output;
}

const Enforce0Padding = (str) => {while(str.length < 4) str = '0' + str; return str;}
const CharToBinaryDigit = (char, digit) => parseInt(Enforce0Padding(parseInt(char, 16).toString(2)).charAt(digit));

const MarkRegion = (i, j, region) => {

    disk[i][j] = region;
    if (i > 0)
        if (disk[i-1][j] == -1)
            MarkRegion(i - 1, j, region);

    if (j > 0)
        if (disk[i][j-1] == -1)
            MarkRegion(i, j - 1, region);

    if (i < 128 - 1)
        if (disk[i+1][j] == -1)
            MarkRegion(i + 1, j, region);

    if (j < 128 - 1)
        if (disk[i][j+1] == -1)
            MarkRegion(i, j + 1, region);
}


let input = 'wenycdww';
let disk = new Array(128);
for (let i = 0 ; i < disk.length ; i++) {
    
    let hash = KnotHash(input + '-' + i);
    disk[i] = new Array(128);

    for (let j = 0 ; j < disk[i].length ; j++)
        disk[i][j] = -CharToBinaryDigit(hash.charAt(parseInt(j / 4)), j % 4)
}


let region = 0;
for (let i = 0 ; i < disk.length ; i++) {

    for (let j = 0 ; j < disk.length ; j++) {

        if (disk[i][j] == -1) {

            region++;
            MarkRegion(i, j, region);
        }
    }
}

console.log(region);
