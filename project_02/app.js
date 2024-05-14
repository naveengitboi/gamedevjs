const canvas = document.getElementById('canvas1')
const gsc = document.getElementById('gameSpeedController')
const gsValue = document.getElementById('gsValue')
gsc.value = 12;

const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 20;

gsc.addEventListener('change', (e) => {
    gameSpeed = e.target.value;
    if(e.target.value < 10){
        gsValue.innerText = `0${e.target.value}`;
    }
    else{
        gsValue.innerText = e.target.value;
    }
})


let bgLayers = []
for (let i = 1; i <= 5; i++) {
    const backgroundLayer = new Image();
    backgroundLayer.src = `./assets/layer-${i}.png`
    bgLayers.push(backgroundLayer);
}

let x = 0;

class Layer {
    constructor(image, speedModifier) {
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;

    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed)

    }


    draw() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }

}

const layer1 = new Layer(bgLayers[0], 1.25);
const parallaxLayers = []
for(let i = 1;i <= bgLayers.length; i++){
    const player = new Layer(bgLayers[i-1], (i)*(0.1));
    parallaxLayers.push(player);
}

function animate() {

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    parallaxLayers.forEach((layer, idx) => {
        layer.update();
        layer.draw()
    })

    requestAnimationFrame(animate);
}


animate()