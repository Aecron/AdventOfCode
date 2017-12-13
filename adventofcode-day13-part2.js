const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

const Algo = (timer, layer, depth) => (timer + layer) % ((depth - 1) * 2)
const RunTimer = (timer) => {

    for (let i = 0 ; i < firewall.length ; i++)
        if (firewall[i].depth > 0)
            if (Algo(timer, i, firewall[i].depth) == 0)
                return false;

    return true;
}

const input = HTTPGet('http://adventofcode.com/2017/day/13/input');
const raw = input.split('\n');

let data = [];
for (let e of raw)
    data.push(e.match(/[0-9]+/g).map(x => parseInt(x)));

let firewall = [];
for (let i = 0, cur = 0 ; i < data[data.length - 1][0] + 1 ; i++) {

    let layer = {depth: 0};
    if (data[cur][0] == i) {

        layer.depth = data[cur][1];
        cur++;
    }
    firewall.push(layer);
}

let delay = 0;
while (!RunTimer(delay)) delay++;

console.log(delay);
