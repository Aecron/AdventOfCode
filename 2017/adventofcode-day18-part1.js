const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

let registers = [];

const RegisterIndex = (name) => {

    for (let i = 0 ; i < registers.length ; i++)
        if (registers[i].name == name)
            return i;

    return -1;
}

const GetValueOfRegister = (name) => registers[CheckRegister(name)].value
const SetValueOfRegister = (name, value) => {registers[CheckRegister(name)].value = value;}

const CheckRegister = (name) => {

    if (RegisterIndex(name) == -1) {

        let r = {name: name, value: 0}
        registers.push(r);
    }

    return RegisterIndex(name);
}

const GetValueOf = (i) => isNaN(i) ? GetValueOfRegister(i) : parseInt(i)

const input = HTTPGet('http://adventofcode.com/2017/day/18/input');
const raw = input.split('\n');

let first_rcv = null;

for (let i = 0 ; i < raw.length && i >= 0 && !first_rcv ; i++) {

    let tokens = raw[i].split(' ');
    switch (tokens[0]) {

        case 'snd': SetValueOfRegister('push', GetValueOf(tokens[1])); break;
        case 'set': SetValueOfRegister(tokens[1], GetValueOf(tokens[2])); break;
        case 'add': SetValueOfRegister(tokens[1], GetValueOfRegister(tokens[1]) + GetValueOf(tokens[2])); break;
        case 'mul': SetValueOfRegister(tokens[1], GetValueOfRegister(tokens[1]) * GetValueOf(tokens[2])); break;
        case 'mod': SetValueOfRegister(tokens[1], GetValueOfRegister(tokens[1]) % GetValueOf(tokens[2])); break;
        case 'rcv': if (GetValueOf(tokens[1]) != 0 && !first_rcv) first_rcv = GetValueOfRegister('push'); break; 
        case 'jgz': if (GetValueOf(tokens[1]) > 0) i += GetValueOf(tokens[2]) - 1; break;
    }
}


console.log(first_rcv);
