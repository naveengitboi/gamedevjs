/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 700;
let canvasPos = canvas.getBoundingClientRect();
const explosion = [];


class Explosion{
    constructor(x,y){
        
        this.spriteWidth = 200;
        this.spriteHeight = 179
        this.width = this.spriteWidth*0.5;
        this.height = this.spriteHeight*0.5;
        this.image = new Image();
        this.image.src = './boom.png';
        this.frame = 0;
        this.timer = 0;
        this.x = x ;
        this.y = y;
        this.angle = Math.random()*6;
        this.sound = new Audio();
        this.sound.src = './boomSound.wav'
    }
    update(){
        if(this.frame == 0) this.sound.play()
        this.timer++;
        if(this.timer % 5 ==0){
            this.frame++;
        }
    }

    draw(){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle)
        context.drawImage(this.image, this.frame*this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight, 0*this.width*0.5, 0-this.height*0.5 , this.width, this.height)
        context.restore();
    }
}

const createAnimation = (e) => {
    let positionX = e.clientX - canvasPos.left;
    let positionY = e.clientY - canvasPos.top;

    explosion.push(new Explosion(positionX, positionY));
}

canvas.addEventListener('click', (e) => {
    createAnimation(e)
});
canvas.addEventListener('mousemove', (e) => {
    createAnimation(e)
})

function animate(){
    context.clearRect(0, 0,CANVAS_WIDTH, CANVAS_HEIGHT);

    for(let i = 0; i<explosion.length;i++){
        explosion[i].update()
        explosion[i].draw();
        if(explosion[i].frame > 5){
            explosion.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}

animate();