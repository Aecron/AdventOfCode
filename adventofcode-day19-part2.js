const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

const input = HTTPGet('http://adventofcode.com/2017/day/19/input');
const raw = input.split('\n');

let diagram = [];
for (let r of raw) diagram.push(r.split(''))

let output = '';
let steps = 0;
let keepgoing = true;
let direction = 'down';
let y = 0, x = -1;

for (let i = 0 ; i < diagram.length && x == -1 ; i++)
    if (diagram[0][i] == '|')
        x = i;

while (keepgoing) {

    steps++;
    switch(direction) {

        case 'down': y++; break;
        case 'up': y--; break;
        case 'right': x++; break;
        case 'left': x--; break;
    }

    if (x < 0 || x >= diagram.length || y < 0 || y >= diagram.length) keepgoing = false;
    else {

        switch(diagram[y][x]) {

            case ' ': keepgoing = false; break;
            case '+':

                switch(direction) {

                    case 'down': case 'up':
                        if (x > 0 && diagram[y][x - 1] != ' ') direction = 'left';
                        else if (x < diagram.length - 1 && diagram[y][x + 1] != ' ') direction = 'right';
                        else keepgoing = false; break;

                    case 'left': case 'right':
                        if (y > 0 && diagram[y - 1][x] != ' ') direction = 'up';
                        else if (y < diagram.length - 1 && diagram[y + 1][x] != ' ') direction = 'down';
                        else keepgoing = false; break;

                    default: keepgoing = false; break;
                }
                break;
            case '|': case '-': break;
            default: output += diagram[y][x];
        }
    }
}

console.log(steps);
