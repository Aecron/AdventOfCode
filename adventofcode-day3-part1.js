// We wanna write a simulation of the Spiral Memory
// For that, we will be creating an Array with 2 dimension, to represent a grid
// that we will be filling from 1 to our goal, 347991, no need to fill out more.
// We will start filling this array from the center.


// First, we need to figure out the size of the Array. Just a quick schema to see
// it will be a Square (so x * x size), and that x will always be an odd number.
// As we will be feeding numbers with an incrementation of 1, if we have an array of
// 3 * 3, (9 cells), we will go up to 9. Let's figure out the size of the array 
// we need at first to go up to 347991.

function square(x) {return x*x;}
function sizeNeeded(goal) {

    let size = 1;
    while (square(size) < goal) size += 2;

    return size;
}


// Okay, now we that we got this figured out, we need to actually create an array with
// 2 dimensions of the size we just found ; we will be filling every cell with the default
// value of 0.

let size = sizeNeeded(347991);
let spiral = new Array(size);           // array of 1 dimension of SIZE
for (let i = 0 ; i < size ; i++) {

    spiral[i] = new Array(size);        // for each cell of this first array, let's set it up to a new array of SIZE
    for (let j = 0 ; j < size ; j++)
        spiral[i][j] = 0;               // and fill out all new cells created with default value 0.
}

// Now, we need to figure out the central cell of this array. It's actually SIZE/2, and as
// SIZE is an odd number, we need to truncate the decimal part of it.
let startXY = parseInt(size / 2);       // just extract an Integar (no decimal) of SIZE/2

// We will soon start to fill out this Array, up to our goal (347991), but we will need
// to remember what was the final cell ; that's how we will be able to calculate the
// "shorter path" from the center to the final cell
let endX, endY;

// Just a little helper to assist us with "direction changing"
let direction = "right";

// Let's do this. We initialize our cursor position to the center of the array,
// and the current number we are filling to 1. Then we fill up until we reach
// our goal value, while just doing +1 for every step
for (let i = startXY, j = startXY, c = 1 ; c <= 347991 ; c++) {

    // Before we forget, let's set our "end" coordinates if we reached our goal
    if (c == 347991) {endX = i; endY = j;}
    
    spiral[i][j] = c;                   // just fill the value to spiral

    switch (direction) {                // now we move our cursor according to the direction

        case "right":
            i++;                        // as i is our "X absis", if we go right, we increment i
            if (spiral[i][j-1] == 0)    // When we go right, we need to check if we have to go UP the next time
                direction = "up";

            break;

        case "up":
            j--;
            if (spiral[i-1][j] == 0) direction = "left";
            break;

        case "left":
            i--;
            if (spiral[i][j+1] == 0) direction = "down";
            break;

        case "down":
            j++;
            if (spiral[i+1][j] == 0) direction = "right";
            break;
    }
}

// Okay, now we should have endX and endY pointing to the cell of 347991. The number of steps to reach it from the center
// is just the difference in X and in Y axises from the center to our current cell. in Absolute value.
let stepsX = (endX > startXY) ? endX - startXY : startXY - endX;
let stepsY = (endY > startXY) ? endY - startXY : startXY - endY;

let steps = stepsX + stepsY;
console.log(steps);
