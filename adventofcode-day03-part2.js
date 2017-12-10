// Actually didn't bother to calculate the needed size for this array ; the one used in Part1 will do, even if it's extremely oversized.
function square(x) {return x*x;}
function sizeNeeded(goal) {

    let size = 1;
    while (square(size) < goal) size += 2;

    return size;
}

let goal = 347991;
let size = sizeNeeded(goal);
let spiral = new Array(size);
for (let i = 0 ; i < size ; i++) {

    spiral[i] = new Array(size);
    for (let j = 0 ; j < size ; j++)
        spiral[i][j] = 0;
}

let startXY = parseInt(size / 2);
let endX, endY;

let direction = "right";
let c = 1;
for (let i = startXY, j = startXY ; c <= goal ; ) {

    if (c == goal) {endX = i; endY = j;}
    
    spiral[i][j] = c;

    switch (direction) {

        case "right": i++; if (spiral[i][j-1] == 0) direction = "up"; break;
        case "up": j--; if (spiral[i-1][j] == 0) direction = "left"; break;
        case "left": i--; if (spiral[i][j+1] == 0) direction = "down"; break;
        case "down": j++; if (spiral[i+1][j] == 0) direction = "right"; break;
    }

    c = 0;
    // as we are in a completly oversized array, testing for borders isn't much needed, but let's make it *the right way*
    if (i > 0 && j > 0) c += spiral[i-1][j-1];
    if (i > 0 && j < size - 1) c += spiral[i-1][j+1];
    if (i > 0) c += spiral[i-1][j];
    
    if (i < size - 1 && j > 0) c += spiral[i+1][j-1];
    if (i < size - 1 && j < size - 1) c+= spiral[i+1][j+1];
    if (i < size - 1) c += spiral[i+1][j];

    if (j > 0) c += spiral[i][j-1];
    if (j < size - 1) c += spiral[i][j+1];
}

console.log(c);
