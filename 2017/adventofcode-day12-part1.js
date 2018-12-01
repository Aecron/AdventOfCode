function HTTPGet(url) {
 
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();  
    return xhr.responseText;  
}

let input = HTTPGet('http://adventofcode.com/2017/day/12/input');
let raw = input.split('\n');

let data = [];

for (let i  = 0 ; i < raw.length - 1 ; i++)
    data.push(raw[i].match(/[0-9]+/g).map(x => parseInt(x)));

let communicate = [];
addContact(0);

function addContact(index) {

    communicate.push(index);
    for (let i = 1 ; i < data[index].length ; i++)
        if (communicate.indexOf(data[index][i]) == -1)
            addContact(data[index][i]);
}

console.log(communicate.length);
