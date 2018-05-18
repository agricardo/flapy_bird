import {Bird, Enviroment, Pipe} from './entities';

window.onload = function () {
    const c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = 600;
    const ctx = c.getContext('2d');
    //  ctx.drawImage(document.getElementById('bird1'), 500, 20)

    const enviroment = new Enviroment(c, ctx);
    const bird = new Bird(100, 250, ctx);
    const pipes = [];
    setInterval(function () {
        let pipeSet = generateRandonPipes(ctx, c.width, c.height);
        pipes.push(pipeSet.top, pipeSet.botton)
    }, 1500)
    gameLoop();



    function gameLoop() {
        ctx.fillRect(0, 0, c.width, c.height);
        enviroment.update();
        enviroment.render();
        pipes.forEach(function (pipe1) {
            pipe1.update();
            pipe1.render();
        });

        bird.update();
        bird.render();
        if(detectCollision(bird, pipes, c)) {
            // alert("you lose!");
            // explosion.onload = function(){
            //     ctx.drawImage(explosion, 100, velY)
            // }
            window.location = "/";
        }
        window.requestAnimationFrame(gameLoop);
    }
};

function generateRandonPipes(ctx, canvasWidth, canvasHeigth) {
    let lengthTop = Math.round(Math.random() * 300 + 100);
    let lengthBottom = canvasHeigth - 230 - lengthTop;
    let returnVal = {};
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.botton = new Pipe(canvasWidth, canvasHeigth + 5 - lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
}

function detectCollision(bird, pipes, c) {
    // let collisionDetected = false;
    if(bird.y > c.height || bird.y < 0) {
        return true;
    }

    for (var i = 0; i < pipes.length; i++) {
        let e = pipes[i];
        let highPipe = e.ypos <= 0;
        let x0 = e.xpos, x1 = e.xpos+e.width;
        if (highPipe) {
            let y0 = e.ypos + e.length;
            let alpha = bird.x;
            let beta = bird.y - bird.height/2;
            if (alpha > x0 && alpha < x1 && beta < y0) {
                return true;
            }
        }
        else{
            let y2 = e.ypos;
            let a = bird.x;
            let b = bird.y + bird.height/2;
            if(a > x0 && a < x1 && b > y2) return true;
        }
    }
return false;
}

// const explosion = function(){
//     this.ypos = ypos;
//     this.xpos = xpos;
// }


// if(detectCollision == true){

// }