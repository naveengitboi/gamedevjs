/** @type {HTMLCanvasElement} */

const canvas2 = document.getElementById('canvas2');

const ctx2 = canvas2.getContext('2d');
canvas2.width = 500
canvas2.height = 1000;
const enemies2Array  = []

class Enemy2Class extends Enemy {
    constructor(image, spriteWidth, spriteHeight) {
        super(image, spriteWidth, spriteHeight);
        ctx2.imageSmoothingEnabled = false;
        this.angle = 0
        this.angleSpeed = Math.random() * 0.2
    }
    update2() {
        this.x -= this.speed;
        this.y += Math.sin(this.angle)
        this.angle += this.angleSpeed
        if(this.x + this.width < 0) this.x = canvas2.width;

        if (gameSpeed % this.flapSpeed === 0) {
            this.frame <= 4 ? this.frame++ : this.frame = 0
        }
    }
    draw2() {
        ctx2.drawImage(this.image,this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

for(let i = 0; i < numberOfEnimies ; i++){
    const enemies2 = new Enemy2Class('./enemies/enemy2.png', 266,188);
    enemies2Array.push(enemies2);
}

console.log(enemies2Array)



function animate2(){
    gameSpeed ++;
    ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemies2Array.forEach((enemy) => {
        enemy.update2();
        enemy.draw2();
    })

    requestAnimationFrame(animate2)
}

animate2()