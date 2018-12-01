const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

const input = HTTPGet('http://adventofcode.com/2017/day/15/input');
const raw = input.split('\n');

function Generator (factor, start) {

    this.previous = start;
    this.factor = factor;

    this.Run = () => {

        this.previous *= this.factor;
        this.previous %= 2147483647;
        return this.previous;
    }

    this.getLastNumber = () => this.previous;
}

const Judge = (a, b) => {

    a = a.toString(2);
    b = b.toString(2);

    for (let i = a.length ; i < 16 ; i++) a = '0' + a;
    for (let i = b.length ; i < 16 ; i++) b = '0' + b;

    a = a.substr(-16);
    b = b.substr(-16);

    return a == b;
}

let GeneratorA = new Generator(16807, parseInt(raw[0].match(/[0-9]+/g)[0]));
let GeneratorB = new Generator(48271, parseInt(raw[1].match(/[0-9]+/g)[0]));

let valid = 0;
for (let i = 0 ; i < 40000000 ; i++)
    if (Judge(GeneratorA.Run(), GeneratorB.Run()))
        valid++;

console.log(valid);
