const input = 314;

let buffer = new Array(1);
buffer[0] = 0;

let cur = 0;
for (let i = 0 ; i < 2017 ; i++) {

    cur += input;
    cur %= buffer.length;
    cur++;
    buffer.splice(cur, 0, i + 1);
}

console.log(buffer[(cur + 1) % buffer.length])
