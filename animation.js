'use strict'

const canvas = document.querySelector('#canvas');

const RADIUS = 20;
const SPEED = 100;

let y = canvas.height / 2
let velocity = SPEED;

function update(time) {
    //Deslocamento da bola
    y += velocity * time;

    // Inverte a direção da bola se atingir os cantos.
    if (y < RADIUS) velocity = SPEED;
    else if (y > canvas.width - RADIUS) velocity = -SPEED;
}

function draw(ctx) {
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "pink";
    ctx.lineWidth = 2;

    ctx.arc(200, y, RADIUS, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();
}


function beginAnimation() {
    if (!canvas.getContext) {
        alert("Canvas não disponível!");
        return;
    }

    const ctx = canvas.getContext('2d');
    let lastFrameTime = 0;

    function onFrame(time) {
        //Não temos como calcular a diferença de tempo entre dois quadros no primeiro quadro
        //Por isso, se for ele (lastFrameTime === 0) pulamos ele sem desenhar
        if (lastFrameTime !== 0) {
            //Calculamos o tempo transcorrido, em segundos
            const elapsed = (time - lastFrameTime) / 1000;
            update(elapsed); //Atualizamos a lógica

            //Desenhamos
            ctx.save();
            draw(ctx);
            ctx.restore();
        }
        //Guardamos o tempo desse quadro para usar no próximo desenho
        lastFrameTime = time;
        //Solicitamos o próximo quadro
        window.requestAnimationFrame(onFrame);
    }

    //Solicita o primeiro quadro
    window.requestAnimationFrame(onFrame);
}

beginAnimation();
