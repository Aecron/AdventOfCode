const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

const input = HTTPGet('http://adventofcode.com/2017/day/15/input');
const raw = input.split('\n');

function Generator (factor, start, criteria) {

    this.previous = start;
    this.factor = factor;

    this.criteria = criteria;

    this.Run = () => {

        this.previous *= this.factor;
        this.previous %= 2147483647;
        return this.getLastNumber();
    }

    this.getLastNumber = () => (this.previous % this.criteria == 0) ? this.previous : undefined;
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

let GeneratorA = new Generator(16807, parseInt(raw[0].match(/[0-9]+/g)[0]), 4);
let GeneratorB = new Generator(48271, parseInt(raw[1].match(/[0-9]+/g)[0]), 8);

let valid = 0;
let numberA = undefined, numberB = undefined;
for (let i = 0 ; i < 5000000 ; i++) {

    while (numberA === undefined)
        numberA = GeneratorA.Run();
    
    while (numberB === undefined)
        numberB = GeneratorB.Run();
        
    if (Judge(numberA, numberB))
        valid++;

    numberA = undefined;
    numberB = undefined;
}
console.log(valid);
