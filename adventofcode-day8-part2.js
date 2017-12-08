function HTTPGet(url) {
 
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();  
    return xhr.responseText;  
}

let registers = [];

function RegisterIndex(name) {

    for (let i = 0 ; i < registers.length ; i++)
        if (registers[i].name == name)
            return i;

    return -1;
}

function GetValueOfRegister(name) {return registers[CheckRegister(name)].value;}
function SetValueOfRegister(name, value) {registers[CheckRegister(name)].value = value;}

function CheckRegister(name) {

    if (RegisterIndex(name) == -1) {

        let r = {name: name, value: 0}
        registers.push(r);
    }

    return RegisterIndex(name);
}

function RunInstruction(instruction) {

    tokens = instruction.split(' ');
    let cdt;
    switch (tokens[5]) {

        case '==': cdt = GetValueOfRegister(tokens[4]) == parseInt(tokens[6]); break;
        case '!=': cdt = GetValueOfRegister(tokens[4]) != parseInt(tokens[6]); break;
        case '<=': cdt = GetValueOfRegister(tokens[4]) <= parseInt(tokens[6]); break;
        case '>=': cdt = GetValueOfRegister(tokens[4]) >= parseInt(tokens[6]); break;
        case '>': cdt = GetValueOfRegister(tokens[4]) > parseInt(tokens[6]); break;
        case '<': cdt = GetValueOfRegister(tokens[4]) < parseInt(tokens[6]); break;
    }

    if (cdt) {

        switch (tokens[1]) {

            case 'inc': SetValueOfRegister(tokens[0], GetValueOfRegister(tokens[0]) + parseInt(tokens[2])); break;
            case 'dec': SetValueOfRegister(tokens[0], GetValueOfRegister(tokens[0]) - parseInt(tokens[2])); break;
        }
    }
}

function FindMaxRegister() {

    let max = 0;

    for (let i = 0 ; i < registers.length ; i++) 
        if (registers[i].value > max) 
            max = registers[i].value;
    
    return max;
}

function Main() {
    
    let input = HTTPGet('http://adventofcode.com/2017/day/8/input');
    let raw_list = input.split('\n');

    let all_time_max = 0;

    for (let i = 0 ; i < raw_list.length ; i++) {

        RunInstruction(raw_list[i]);
        let current_max = FindMaxRegister();

        if (current_max > all_time_max) all_time_max = current_max;
    }
    
    console.log(all_time_max);
}

Main();