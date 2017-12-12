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

let groups = [];
while (data.length > 0) {

    let group = [];
    addContactToGroup(data[0][0], group);
    groups.push(group);
}

function addContactToGroup(contact, group) {

    group.push(contact);
    for (let i = 1 ; i < data[findIndexOf(contact)].length ; i++) 
        if (group.indexOf(data[findIndexOf(contact)][i]) == -1) 
            addContactToGroup(data[findIndexOf(contact)][i], group);

    data.splice(findIndexOf(contact), 1);
}

function findIndexOf(n) {

    for (let i = 0 ; i < data.length ; i++)
        if (data[i][0] == n)
            return i;
}

console.log(groups.length);
