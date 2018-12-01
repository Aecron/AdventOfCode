const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

let sockets = [];
let cpt = 0;

const SocketSend = (_p, v) => sockets.push({from: _p, value: v});
const CheckSocketQueue = (_p) => {

    let value = false;
    for (let i = 0 ; i < sockets.length ; i++) {

        if (sockets[i].from != _p) {

            value = sockets[i].value;
            sockets.splice(i, 1);
        }
    }

    return value;
}

function Program(__pid, instructions) {

    this.registers = [];
    this.messagequeue = [];

    this.cur = 0;
    this.instructions = instructions;

    this.__pid = __pid;
    this.sent = 0;
    this.running = true;
    this.waiting = false;

    this.RegisterIndex = (name) => {

        for (let i = 0 ; i < this.registers.length ; i++)
            if (this.registers[i].name == name)
                return i;
    
        return -1;
    }

    this.GetValueOf = (i) => isNaN(i) ? this.GetValueOfRegister(i) : parseInt(i)
    this.GetValueOfRegister = (name) => this.registers[this.CheckRegister(name)].value
    this.SetValueOfRegister = (name, value) => this.registers[this.CheckRegister(name)].value = value;
    this.CheckRegister = (name) => {

        if (this.RegisterIndex(name) == -1) {
    
            let r = {name: name, value: 0}
            this.registers.push(r);
        }
    
        return this.RegisterIndex(name);
    }

    this.isRunning = () => this.running
    this.isWaiting = () => !!this.waiting
    this.Terminate = () => this.running = false
    this.Sent = () => this.sent

    this.Send = (v) => {SocketSend(this.__pid, v); this.sent++;}
    this.Receive = (v) => {
        
        if (v) {
            
            if (this.waiting) {this.SetValueOfRegister(this.waiting, v); this.waiting = false;}
            else this.messagequeue.push(v);
        }
    }

    this.AskReceive = (x) => {
        
        if (this.messagequeue.length > 0) {

            this.SetValueOfRegister(x, this.messagequeue[0]);
            this.messagequeue.splice(0, 1);
        } else this.waiting = x
    }

    this.RunNext = () => {

        if (this.running && !this.waiting) {

            console.log(this.__pid, this.cur, this.instructions[this.cur]);
            let tokens = this.instructions[this.cur].split(' ');
            switch (tokens[0]) {
    
                case 'snd': this.Send(this.GetValueOf(tokens[1])); break;
                case 'set': this.SetValueOfRegister(tokens[1], this.GetValueOf(tokens[2])); break;
                case 'add': this.SetValueOfRegister(tokens[1], this.GetValueOfRegister(tokens[1]) + this.GetValueOf(tokens[2])); break;
                case 'mul': this.SetValueOfRegister(tokens[1], this.GetValueOfRegister(tokens[1]) * this.GetValueOf(tokens[2])); break;
                case 'mod': this.SetValueOfRegister(tokens[1], this.GetValueOfRegister(tokens[1]) % this.GetValueOf(tokens[2])); break;
                case 'rcv': this.AskReceive(tokens[1]); break; 
                case 'jgz': if (this.GetValueOf(tokens[1]) > 0)  this.cur += this.GetValueOf(tokens[2]) - 1; break;
            } this.cur++;
    
            if (this.cur < 0 || this.cur > this.instructions.length) this.running = false;
        }
    }

    this.SetValueOfRegister('p', this.__pid);
}

const input = HTTPGet('http://adventofcode.com/2017/day/18/input');
const raw = input.split('\n');

let Programs = [new Program(0, raw), new Program(1, raw)];
while (Programs[0].isRunning() || Programs[1].isRunning()) {

    for (let i = 0 ; i < 2 ; i++) {

        Programs[i].Receive(CheckSocketQueue(i));
        Programs[i].RunNext();
    }

    if (Programs[0].isWaiting() && Programs[1].isWaiting()) {

        console.log("deadlock");
        Programs[0].Terminate();
        Programs[1].Terminate();
    }
}

console.log(Programs[1].Sent());
