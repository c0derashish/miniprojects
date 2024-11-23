function load() {
    document.getElementById("load").style.display = "none";
}

function toggleInfo(showInfo) {
    const infoElement = document.getElementsByClassName("info")[0];
    infoElement.style.height = showInfo ? "100%" : "0%";
    infoElement.style.borderRadius = showInfo ? "0" : "0 0 50% 50%";
    infoElement.style.animationName = showInfo ? "expandInfo" : "collapseInfo";
}

// const sta = document.getElementById("sta");
// const res = document.getElementById("res");
// const ext = document.getElementById("ext");
// const alertp = document.getElementById("alert");
// document.getElementsByClassName("close").addEventListener('click', () => {
//     alertp.animationName = ("collapseInfo");
//     sta.style.display = ("none");
//     res.style.display = ("none");
//     ext.style.display = ("none");
//     alertp.style.height = "0%";
//     alertp.style.borderRadius = ("0 0 50% 50%");
// });

document.getElementById("hom").addEventListener('click', () => {
    window.location.reload();
});

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

// document.getElementById("home").addEventListener('click', () => {
//     ext.style.display = ("block");
//     alertp.animationName = ("expandInfo");
//     alertp.style.height = ("100%");
//     alertp.style.borderRadius = ("0");
// });

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const set = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

function removeElement(array, elementToRemove) {
    array.forEach((item, index) => {
        if (item === elementToRemove) {
            array.splice(index, 1);
        }
    });
    return array;
}

function play() {
    let emptyTileIndex = nset.indexOf(9);

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
            nset[index] = 9;
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

function checkWin() {
    if (nset.join('') === '123456789') {
        document.getElementById(`p9`).innerHTML = `<img src="image${img[0]}00.png" class="pl" id="pl9">`;
        alert(`Congratulations! You won the game!\nIn only ${totalMoves} moves.`);
    }
}

function start() {
    document.getElementById("main").style.display = "none";
    document.getElementById("org").innerHTML = (`<img class="box" id="or" src="image${img[0]}.png">`);
    document.getElementById("og").innerHTML = (`<img class="box" id="ogs" src="image${img[0]}.png">`);
    document.getElementById("ga").innerHTML = (`SHUFFLE`);
    updateBoard();
    alert(`Welcome!!\nClick on the pices that shares a side with blank box.\nBest of luck!!`);
    play();
}

document.getElementById("reset").addEventListener('click', () => {
    shuffleArray(nset);
    shuffleArray(img);
    updateBoard();
    document.getElementById("org").innerHTML = (`<img class="box" id="or" src="image${img[0]}.png">`);
    document.getElementById("og").innerHTML = (`<img class="box" id="ogs" src="image${img[0]}.png"><button id="ref"></button>`);
    alert(`Don't give up!\nPlay till the last move.`);
    movo();
    document.getElementById("ga").style.display = "block";
    document.getElementById("og").style.display = "block";
    document.getElementById("sc").style.display = "none";
    document.getElementById("org").style.display = "none";
    document.getElementById("ga").innerHTML = (`SHUFFLE`);
    play();
});