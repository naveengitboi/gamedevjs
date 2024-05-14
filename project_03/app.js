/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const enemiesArray = []
const numberOfEnimies = 100;

class Enemy{
    constructor(){
        this.x = Math.floor(Math.random() * CANVAS_WIDTH); 
        this.y = Math.floor(Math.random() * CANVAS_HEIGHT);
        this.width =100;
        this.height = 100;
        this.speed = Math.random()*4 - 2;

    }
    update(){
        this.x += this.speed;
        this.y += this.speed;
    }

    draw(){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

for(let i =0; i< numberOfEnimies; i++){
    const enemy = new Enemy();
    enemiesArray.push(enemy)
}

function animate(){
    context.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach((enemy) => {
        enemy.update()
        enemy.draw();
    })
    requestAnimationFrame(animate);
}

animate();
