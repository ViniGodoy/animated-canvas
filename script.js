'use strict'

let y = 0;

function process(time) {
    y += 100 * time;
    if (y > 420) y = -20;
}

function draw(ctx) {
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "pink";
    ctx.lineWidth = 2;

    ctx.arc(200, y, 20, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();
}




let lastFrameTime = 0;

function beginAnimation() {
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        alert("Canvas não disponível!");
        return;
    }
    function onFrame(time) {
        if (lastFrameTime === 0) {
            lastFrameTime = time;
        } else {
            const elapsed = (time - lastFrameTime) / 1000;
            process(elapsed);
            draw(canvas.getContext('2d'));
            lastFrameTime = time;
        }
        window.requestAnimationFrame(onFrame);
    }

    window.requestAnimationFrame(onFrame);
}

beginAnimation();
