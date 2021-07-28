let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; //taamnho de cada quadradinho da tela, que é 1/16 da tela
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let apple = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//movimento inicial
let direction = "right";

function criarBG(){
    context.fillStyle = "lightgreen";
    //cada quadrado tem 32, por tanto 16*32 = 512, que é o tamanho do canva
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

document.addEventListener('keydown', update);

function update (event){
    //direção do que foi digitado não pode ser oposta à que estava indo.
    //os números abaixo correspondem às respectivas teclas
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function criarApple(){
    context.fillStyle = "red";
    context.fillRect(apple.x, apple.y, box, box);
}

criarApple();

function iniciarJogo(){
    
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15*box;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15*box;

    //o for percorre todo o comprimento da cobrinha (i vai pegando a posição de cada parte).
    //se "i" for igual à posição da cabeça, o jogo para.
    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over!");
        }
    }

    criarBG();
    criarCobra();
    criarApple();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //cada vez que a funcção iniciar jogo é chamada (no intervalo estipulado lá em baixo), anda uma casa
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != apple.x || snakeY != apple.y){
        snake.pop();
        //faz sumir o quadrado desenhado anteriormente, dando a sensação de que se moveu
    }else{
        apple.y = Math.floor(Math.random() * 15 + 1) * box;
        apple.x = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 200);



