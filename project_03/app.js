/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const enemiesArray = []
const numberOfEnimies = 100;
let gameSpeed = 1;
class Enemy{
    constructor(image, sw, sh){
        this.image = new Image();
        this.image.src = image;
        this.speed = Math.random()*4 - 2;
        this.frame = 0;
        this.spriteWidth = sw;
        this.spriteHeight = sh;
        this.width = this.spriteWidth / 3.5;
        this.height = this.spriteHeight/ 2.5;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
        this.x = Math.floor(Math.random() * (CANVAS_WIDTH - this.width));
        this.y = Math.floor(Math.random() * (CANVAS_HEIGHT - this.height));
 
    }
    update(){
        this.x += Math.random()*5 -2.5;
        this.y += Math.random()*5 -2.5;

        if(gameSpeed%this.flapSpeed === 0){
            this.frame <= 4 ? this.frame++ : this.frame = 0
        }
    }

    draw(){
        context.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight, this.x,this.y,this.width, this.height)
    }
}

for(let i =0; i< numberOfEnimies; i++){
    const enemy = new Enemy('./enemies/enemy1.png', 293,155);
    enemiesArray.push(enemy)
}

function animate(){
    gameSpeed++;
    context.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach((enemy) => {
        enemy.update()
        enemy.draw();
    })
    
    requestAnimationFrame(animate);
}

animate();
