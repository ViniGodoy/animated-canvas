function process(time) {
    angle += 0.1 * time;
}

function draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "green";
    ctx.lineWidth = 2;

    ctx.arc(95, 50, 20, angle, 1 * Math.PI);
    ctx.fill();
    ctx.stroke();
}




let startTime = 0;

function onFrame(time) {
    if (startTime === 0) {
        startTime = time;
    } else {
        const elapsed = (startTime - time) / 1000;
        process(elapsed)
    }
    window.requestAnimationFrame(onFrame);
}


function beginAnimation() {
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        alert("Canvas não disponível!");
    } else {
        draw(canvas.getContext('2d'));
    }

    window.requestAnimationFrame(onFrame);
}
