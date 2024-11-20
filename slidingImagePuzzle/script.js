function load() {
    document.getElementById("load").style.display = "none";
}

function toggleInfo(showInfo) {
    const infoElement = document.getElementsByClassName("info")[0];
    infoElement.style.height = showInfo ? "100%" : "0%";
    infoElement.style.borderRadius = showInfo ? "0" : "0 0 50% 50%";
    infoElement.style.animationName = showInfo ? "expandInfo" : "collapseInfo";
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
        window.location.reload()}
});

// function toggleGoalSection(showSection) {
//     const goalSection = document.getElementsByClassName("org");
//     const sliderSection = document.getElementsByClassName("slider");
//     goalSection.style.right = showSection ? "0" : "100px";
//     sliderSection.style.left = showSection ? "100px" : "0";
//     goalSection.style.animationName = showSection ? "togIn" : "togOut";
//     sliderSection.style.animationName = showSection ? "togOut" : "togIn";
// }

document.getElementById("ref").addEventListener('click', () => {
    // toggleGoalSection(true);
    document.getElementsByClassName("org").right=("0");
  });
  
  document.getElementById("ga").addEventListener('click', () => {
    // toggleGoalSection(false);
    document.getElementsByClassName("org").right=("100px");
  });

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const set = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const nset = [...set];
let totalMoves = 0;
shuffleArray(nset);

function play() {
    let emptyTileIndex = nset.indexOf(9);
    const possibleMoves = [
        emptyTileIndex - 3,
        emptyTileIndex - 1,
        emptyTileIndex + 1,
        emptyTileIndex + 3
    ].filter(index => index >= 0 && index < 9);

    for (let i = 0; i < 9; i++) {
        document.getElementById(`p${i + 1}`).onclick = null;
    }

    possibleMoves.forEach(index => {
        document.getElementById(`p${index + 1}`).onclick = () => {
            const tileValue = nset[index];
            nset[index] = 9;
            nset[emptyTileIndex] = tileValue;
            emptyTileIndex = index;
            updateBoard();
            totalMoves++;
            document.getElementById("mov").innerHTML = `${totalMoves}`;
            checkWin();
            play();
        };
    });
}

function updateBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`p${i + 1}`).innerHTML = `<img src="image_part_00${nset[i]}.png" class="pl" id="pl${i + 1}">`;
    }
}

function checkWin() {
    if (nset.join('') === '123456789') {
        document.getElementById(`p9`).innerHTML = `<img src="image_part_009.png" class="pl" id="pl9">`;
        alert(`Congratulations! You won the game!\nIn only ${totalMoves} moves.`);
    }
}

function start() {
    document.getElementById("main").style.display = "none";
    updateBoard();
    alert(`Welocome!\nClick on the pices that shares a side with blank box.\nBest of luck!!`);
    play();
}

document.getElementById("reset").addEventListener('click', () => {
    shuffleArray(nset);
    alert(`Don't give up!\nPlay till the last move.`);
    totalMoves = 0;
    updateBoard();
});