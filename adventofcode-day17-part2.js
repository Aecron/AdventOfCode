const input = 314;

let cur = 0, final = 0;
for (let i = 1 ; i <= 50000000 ; i++) {

    cur = (cur + input) % i + 1;
    if (cur == 1) final = i;
}

console.log(final)
