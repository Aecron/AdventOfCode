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
    let children = [];

    for (let j = 3 ; j < current.length ; j++) {

        let child = current[j].substr(0, (j < current.length - 1) ? current[j].length - 1 : current[j].length);
        children.push(child);
        children_list.push(child);
    }

    programs_list.push({name: name, weight, weight, children: children, placed: false});
}

let father = false;
for (let i = 0 ; i < programs_list.length && !father ; i++) 
    if (children_list.indexOf(programs_list[i].name) == -1) 
        father = feedProgram(i);

updateNodeTotalWeight(father);

function findIndex(name) {

    for (let i = 0 ; i < programs_list.length ; i++)
        if (programs_list[i].name == name)
            return i;
    
    return -1;
}

function feedProgram(index) {

    let program = {

        name: programs_list[index].name,
        weight: programs_list[index].weight,
        total_weight: 0,
        children: feedChildren(index)
    }

    return program;
}

function feedChildren(index) {

    let children = [];
    for (let i = 0 ; i < programs_list[index].children.length ; i++)
        children.push(feedProgram(findIndex(programs_list[index].children[i])))

    return children;
}

function updateNodeTotalWeight(node) {

    let children_weight = 0;
    for (let i = 0 ; i < node.children.length ; i++) {

        updateNodeTotalWeight(node.children[i]);
        children_weight += node.children[i].total_weight;
    }
        
    node.total_weight = node.weight + children_weight;
}

console.log(father);