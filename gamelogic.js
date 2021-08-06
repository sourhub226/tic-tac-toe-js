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

var strikeline = document.querySelector(".strike");
var root = document.querySelector(':root');
var flipCard = document.querySelector('.flip-card');
var player1 = document.querySelector(".player1");
var player2 = document.querySelector(".player2");
var winnerShape = document.querySelector('.winner .shape');
var winORdrawText = document.querySelector(".winner p");


function strikethrough(index) {

    switch (index) {
        case 0:
            strikeline.style.left = "-10px";
            strikeline.style.top = "15%";
            strikeline.style.transform = "rotate(0deg)";
            root.style.setProperty('--diagonal', 'initial');
            break;
        case 1:
            strikeline.style.left = "-10px";
            strikeline.style.top = "49%";
            strikeline.style.transform = "rotate(0deg)";
            root.style.setProperty('--diagonal', 'initial');
            break;
        case 2:
            strikeline.style.left = "-10px";
            strikeline.style.top = "82%";
            strikeline.style.transform = "rotate(0deg)";
            root.style.setProperty('--diagonal', 'initial');
            break;
        case 3:
            strikeline.style.left = "16.5%";
            strikeline.style.top = "-12px";
            strikeline.style.transform = "rotate(90deg)";
            root.style.setProperty('--diagonal', 'initial');
            break;
        case 4:
            strikeline.style.left = "50%";
            strikeline.style.top = "-12px";
            strikeline.style.transform = "rotate(90deg)";
            root.style.setProperty('--diagonal', 'initial');
            break;
        case 5:
            strikeline.style.left = "83.5%";
            strikeline.style.top = "-12px";
            strikeline.style.transform = "rotate(90deg)";
            root.style.setProperty('--diagonal', 'initial');
            break;
        case 6:
            strikeline.style.left = "4px";
            strikeline.style.top = "0px";
            strikeline.style.transform = "rotate(45deg)";
            root.style.setProperty('--diagonal', '415px');
            break;
        case 7:
            strikeline.style.left = "98.8%";
            strikeline.style.top = "0px";
            strikeline.style.transform = "rotate(135deg)";
            root.style.setProperty('--diagonal', '415px');
            break;
    }
    strikeline.classList.add("active");
}


function triggerConfetti() {
    confetti({
        particleCount: 150,
        origin: {
            y: 0.8
        }
    });
}

function playAgain() {
    clearGrid();
    flipCard.classList.remove("active");
}

function changeDivScoreValues() {
    player1.innerHTML = p1Score;
    player2.innerHTML = p2Score;
}

function setScale() {
    var playarea = document.querySelector(".play-area");
    if (window.innerWidth < 430) {
        playarea.style.transform = `scale(${window.innerWidth/430})`;
    } else {
        playarea.style.transform = "scale(1)";
    }
    console.log(playarea.style.transform);
}

window.onload = function () {
    //    console.log(p1Score);
    //    console.log(p2Score);
    if (p1Score == null && p2Score == null) {
        p1Score = 0;
        p2Score = 0;
    }
    changeDivScoreValues();
    setScale();
};

function resetScore() {
    clearGrid();
    localStorage.setItem("p1Score", 0);
    localStorage.setItem("p2Score", 0);
    p1Score = 0;
    p2Score = 0;
    changeDivScoreValues();
    //    console.log(p1Score);
    //    console.log(p2Score);
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
    winORdrawText.innerHTML = "Winner!";
    //    console.log(p1Score);
    //    console.log(p2Score);
    !currentPlayer ? player1.innerHTML = p1Score : player2.innerHTML = p2Score;
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
    //    console.log(plays);
    winningCombos.some(function (e) {
        if (plays[e[0]] === 'X' && plays[e[1]] === 'X' && plays[e[2]] === 'X') {
            //            console.log("win " + winningCombos.indexOf(e));
            strikethrough(winningCombos.indexOf(e));
            p1Score++;
            win = 1;
            updateScore();
            triggerConfetti();
            setTimeout(function () {
                blockAllbtns()
                strikeline.classList.remove("active");
                winnerShape.classList.remove("circle");
                winnerShape.classList.add("cross");
                flipCard.classList.add("active");
                clearGrid();
            }, 700);
        } else if (plays[e[0]] === 'O' && plays[e[1]] === 'O' && plays[e[2]] === 'O') {
            //            console.log("win " + winningCombos.indexOf(e));
            strikethrough(winningCombos.indexOf(e));
            p2Score++;
            win = 1;
            updateScore();
            triggerConfetti();
            setTimeout(function () {
                blockAllbtns()
                strikeline.classList.remove("active");
                winnerShape.classList.remove("cross");
                winnerShape.classList.add("circle");
                flipCard.classList.add("active");
                clearGrid();
            }, 700);
        }
    });
    counter++;
    if (counter == 9 && win == 0) {
        setTimeout(function () {
            winnerShape.classList.remove("cross");
            winnerShape.classList.remove("circle");
            winORdrawText.innerHTML = "Draw!";
            flipCard.classList.add("active");
            clearGrid();
        }, 300);
    }
    togglePlayerTurn();
}
