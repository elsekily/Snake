
let board;
let rows = 20;
let columns = 20;
let blockSize = 25;
let context;

let food = [Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)];
let snake = [[8, 10], [9, 10], [10, 10]];
let directions = [1, 0];
let playing = true; 

window.onload = function () {
    
    board = document.getElementById("game");
    board.height = blockSize * rows;
    board.width = blockSize * columns;

    context = board.getContext("2d");
    update();
    placeFood();
    drawFood();
    play();
}

document.addEventListener('keydown', function (event) {
    let newDirection;
    if (event.key === "ArrowUp") {
        newDirection = [0, -1];
    } else if (event.key === "ArrowDown") {
        newDirection = [0, 1];
    } else if (event.key === "ArrowLeft") {
        newDirection = [-1, 0];
    } else if (event.key === "ArrowRight") {
        newDirection = [1, 0];
    }

    directions = (newDirection[0] + directions[0] == 0 && newDirection[1] + directions[1] == 0)? directions: newDirection; 
});

function play() {
    // Define a function to update
    function updateAndContinue() {
        
        
        if (playing) {
            update();
            setTimeout(play, 175);
        }
 
    }

        updateAndContinue();
}

function update() {
    context.fillStyle = "grey";
    context.fillRect(0, 0, board.width, board.height);
    drawSnake();
    drawFood();
    moveSnake();
}

function moveSnake() {
    let newX = snake[snake.length - 1][0] + directions[0];
    newX = newX == -1 ? rows -1 : newX;
    newX = newX == rows ? 0 : newX;

    let newY = snake[snake.length - 1][1] + directions[1];
    newY = newY == -1 ? columns - 1 : newY;
    newY = newY == columns ? 0 : newY;


    let newPosition = [newX, newY];

    if (includesArray(snake, newPosition)) {
        playing = false;

        drawCollide(newPosition);
        return;
    }
    snake.push(newPosition);
    

    if (newPosition[0] == food[0] && newPosition[1] == food[1]) {
        updateScore();
        placeFood();
        return;
    }

 
    
   
    
    snake.splice(0, 1);
}

function updateScore() {
    let score = document.getElementById('score');
    let currentScore = parseInt(score.innerText, 10);
    currentScore++;
    score.innerText = currentScore;
}

function drawSnake() {
    context.fillStyle = "lime";
    snake.forEach(i => {
        context.fillRect(i[0]*blockSize, i[1]*blockSize, blockSize, blockSize); 
    });
}

function placeFood() {
    while (includesArray(snake,food)) {
        food[0] = Math.floor(Math.random() * rows);
        food[1] = Math.floor(Math.random() * columns);
    }   
}

function drawFood() {
    context.fillStyle = "black";
    context.fillRect( food[0] * blockSize+3, food[1] * blockSize+3, blockSize-6 , blockSize-6);
}

function includesArray(arrays, targetArray) {
    return arrays.some(function(array) {
        return array.length === targetArray.length && array.every(function(element, index) {
            return element === targetArray[index];
        });
    });
}

function togglePause() {
    let button = document.getElementById('pause');

    if (playing) {
        button.innerText = "Continue";
        button.classList.remove('btn-stop');
        button.classList.add('btn-cont');
    }
    else {
        button.innerText = "Pause";
        button.classList.remove('btn-cont');
        button.classList.add('btn-stop');
    }

    playing = !playing;
    play();
}

function drawCollide(newPosition) {
    context.fillStyle = "red";
    context.fillRect(newPosition[0]*blockSize , newPosition[1]*blockSize, blockSize, blockSize); 
 
    let button = document.getElementById('pause');
    button.style.display = 'none';


    let restartBtn = document.getElementById('restart');
    restartBtn.style.display = 'inline';
}

function restart() {
    location.reload();
}