const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const radiusLength = canvas.width * canvas.height / 160000;

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
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#8c5523"
        ctx.fill();
        

    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.dirX = -this.dirX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dirY = -this.dirY;
        }

        //collisions
        // let dx = mouse.x - this.x;
        // let dy = mouse.x - this.x;
        // let dist = Math.sqrt((dx * dx) + (dy * dy));
        // if (dist < mouse.radius + this.size) {
        //     if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        //         this.x += 10;
        //     }
        //     if (mouse.x > this.x && this.x > this.size * 10) {
        //         this.x -= 10;
        //     }
        //     if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        //         this.y += 10;
        //     }
        //     if (mouse.y > this.y && this.y > this.size * 10) {
        //         this.y -= 10;
        //     }
        // }
        
        //moving
        this.x += this.dirX;
        this.y += this.dirY;
        this.draw();
    }
}

function createParticles() {
    particlesArray = [];
    let noOfParticles = canvas.width * canvas.height / 9000;
    for (let i = 0; i < noOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * (innerHeight - 2 * size - 2 * size) + 2 * size);
        let y = (Math.random() * (innerHeight - 2 * size - 2 * size) + 2 * size);
        let dirX = (Math.random() * 5) - 2.5;
        let dirY = (Math.random() * 5) - 2.5;
        let color = "#000000"
        console.log(x + " " + y + " " + size + " " + dirX + " " + dirY);

        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

createParticles();
animate();