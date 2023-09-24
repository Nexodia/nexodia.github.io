const canvas = document.getElementById("lienzo")
const ctx = canvas.getContext("2d")
const keys = {
    w: false,
    s: false,
    i: false,
    k: false,
    r: false
}

class Bolita {
    constructor(color, x = 450,y = 300, radio = 15)  {
        this.color = color;
        this.x = x;
        this.y = y;
        this.radio = radio;
    }
}

class Rectangulo {
    constructor(color, x, y, w = 30, h = 140) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    gethh() {
        return this.h/2;
    }
}

let circular = new Bolita("white");
let rectizq = new Rectangulo( "#03a9f4", canvas.width/12, canvas.height/2)
let rectder = new Rectangulo("cyan", canvas.width*11/12, canvas.height/2)
let xmov = 5
let ymov = 5
let vel = 5
let lado = 1
let busy = false
let puntos = 0
let best = 0
let busyP = false

function pointHandler() {
    if (!busyP) {
        busyP = true
        puntos++
        setTimeout(() => {
            busyP = false
        }, 100)
    }
}

document.addEventListener( "keydown", (event) => {
    keys[event.key] = true;
})

document.addEventListener( "keyup", (event) => {
    keys[event.key] = false;
})


setInterval(() => {
    ctx.clearRect(0,0,900,600);

    if (keys['w'] && rectizq.y >= 0 + rectizq.gethh()) {
        rectizq.y -= 4;
    }
    if (keys['s'] && rectizq.y <= canvas.height - rectizq.gethh()) {
        rectizq.y += 4;
    }
    if (keys['i'] && rectder.y >= 0 + rectder.gethh()) {
        rectder.y -= 4;
    }
    if (keys['k'] && rectder.y <= canvas.height - rectder.gethh()) {
        rectder.y += 4;
    }
    if (keys['r']) {
        if (!busy) {    
            circular.x = 450
            circular.y = 300
            xmov = 5 * lado
            ymov = 5
            rectder.y = 300
            rectizq.y = 300
            lado *= -1
            busy = true
            puntos = 0
            setTimeout(()=> {
                busy = false
            }, 750)
        }
    }
    
    circular.x += xmov;
    circular.y += ymov;
    
    if (circular.x >= 900 - circular.radio) {
        //Red wins
        xmov = 0
        ymov = 0
    } 
    
    if (circular.x <= 0 + circular.radio) {
        //Blu wins
        xmov = 0
        ymov = 0
    }
    
    if (circular.y >= 600 -circular.radio) {
        ymov = -vel
    }

    if (circular.y <= 0 + circular.radio) {
        ymov = vel
    }
    
    
    if (circular.x >= rectizq.x - rectizq.w/2 - circular.radio && circular.x <= rectizq.x + rectizq.w/2 + circular.radio && circular.y >= rectizq.y - rectizq.h/2 - circular.radio && circular.y <= rectizq.y - rectizq.h/2 - circular.radio + 5){
        ymov = -vel
        pointHandler()
    } else if (circular.x >= rectizq.x - rectizq.w/2 - circular.radio && circular.x <= rectizq.x + rectizq.w/2 + circular.radio && circular.y >= rectizq.y + rectizq.h/2 + circular.radio -5 && circular.y <= rectizq.y + rectizq.h/2 + circular.radio){
        ymov = vel
        pointHandler()
    } else if (circular.x >= rectizq.x - rectizq.w/2 - circular.radio && circular.x <= rectizq.x + rectizq.w/2 + circular.radio && circular.y >= rectizq.y - rectizq.h/2 - circular.radio && circular.y <= rectizq.y + rectizq.h/2 + circular.radio) {
        xmov = vel
        pointHandler()
    }
    
    if (circular.x >= rectder.x - rectder.w/2 - circular.radio && circular.x <= rectder.x + rectder.w/2 + circular.radio && circular.y >= rectder.y - rectder.h/2 - circular.radio && circular.y <= rectder.y - rectder.h/2 - circular.radio + 5){
        ymov = -vel
        pointHandler()
    } else if (circular.x >= rectder.x - rectder.w/2 - circular.radio && circular.x <= rectder.x + rectder.w/2 + circular.radio && circular.y >= rectder.y + rectder.h/2 + circular.radio -5 && circular.y <= rectder.y + rectder.h/2 + circular.radio){
        ymov = vel
        pointHandler()
    } else if (circular.x >= rectder.x - rectder.w/2 - circular.radio && circular.x <= rectder.x + rectder.w/2 + circular.radio && circular.y >= rectder.y - rectder.h/2 - circular.radio && circular.y <= rectder.y + rectder.h/2 + circular.radio) {
        xmov = -vel
        pointHandler()
    }
    
    best = Math.max(puntos, best)

    ctx.font = "150px Ticketing";
    ctx.fillStyle = "#ffffff77";
    ctx.textAlign = "center";
    ctx.fillText(puntos, canvas.width/2, canvas.height/2 + 50);

    ctx.font = "50px Ticketing";
    ctx.fillStyle = "#ffffff33";
    ctx.textAlign = "center";
    ctx.fillText(best, canvas.width/2, canvas.height/2 + 150);
    
    ctx.beginPath();
    ctx.arc(circular.x, circular.y, circular.radio, 0, 2 * Math.PI);
    ctx.fillStyle = circular.color;
    ctx.fill();
    
    ctx.fillStyle = rectizq.color
    ctx.fillRect(rectizq.x - rectizq.w/2, rectizq.y - rectizq.h/2, rectizq.w, rectizq.h)
    ctx.fillStyle = rectder.color
    ctx.fillRect(rectder.x- rectder.w/2, rectder.y - rectder.h/2, rectder.w, rectder.h)

}, 1000/144)

document.fonts.ready.then(() => draw());
