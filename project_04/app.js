/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 700;

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
        this.angle = 0
        this.angleSpeed = Math.random()*2;
        this.curve = Math.random()*200
    }
    update(){
        this.x = (CANVAS_WIDTH / 2 - this.width/2)+  canvas.width/2*Math.sin(this.angle * Math.PI/90) ;
        this.y = (CANVAS_HEIGHT/2 - this.height/2) +  canvas.height/2*Math.cos(this.angle * Math.PI/360);
        //this.y = Math.cos(this.angle);
        this.angle += this.angleSpeed
        if(gameSpeed%this.flapSpeed === 0){
            this.frame <= 4 ? this.frame++ : this.frame = 0
        }
    }

    draw(){
        context.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight, this.x,this.y,this.width, this.height)
    }
}

for(let i =0; i< numberOfEnimies; i++){
    const enemy = new Enemy('./enemy3.png', 218,177);
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
