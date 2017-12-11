function HTTPGet(url) {
 
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();  
    return xhr.responseText;  
}

function Distance(a, b) {return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));}

let input = HTTPGet('http://adventofcode.com/2017/day/11/input');
let raw = input.split('\n')[0].split(',');

let axis_x = 0;
let axis_y = 0;
let axis_z = 0;

let max = 0;

for (let i = 0 ; i < raw.length ; i++) {

    switch (raw[i]) {

        case 'n':  axis_x--; axis_y++; break;
        case 'ne': axis_y++; axis_z--; break;
        case 'se': axis_x++; axis_z--; break;
        case 's':  axis_x++; axis_y--; break;
        case 'sw': axis_y--; axis_z++; break;
        case 'nw': axis_x--; axis_z++; break;
    }

    max = Math.max(Distance({x: 0, y: 0, z: 0}, {x: axis_x, y: axis_y, z: axis_z}), max);
}

console.log(max);
