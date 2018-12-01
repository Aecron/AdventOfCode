function HTTPGet(url) {
 
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();  
    return xhr.responseText;  
}

let input = HTTPGet('http://adventofcode.com/2017/day/7/input');
let raw_list = input.split('\n');

let programs_list = [];
let children_list = [];

for (let i = 0 ; i < raw_list.length - 1 ; i++) {

    let current = raw_list[i].split(' ');
    let name = current[0];
    let weight = parseInt(current[1].substr(1, current[1].length - 2));

    for (let j = 3 ; j < current.length ; j++) 
        children_list.push(current[j].substr(0, (j < current.length - 1) ? current[j].length - 1 : current[j].length));

    programs_list.push({name: name});
}

for (let i = 0 ; i < programs_list.length ; i++) {

    if (children_list.indexOf(programs_list[i].name) == -1)
        console.log(programs_list[i].name);
}