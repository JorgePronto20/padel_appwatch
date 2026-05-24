let scoreUs = 0;
let scoreThem = 0;

let gamesUs = 0;
let gamesThem = 0;

let setsUs = 0;
let setsThem = 0;

let setNumber = 1;

let inTieBreak = false;
let inSuperTieBreak = false;

/* MENU */
function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

/* DISPLAY */
function display() {
  document.getElementById("scoreUs").innerText = scoreToDisplay(scoreUs);
  document.getElementById("scoreThem").innerText = scoreToDisplay(scoreThem);

  document.getElementById("games").innerText = `${gamesUs} - ${gamesThem}`;
  document.getElementById("set").innerText = `Set ${setNumber}`;
  document.getElementById("setsScore").innerText = `Sets: ${setsUs} - ${setsThem}`;
}

function scoreToDisplay(score) {
  if (inTieBreak || inSuperTieBreak) return score;
  if (score === 0) return "0";
  if (score === 15) return "15";
  if (score === 30) return "30";
  if (score === 40) return "40";
  if (score === 41) return "AD";
  return score;
}

/* ADICIONAR PONTO */
function addPoint(team) {
  if (inTieBreak) return addTieBreakPoint(team);
  if (inSuperTieBreak) return addSuperTieBreakPoint(team);

  if (team === "us") {
    scoreUs = nextScore(scoreUs, scoreThem);
    if (scoreUs === "win") {
      gamesUs++;
      resetPoints();
      checkSetWinner();
    }
  } else {
    scoreThem = nextScore(scoreThem, scoreUs);
    if (scoreThem === "win") {
      gamesThem++;
      resetPoints();
      checkSetWinner();
    }
  }

  display();
}

/* PONTUAÇÃO NORMAL */
function nextScore(my, opp) {
  if (my === 0) return 15;
  if (my === 15) return 30;
  if (my === 30) return 40;

  if (my === 40 && opp < 40) return "win";
  if (my === 40 && opp === 40) return 41;
  if (my === 41) return "win";
  if (opp === 41) return 40;

  return my;
}

/* VERIFICAR SET */
function checkSetWinner() {
  if (gamesUs === 6 && gamesThem === 6) {
    inTieBreak = true;
    scoreUs = 0;
    scoreThem = 0;
    return;
  }

  if (gamesUs >= 6 && gamesUs - gamesThem >= 2) {
    setsUs++;
    startNextSet();
    return;
  }

  if (gamesThem >= 6 && gamesThem - gamesUs >= 2) {
    setsThem++;
    startNextSet();
    return;
  }
}

/* TIE-BREAK */
function addTieBreakPoint(team) {
  if (team === "us") scoreUs++;
  else scoreThem++;

  if ((scoreUs >= 7 || scoreThem >= 7) && Math.abs(scoreUs - scoreThem) >= 2) {
    if (scoreUs > scoreThem) setsUs++;
    else setsThem++;

    inTieBreak = false;
    startNextSet();
  }

  display();
}

/* SUPER TIE-BREAK */
function addSuperTieBreakPoint(team) {
  if (team === "us") scoreUs++;
  else scoreThem++;

  if ((scoreUs >= 10 || scoreThem >= 10) && Math.abs(scoreUs - scoreThem) >= 2) {
    if (scoreUs > scoreThem) setsUs++;
    else setsThem++;

    inSuperTieBreak = false;
    startNextSet();
  }

  display();
}

/* NOVO SET */
function startNextSet() {
  setNumber++;
  gamesUs = 0;
  gamesThem = 0;
  resetPoints();
  display();
}

/* RESET */
function resetPoints() {
  scoreUs = 0;
  scoreThem = 0;
}

function newGame() {
  resetPoints();
  gamesUs = 0;
  gamesThem = 0;
  display();
}

function newSet() {
  resetPoints();
  gamesUs = 0;
  gamesThem = 0;
  setNumber++;
  display();
}

function resetAll() {
  scoreUs = 0;
  scoreThem = 0;
  gamesUs = 0;
  gamesThem = 0;
  setsUs = 0;
  setsThem = 0;
  setNumber = 1;
  inTieBreak = false;
  inSuperTieBreak = false;
  display();
}

display();
