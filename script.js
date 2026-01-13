let selectedColor = "";
let coins = 0;
let levelIndex = 0;
let filledCorrect = 0;

/* GET ELEMENTS */
const entry = document.getElementById("entry");
const game = document.getElementById("game");
const accuracy = document.getElementById("accuracy");
const levelText = document.getElementById("level");
const coinsText = document.getElementById("coins");

/* LEVEL DATA */
const levels = [
  ["red", "blue", "green", "yellow"],
  ["orange", "purple", "green", "blue"],
  ["red", "pink", "brown", "yellow"],
  ["cyan", "lime", "blue", "orange"],
  ["purple", "green", "yellow", "red"],
  ["brown", "blue", "pink", "lime"],
  ["red", "orange", "yellow", "green", "blue"],
  ["pink", "purple", "cyan", "lime", "brown"],
  ["blue", "green", "yellow", "orange", "red"],
  ["purple", "pink", "brown", "cyan", "lime"]
];

/* START GAME */
function startGame() {
  entry.style.display = "none";
  game.classList.remove("hidden");
  loadLevel();
}

/* LOAD LEVEL */
function loadLevel() {
  const boards = document.querySelectorAll(".board");
  const refBoard = boards[0];
  const playBoard = boards[1];

  refBoard.innerHTML = "<h3>Reference</h3>";
  playBoard.innerHTML = "<h3>Your Drawing</h3>";

  filledCorrect = 0;
  accuracy.innerText = "0%";
  levelText.innerText = levelIndex + 1;

  const colors = levels[levelIndex];

  colors.forEach(color => {
    /* Reference box */
    const ref = document.createElement("div");
    ref.className = "box " + color;
    refBoard.appendChild(ref);

    /* Player box */
    const play = document.createElement("div");
    play.className = "box";
    play.dataset.correct = color;

    play.addEventListener("click", () => {
      if (!selectedColor || play.dataset.done) return;

      play.style.background = selectedColor;
      play.dataset.done = "true";

      if (selectedColor === color) {
        filledCorrect++;
      }

      updateAccuracy(colors.length);
    });

    playBoard.appendChild(play);
  });
}

/* PICK COLOR */
function pick(color) {
  selectedColor = color;
}

/* UPDATE ACCURACY */
function updateAccuracy(total) {
  const percent = Math.round((filledCorrect / total) * 100);
  accuracy.innerText = percent + "%";

  if (percent === 100) {
    coins += 200;
    coinsText.innerText = coins;
  }
}

/* NEXT LEVEL */
function nextLevel() {
  if (levelIndex < levels.length - 1) {
    levelIndex++;
    loadLevel();
  } else {
    alert("🎉 All 10 Levels Completed!");
  }
}

/* SKIP LEVEL */
function skipLevel() {
  if (coins >= 500) {
    coins -= 500;
    coinsText.innerText = coins;
    nextLevel();
  } else {
    alert("❌ Not enough coins!");
  }
}
