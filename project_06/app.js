/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = window.innerWidth;
CANVAS_HEIGHT = canvas.height = window.innerHeight;


let ravens = []

class Raven{
    constructor(){
        this.width = 100;
        this.height = 100;
        this.x = canvas.width;
        this.y = Math.random()*(canvas.height - this.height);
        this.directionX = Math.random()*5 + 4;
        this.directionY = Math.random()*5 - 3;

    }

    update(){
        this.x -=  this.directionX;
    }
    draw(){
        context.fillRect(this.x, this.y, this.width, this.height);
        
    }
}


function animate(){


    requestAnimationFrame(animate)
}

animate()