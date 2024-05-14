const canvas = document.getElementById('canvas1')
const stateSelect = document.getElementById('state');
console.log(stateSelect.children)
const context = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;


const playerImage = new Image()
playerImage.src = './assets/shadow_dog.png'

const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY =0;
let gameFrame = 0;
let staggerFrames = 6;


const playState = [6,6,6,8,10,4,6,6,11,3]
const total = playState.reduce((current, acc) => {
    return acc + current;
}, 0)

const average = total/ playState.length;



function animate() {
    stateSelect.addEventListener('change', (e) => {
        frameY = parseInt(e.target.value);
        staggerFrames = Math.floor(average)  
    })
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    if(gameFrame % staggerFrames ==0){
        if (frameX < playState[frameY]) frameX++;
        else frameX = 0;
    }
    gameFrame++;
    requestAnimationFrame(animate)
}

animate();
