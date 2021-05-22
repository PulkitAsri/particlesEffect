const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radiusLength = canvas.width * canvas.height / 9000;


let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: radiusLength
}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

});




class Particle {
    constructor(x, y, velX, velY, size, color) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        //draw a circle and fill it 
        //at posX, posY ,of size, fromAngle 0rad ,to 2pi Rad 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#8c5523"
        ctx.fill();
        
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.velX = -this.velX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.velY = -this.velY;
        }

        // collisions
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt((dx * dx) + (dy * dy));
        if (dist < mouse.radius + this.size) {
            //Buffers on edge of the screens
            const buffer=this.size * 10
            
            if (mouse.x < this.x && this.x < canvas.width - buffer) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > buffer) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - buffer) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > buffer) {
                this.y -= 10;
            }
        }

        //moving
        this.x += this.velX;
        this.y += this.velY;
        this.draw();
    }
}

function createParticles() {
    particlesArray = [];
    let noOfParticles = canvas.width * canvas.height / 8100;
    
    for (let i = 0; i < noOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        
        let x = (Math.random() * (innerHeight - 2 * size ) + 2 * size);
        let y = (Math.random() * (innerHeight - 2 * size ) + 2 * size);
        let velX = (Math.random() * 5) - 2.5;
        let velY = (Math.random() * 5) - 2.5;
        let color = "#8c5523"
        // console.log(x + " " + y + " " + size + " " + velX + " " + velY);

        particlesArray.push(new Particle(x, y, velX, velY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect(){
    
    let vicinityArea= canvas.width*canvas.height/81;
    for(let i=0;i<particlesArray.length;i++){
        for(let j=i;j<particlesArray.length;j++){
            let distance= Math.pow(particlesArray[i].x-particlesArray[j].x,2) 
                        + Math.pow(particlesArray[i].y-particlesArray[j].y,2);
            //actually the square of distance

            if (distance < vicinityArea){
                //draw a line between them
                ctx.strokeStyle="rgba(140,85,31,1)"
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x,particlesArray[j].y);
                ctx.stroke();

            }            
        }
    }
}

createParticles();
animate();