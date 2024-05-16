/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById('collisionCanvas')
const collisionContext = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
console.log(collisionContext)

//controllers
const gspeed = document.getElementById('speed');
const gSpeedShower = document.getElementById('gSpeedShower');
const hscore = document.getElementById('hscore')

let ravens = []
let ravenInterval = 1000;
let timeToNext = 0;
let lastTime = 0;
let gameSpeed = 0;
let score = 0;
let highscore = 0;
hscore.innerText = highscore
context.font = '35px Impact'
let ravenComingSpeed = 4
gspeed.addEventListener('change', (e) => {
    console.log(e.target.value)
    ravenComingSpeed = +e.target.value
    gSpeedShower.innerText = ravenComingSpeed < 10? '0'+ravenComingSpeed: ravenComingSpeed;
})
class Raven{
    constructor(){
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random()*0.6 + 0.2
        this.width = this.spriteWidth*this.sizeModifier;
        this.height = this.spriteHeight*this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random()*(canvas.height - this.height);
        this.directionX = Math.random()*2 + ravenComingSpeed;
        this.directionY = Math.random()*5 - 3;
        this.outOfScreen = false;
        this.image = new Image();
        this.image.src = './raven.png';
        
        this.frame = 0
        this.flapSpeed = Math.floor(Math.random()*5 + 2);
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        this.color = 'rgb('+ this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';

    }

    update(){
        this.x -=  this.directionX;
        this.y += this.directionY
        if(this.x < -this.width){
            this.outOfScreen = true;   
        }
        if(this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = -1*this.directionY
        }
        if(gameSpeed%this.flapSpeed ==0){
            this.frame <= 4 ? this.frame++ : this.frame = 0
        }
    }
    draw(){
        collisionContext.fillStyle = this.color;
        collisionContext.fillRect(this.x, this.y, this.width, this.height);

        context.drawImage(this.image,this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)

    }
}

function drawScore(){
    context.fillStyle ='black';
    context.fillText('Score:'+ score, 53, 53);
    context.fillStyle ='white';
    context.fillText('Score:'+ score, 50, 50);
}

window.addEventListener('click', (e) => {
    const detectPixelColor = collisionContext.getImageData(e.x,e.y, 1, 1);

    const pc  = detectPixelColor.data
    
   ravens.forEach((raven) => {
       let isClick = true;
        for(let i= 0 ; i <3 ; i++){
            if(pc[i] != raven.randomColors[i]){
                isClick  =false;
                break;
            }
        }
        if(isClick){
            raven.outOfScreen = true;
            score++;
            if(score > highscore){
                hscore.innerText = score;
            }
        }
   })
    
})



function animate(timestamp){
    gameSpeed ++;
    context.clearRect(0,0,canvas.width, canvas.height)
    collisionContext.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height)
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp
    timeToNext += deltaTime
    if(timeToNext > ravenInterval){
        ravens.push(new Raven());
        timeToNext = 0
        ravens.sort(function(a, b){
            return a.width -  b.width;
        })
    }
    drawScore();
    [...ravens].forEach(raven => raven.update());
    [...ravens].forEach(raven => raven.draw())
    ravens = ravens.filter(raven => !raven.outOfScreen)

    requestAnimationFrame(animate)
}

animate(0)