const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

const MoveScanners = () => {

    for (let e of firewall) {

        if (e.depth > 0) {

            if (e.direction == 'down') {

                e.scanner++;
                if (e.scanner == e.depth - 1) e.direction = 'up';
            } else {

                e.scanner--;
                if (e.scanner == 0) e.direction = 'down';
            }
        }
    }
}

const input = HTTPGet('http://adventofcode.com/2017/day/13/input');
const raw = input.split('\n');

let data = [];
for (let e of raw)
    data.push(e.match(/[0-9]+/g).map(x => parseInt(x)));

let firewall = [];
for (let i = 0, cur = 0 ; i < data[data.length - 1][0] + 1 ; i++) {

    let layer = {depth: 0, scanner: 0, direction: 'down', severity: 0};
    if (data[cur][0] == i) {

        layer.depth = data[cur][1];
        layer.severity = layer.depth * i;
        cur++;
    }
    firewall.push(layer);
}

let severity = 0;
for (let current of firewall) {

    if (current.scanner == 0) severity += current.severity;
    MoveScanners();
}

console.log(severity);
