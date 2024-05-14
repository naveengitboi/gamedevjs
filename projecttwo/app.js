const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 10;
let bgLayers = []
for(let i = 1; i<= 5; i++){
    const backgroundLayer = new Image();
    backgroundLayer.src = `./assets/layer-${i}.png`
    bgLayers.push(backgroundLayer);
}