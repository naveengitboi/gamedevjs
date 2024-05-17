const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 800;

let lastTime = 0;


class Game {
    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.enemies = []
        this.enemyInterval = 1000;
        this.enemyTimer = 0;
        this.enemyTypes = ['worm', 'ghost', 'spider']
        this.#addEnemy();
    }

    update(deltaTime) {
        
        if(this.enemyTimer > this.enemyInterval){
            this.#addEnemy();
            this.enemyTimer = 0;
            this.enemies = this.enemies.filter((obj) => !obj.markDeletion)
        }else{
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach((obj) => obj.update(deltaTime));
        this.enemies.sort((a,b) => a.y - b.y)
    }
    draw() {
        this.enemies.forEach((obj) => obj.draw(this.ctx));
    }

    #addEnemy(){
        const randomEnemy = this.enemyTypes[Math.floor(Math.random()*(this.enemyTypes.length))]
        if(randomEnemy == this.enemyTypes[0]){
            this.enemies.push(new Worm(this))
        }
        if (randomEnemy == this.enemyTypes[1]) {
            this.enemies.push(new Ghost(this))
        }
        if (randomEnemy == this.enemyTypes[2]) {
            this.enemies.push(new Spider(this))
        }
    }
}


class Enemy {
    constructor(game) {
        this.game = game
        this.x = this.game.width;
        this.y = Math.random()*this.game.height;
        this.width = 100;
        this.height = 100;
        this.markDeletion = false;
        this.frameInterval = 100;
        this.frameTimer = 0;
    }

    update(deltaTime) {
        this.x -= (this.vx*deltaTime);
        this.angle += Math.random()*0.5;
        if(this.frameTimer > this.frameInterval){
            this.frames <= 4 ? this.frames++: this.frames = 0;
            this.frameTimer = 0
        }
        else{
            this.frameTimer += deltaTime
        }
        if(this.x < - this.width){
            this.markDeletion = true
        }

    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frames*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x, this.y, this.width, this.height)
    }

}

class Worm extends Enemy{
    constructor(game){
        super(game)
        
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.image = worm
        this.x = this.game.width;
        this.width = this.spriteWidth*0.5
        this.height = this.spriteHeight*0.5 
        this.y = this.game.height - this.height;

        this.vx = Math.random()*0.5 + 0.2
        this.frames = 0
    }
}

class Ghost extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.image = ghost
        this.x = this.game.width;
        this.width = this.spriteWidth * 0.5
        this.height = this.spriteHeight * 0.5
        this.y = Math.random()*this.game.height * 0.6
        this.vx = Math.random() * 0.1 + 0.2
        this.frames = 0
        this.angle = 0;
        this.curve = Math.random()*10
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y += Math.sin(this.angle)*this.curve;
        this.angle += 0.015;
    }
    draw(ctx){
        ctx.save()
        ctx.globalAlpha = 0.7;
        super.draw(ctx)
        ctx.restore()
    }
}
class Spider extends Enemy {
    constructor(game) {
        super(game)

        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.image = spider
        this.x = Math.random()*this.game.width;
        this.width = this.spriteWidth * 0.5
        this.height = this.spriteHeight * 0.5
        this.y = - this.height;

        this.vx = 0;
        this.vy = Math.random()*0.1 + 0.5
        this.frames = 0
        this.maxDown = Math.random()*this.game.height
    }

    update(deltaTime){
        super.update(deltaTime);
        this.y += this.vy
        if(this.y > this.maxDown) this.vy *= -1;
        if(this.y < 0 -this.height ) {
            this.markDeletion = true;
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2 , 0);
        ctx.lineTo(this.x + this.width/2, this.y + 10);
        ctx.stroke();
        super.draw(ctx);
        
    }
}

const game = new Game(ctx, canvas.width, canvas.height);

function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  game.update(deltaTime)
  game.draw()

  requestAnimationFrame(animate);
}


animate(0);
