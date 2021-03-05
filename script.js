/* eslint-env es6 */
/* eslint-disable */
var currentPlayer = 0;
var p1Score = localStorage.getItem("p1Score");
var p2Score = localStorage.getItem("p2Score");
var counter = 0;
var win = 0;
var plays = [];
const winningCombos = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

function playAgain() {
    document.querySelector('.flip-card').classList.remove("active");
}

function changeDivScoreValues() {
    document.querySelector(".player1").innerHTML = p1Score;
    document.querySelector(".player2").innerHTML = p2Score;
}
window.onload = function () {
    console.log(p1Score);
    console.log(p2Score);
    if (p1Score == null && p2Score == null) {
        p1Score = 0;
        p2Score = 0;
    }
    changeDivScoreValues();
};

function resetScore() {
    clearGrid();
    localStorage.setItem("p1Score", 0);
    localStorage.setItem("p2Score", 0);
    p1Score = 0;
    p2Score = 0;
    changeDivScoreValues();
    console.log(p1Score);
    console.log(p2Score);
}

function clearGrid() {
    currentPlayer = 0;
    counter = 0;
    win = 0
    plays = [];
    document.querySelectorAll(".btn").forEach(function (f) {
        f.style.pointerEvents = 'auto';
        f.querySelector('.cross').classList.remove("active");
        f.querySelector('.circle').classList.remove("active");
        f.setAttribute("data-state", "");
    })
}

function togglePlayerTurn() {
    currentPlayer = !currentPlayer;
}

function blockAllbtns() {
    document.querySelectorAll(".btn").forEach(function (e) {
        e.style.pointerEvents = 'none';
    })
}

function updateScore() {
    document.querySelector(".winner p").innerHTML = "Winner!";
    console.log(p1Score);
    console.log(p2Score);
    !currentPlayer ? document.querySelector(".player1").innerHTML = p1Score : document.querySelector(".player2").innerHTML = p2Score;
    localStorage.setItem("p1Score", p1Score);
    localStorage.setItem("p2Score", p2Score);
    blockAllbtns();
}

function checkWin(b) {
    if (currentPlayer) {
        b.querySelector('.circle').classList.add("active");
        b.setAttribute("data-state", "O");
    } else {
        b.querySelector('.cross').classList.add("active");
        b.setAttribute("data-state", "X");
    }
    b.style.pointerEvents = 'none';
    plays[b.id] = b.getAttribute("data-state");
    console.log(plays);
    winningCombos.some(function (e) {
        if (plays[e[0]] === 'X' && plays[e[1]] === 'X' && plays[e[2]] === 'X') {
            p1Score++;
            win = 1;
            updateScore();
            setTimeout(function () {
                blockAllbtns()
                document.querySelector('.winner .shape').classList.remove("circle");
                document.querySelector('.winner .shape').classList.add("cross");
                document.querySelector('.flip-card').classList.add("active");
                clearGrid();
            }, 500);
        } else if (plays[e[0]] === 'O' && plays[e[1]] === 'O' && plays[e[2]] === 'O') {
            p2Score++;
            win = 1;
            updateScore();
            setTimeout(function () {
                blockAllbtns()
                document.querySelector('.winner .shape').classList.remove("cross");
                document.querySelector('.winner .shape').classList.add("circle");
                document.querySelector('.flip-card').classList.add("active");
                clearGrid();
            }, 500);
        }
    });
    counter++;
    if (counter == 9 && win == 0) {
        setTimeout(function () {
            document.querySelector('.winner .shape').classList.remove("cross");
            document.querySelector('.winner .shape').classList.remove("circle");
            document.querySelector(".winner p").innerHTML = "Draw!";
            document.querySelector('.flip-card').classList.add("active");
            clearGrid();
        }, 300);
    }
    togglePlayerTurn();
}
