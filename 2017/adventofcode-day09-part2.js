function HTTPGet(url) {
 
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();  
    return xhr.responseText;  
}

function RemoveMarkedGarbage(s) {return s.replace(/!./g, '');}
function RemoveGarbageBlock(s) {occurences = s.match(/<(.*?)>/g).length; return s.replace(/<(.*?)>/g, '');}
function RemoveCommas(s) {return s.replace(/,/g, '');}

function CountGroupsScore(s) {

    let score = 0, weight = 0;
    for (let i = 0 ; i < s.length ; i++) {

        switch(s[i]) {
            
            case '{': weight++; score += weight; break;
            case '}': weight--; break;
        }
    }

    return score;
}

let input = HTTPGet('http://adventofcode.com/2017/day/9/input');
input = RemoveMarkedGarbage(input);

let start_size = input.length;
let occurences;
input = RemoveGarbageBlock(input);

console.log(start_size - (input.length + 2 * occurences));
