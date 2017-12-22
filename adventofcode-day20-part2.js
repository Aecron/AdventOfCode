const HTTPGet = (url) => {xhr = new XMLHttpRequest(); xhr.open("GET", url, false); xhr.send(); return xhr.responseText.slice(0, -1);}

const TripleSignCheck = (a, b, c) => a * b >= 0 && b * c >= 0 && a * c >= 0

function Particule (position, velocity, acceleration) {

    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    
    this.isDone = () => TripleSignCheck(this.position.x, this.velocity.x, this.acceleration.x)
        && TripleSignCheck(this.position.y, this.velocity.y, this.acceleration.y)
        && TripleSignCheck(this.position.z, this.velocity.z, this.acceleration.z)
    
    this.Tick = () => {

        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity.z += this.acceleration.z;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;

        return this.isDone();
    }

    this.DistanceFrom = (origin) => Math.abs(this.position.x - origin.x) + Math.abs(this.position.y - origin.y) + Math.abs(this.position.z - origin.z)
    this.AbsoluteDistance = () => this.DistanceFrom({x: 0, y: 0, z: 0})

    this.AbsoluteSpeed = () => Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z)
    this.getPosition = () => this.position
}

const CheckAllDone = () => {
    
    for (let p of Particules)
        if (!p.isDone())
            return false;
    
    return true;
}

function CollisionsManager() {

    this.occupied_coordinates = [];
    this.destroyer_list = [];
    this.Refresh = () => {

        this.occupied_coordinates = [];
        this.destroyer_list = [];

        for (let i = 0 ; i < Particules.length ; i++)
            this.AddUniqueCoordinate(i, Particules[i].getPosition());

        for (let oc of this.occupied_coordinates) 
            if (oc.ids.length > 1)
                this.destroyer_list = this.destroyer_list.concat(oc.ids)

        for (let i = 0 ; i < this.destroyer_list.length ; i++)
            Particules.splice(this.destroyer_list[i] - i, 1);

        return this.destroyer_list.length;
    }

    this.TestCoordinates = (a, b) => a.x == b.x && a.y == b.y && a.z == b.z
    this.AddUniqueCoordinate = (id, coord) => {

        for (let c of this.occupied_coordinates)
            if (this.TestCoordinates(c.coord, coord)) {c.ids.push(id); console.log('COLLISION'); return;}
        
        this.occupied_coordinates.push({coord: coord, ids: [id]});
    }
}

const input = HTTPGet('http://adventofcode.com/2017/day/20/input');
const raw = input.split('\n');

let Particules = [];
let CM = new CollisionsManager();

for (let e of raw) {

    let data = e.match(/-*[0-9]+/g).map(x => parseInt(x));
    Particules.push(new Particule({x: data[0], y: data[1], z: data[2]}, {x: data[3], y: data[4], z: data[5]}, {x: data[6], y: data[7], z: data[8]}))
}

console.log('Particules created', Particules.length)

while (!CheckAllDone()) {

    console.log('Tick()')
    for (let p of Particules)
        p.Tick();

    console.log('destroyer:', CM.Refresh());
}

console.log(Particules.length);
