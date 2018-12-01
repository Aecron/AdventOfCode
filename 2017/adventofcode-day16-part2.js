const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

const parseMove = (s) => {

    switch (s.charAt(0)) {

        case 's': Shift(parseInt(s.match(/[0-9]+/g)[0])); break;
        case 'x': Swap(parseInt(s.match(/[0-9]+/g)[0]), parseInt(s.match(/[0-9]+/g)[1])); break;
        case 'p': Swap(dancefloor.indexOf(s.charAt(1)), dancefloor.indexOf(s.charAt(3))); break;
    }
}

const Shift = (n) => {

    let tmp = new Array(dancefloor.length);
    for (let i = 0 ; i < dancefloor.length ; i++)
        tmp[(i + n) % dancefloor.length] = dancefloor[i];

    dancefloor = tmp;
}

const Swap = (a, b) => {

    let tmp = dancefloor[a];
    dancefloor[a] = dancefloor[b];
    dancefloor[b] = tmp;
}

const ShowTime = () => {

    let scene = '';
    for (let c of dancefloor)
        scene += c;

    return scene;
}

const Dance = () => {for (let r of raw) parseMove(r); return ShowTime()}
const DanceFor = (n) => {

    for (let i = 0, seen = [] ; i < n ; i++) {

        seen.push(ShowTime());

        if (seen.indexOf(Dance()) != -1)
            return seen[n % seen.length];

    } return ShowTime();
}

const input = HTTPGet('http://adventofcode.com/2017/day/16/input');
const raw = input.split(',');

let dancefloor = new Array(16);
for (let i = 0 ; i < dancefloor.length ; i++)
    dancefloor[i] = String.fromCharCode(i + 97);

console.log(DanceFor(1000000000));
