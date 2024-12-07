function load() {
    document.getElementById("load").style.display = "none";
}

function toggleInfo(showInfo) {
    const infoElement = document.getElementsByClassName("info")[0];
    infoElement.style.height = showInfo ? "105%" : "0%";
    infoElement.style.borderRadius = showInfo ? "0" : "0 0 50% 50%";
}

document.getElementById("infoo").addEventListener('click', () => {
    toggleInfo(true);
    document.getElementById("infoo").style.display = "none";
    document.getElementById("infoc").style.display = "block";
});

document.getElementById("infoc").addEventListener('click', () => {
    toggleInfo(false);
    document.getElementById("infoo").style.display = "block";
    document.getElementById("infoc").style.display = "none";
});

document.getElementById("home").addEventListener('click', () => {
    if (confirm("Are you sure you want to leave the game?")) {
        window.location.reload()
    }
});

function on() {
    document.getElementById("og").style.display = "none";
    document.getElementById("ga").style.display = "none";
    document.getElementById("sc").style.display = "block";
    document.getElementById("org").style.display = "block";
    document.getElementById("org").innerHTML = (`<img class="box" id="or" src="image${img[0]}.png"><button id="ref"></button>`);
    document.getElementById("ref").addEventListener('click', () => {
        document.getElementById("og").style.display = "block";
        document.getElementById("ga").style.display = "block";
        document.getElementById("sc").style.display = "none";
        document.getElementById("org").style.display = "none";
        document.getElementById("ga").innerHTML = (`BACK TO GAME`);
    });
}

document.getElementById("ga").addEventListener('click', () => {
    on();
});

function isUnsolvable(puzzle) {
    const flattened = puzzle.filter(tile => tile !== 0);
    let inversions = 0;
    for (let i = 0; i < flattened.length; i++) {
        for (let j = i + 1; j < flattened.length; j++) {
            if (flattened[i] > flattened[j]) {
                inversions++;
            }
        }
    }
    return inversions % 2 !== 0;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    const sset = [...array];
    isUnsolvable(sset) ? shuffleArray(array) : play();
}

const set = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const img = [1, 1, 2, 2, 3, 3];
const nset = [...set];
let totalMoves = 0;
shuffleArray(nset);
shuffleArray(img);


function movo() {
    totalMoves = 0;
    document.getElementById("mov").innerHTML = `${totalMoves}`;
}

function movp() {
    totalMoves++;
    document.getElementById("mov").innerHTML = `${totalMoves}`;
}

function play() {
    let emptyTileIndex = nset.indexOf(0);

    const possibleMoves = [
        emptyTileIndex - 3,
        emptyTileIndex - 1,
        emptyTileIndex + 1,
        emptyTileIndex + 3
    ].filter(index => index >= 0 && index < 9);


    if (emptyTileIndex == 2) {
        delete possibleMoves[1];
    }
    if (emptyTileIndex == 5) {
        delete possibleMoves[2];
    }
    if (emptyTileIndex == 3) {
        delete possibleMoves[1];
    }
    if (emptyTileIndex == 6) {
        delete possibleMoves[1];
    }


    for (let i = 1; i < 10; i++) {
        document.getElementById(`p${i}`).onclick = null;
        document.getElementById(`p${i}`).style.cursor = "auto";
    }

    possibleMoves.forEach(index => {
        document.getElementById(`p${index + 1}`).style.cursor = "pointer";
        document.getElementById(`p${index + 1}`).onclick = () => {
            const tileValue = nset[index];
            nset[index] = 0;
            nset[emptyTileIndex] = tileValue;
            emptyTileIndex = index;
            updateBoard();
            movp();
            checkWin();
            play();
        };
    });
}

function updateBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`p${i + 1}`).innerHTML = `<img src="image${img[0]}0${nset[i]}.png" class="pl" id="pl${i + 1}">`;
    }
}

function goodLuck() {
    document.getElementById("og").innerHTML = (`<img class="box" id="ogs" src="goodLuck.jpg"><p id="mess"></p>`);
    document.getElementById("cl").style.display = "block";
    document.getElementById("ga").style.display = "none";
    document.getElementById("og").style.display = "block";
    document.getElementById("sc").style.display = "none";
    document.getElementById("org").style.display = "none";
    document.getElementById("mess").innerHTML = (`Welcome!!<br>Click on the pices that shares a side with blank box.`);
}

function congrats() {
    document.getElementById("og").innerHTML = (`<img class="box" id="ogs" src="congrats.jpg"><p id="mess"></p>`);
    document.getElementById("ga").style.display = "none";
    document.getElementById("og").style.display = "block";
    document.getElementById("sc").style.display = "none";
    document.getElementById("org").style.display = "none";
    document.getElementById("ga").style.display = "none";
    document.getElementById("mess").innerHTML = (`You won the game!<br>In only ${totalMoves} moves.`);
}

document.getElementById("cl").addEventListener('click', () => {
    document.getElementById("ga").style.display = "block";
    document.getElementById("ga").innerHTML = (`SHUFFLE`);
    document.getElementById("cl").style.display = "none";
    document.getElementById("og").innerHTML = (`<img class="box" id="ogs" src="image${img[0]}.png"><button id="ref"></button>`);
    document.getElementById("mess").innerHTML = '';
});

function checkWin() {
    if (nset.join('') === '123456780') {
        document.getElementById(`p9`).innerHTML = `<img src="image${img[0]}09.png" class="pl" id="pl9">`;
        congrats();
    }
}

function start() {
    document.getElementById("main").style.display = "none";
    document.getElementById("org").innerHTML = (`<img class="box" id="or" src="image${img[0]}.png">`);
    updateBoard();
    goodLuck();
    play();
}

function restart() {
    goodLuck();
    shuffleArray(nset);
    shuffleArray(img);
    updateBoard();
    document.getElementById("org").innerHTML = (`<img class="box" id="or" src="image${img[0]}.png">`);
    movo();
    play();
}

document.getElementById("reset").addEventListener('click', () => {
    if (confirm("Are you sure you want to restart the game?")) {
        restart();
    }
});