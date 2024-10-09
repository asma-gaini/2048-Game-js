let move_data = [
  {
    number: 1,
    score: "",
    time: "",
    moveArray: [],
  },
  {
    number: 2,
    score: "",
    time: "",
    moveArray: [],
  },
  {
    number: 3,
    score: "",
    time: "",
    moveArray: [],
  },
  {
    number: 4,
    score: "",
    time: "",
    moveArray: [],
  },
  {
    number: 5,
    score: "",
    time: "",
    moveArray: [],
  },
];

let scoreGame = 0;
let moveCounter = 1; //tetad harekat k baghimandesho b size hesab mikonim bara por kardan arraye ye harekat
let clickUndo = 0;

let moveNumber = 0; //all moves

const size = 4; //size of row and clumn
const numberOfPlayhouses = size * size;
var number = 0;
var randomIndex = 0;
let arrayGame = [
  // 2, 0, 0, 0, 4, 0, 2, 0, 4, 0, 0, 0, 4, 4, 2, 0, 2, 4, 0, 0, 2, 0, 2, 2, 2,
  // 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0,
];
let tempArray = [];
for (let i = 0; i < numberOfPlayhouses; i++) {
  arrayGame.push(0);
  tempArray.push(i);
}

var time = 0;
var interval;
var display = document.getElementById("display");

window.onload = createGame();

function createGame() {
  readLocalstorage();
  addColor();
}

function setScore() {
  const getScoreElement = document.querySelector("#score");
  const initialScore = document.createElement("h2");
  initialScore.setAttribute("class", "score");
  initialScore.innerHTML = "Score: " + scoreGame;
  getScoreElement.appendChild(initialScore);
}

const getScoreGame = document.querySelector(".score");
function updateTempArray() {
  tempArray = [];
  for (let j = 0; j < arrayGame.length; j++) {
    if (arrayGame[j] == 0) {
      // index ro vared temp konam
      tempArray.push(j);
    }
  }
}

function layout() {
  const getLayout = document.querySelector("#layout");
  const createGrid = document.createElement("div");
  createGrid.setAttribute("class", "grid-container");
  getLayout.appendChild(createGrid);

  const container = document.querySelector(".grid-container");

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const createGridSquare = document.createElement("div");
    createGridSquare.setAttribute("class", "grid-item");
    if (size == 4) {
      createGridSquare.classList.add("gridItem_square4");
    } else if (size == 5) {
      createGridSquare.classList.add("gridItem_square5");
    } else if (size == 6) {
      createGridSquare.classList.add("gridItem_square6");
    }
    if (arrayGame[i] == 0) {
      createGridSquare.innerHTML = "  ";
    } else {
      createGridSquare.innerHTML = arrayGame[i];
    }
    createGrid.appendChild(createGridSquare);
  }
}
function changeNumber0() {
  var selectArray = document.querySelectorAll(".grid-item");
  for (let j = 0; j < selectArray.length; j++) {
    if (selectArray[j].innerHTML == 0) {
      selectArray[j].innerHTML = "  ";
    }
  }
}

function updateArrayGame() {
  var selectArray = document.querySelectorAll(".grid-item");
  for (let i = 0; i < selectArray.length; i++) {
    selectArray[i].innerHTML = arrayGame[i];
  }
  for (let j = 0; j < selectArray.length; j++) {
    if (selectArray[j].innerHTML == 0) {
      selectArray[j].innerHTML = "  ";
    }
  }
  addColor();
}

function randomNumber() {
  const rand = Math.floor(Math.random() * tempArray.length);
  const randomTempValue = tempArray[rand];
  randomIndex = randomTempValue;
}

function changeRandomToNumber() {
  randomNumber();
  if (randomIndex % 2 == 0) {
    number = 2;
  } else {
    number = 4;
  }
}

function setNumberInArray() {
  changeRandomToNumber();

  const index = tempArray.indexOf(randomIndex);
  const tempArrayWithoutElement = tempArray.splice(index, 1);
  arrayGame[randomIndex] = number;
  // console.log(tempArray);
  // if (tempArray == 0) {
  //   alert("sorry! you are game over😢");
  // }
}
function initialArray() {
  for (let i = 0; i < 5; i++) {
    setNumberInArray();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.which === 40) {
    console.log("downArrowKey was pressed");
    moveDown();
  } else if (e.which === 38) {
    console.log("upArrowKey was pressed");
    moveUp();
  } else if (e.which === 37) {
    console.log("leftArrowKey was pressed");
    moveLeft();
  } else if (e.which === 39) {
    console.log("rightArrowKey was pressed");
    moveRight();
  }
});
function moveUndo() {
  for (let i = 0; i < move_data.length; i++) {
    if (move_data[i].number == moveCounter % size) {
      let arrayTemp = [];
      for (let i = 0; i < arrayGame.length; i++) {
        arrayTemp.push(arrayGame[i]);
      }
      move_data[i].moveArray = arrayTemp;
      arrayTemp = [];
      move_data[i].score = scoreGame;
      break;
    } else if (move_data[i].number == size) {
      let arrayTemp = [];
      for (let i = 0; i < arrayGame.length; i++) {
        arrayTemp.push(arrayGame[i]);
      }
      move_data[i].moveArray = arrayTemp;
      arrayTemp = [];
      move_data[i].score = scoreGame;
      break;
    }
  }

  moveCounter++;
}

function moveRight() {
  for (let i = numberOfPlayhouses - 1; i >= 0; i--) {
    //enteghal 0 ha
    if (i != numberOfPlayhouses - 1 && i % size != size - 1) {
      if (arrayGame[i] != 0 && arrayGame[i + 1] == 0) {
        while (arrayGame[i + 1] == 0 && i % size != size - 1) {
          arrayGame[i + 1] = arrayGame[i];
          arrayGame[i] = 0;
          i++;
        }
      }
    }
  }
  for (let i = numberOfPlayhouses - 1; i >= 0; i--) {
    if (i % size != 0) {
      //faghat ag 2 ta adad moshabeh kenar ham bashan
      if (arrayGame[i - 1] == arrayGame[i] && arrayGame[i] != 0) {
        const arrayGamePre = arrayGame[i - 1];
        arrayGame[i] = arrayGamePre * 2;
        arrayGame[i - 1] = 0;
        let score = arrayGamePre * 2;
        scoreGame += score;
        getScoreGame.innerHTML = "Score: " + scoreGame;
      }
    }
  }
  for (let i = numberOfPlayhouses - 1; i >= 0; i--) {
    //enteghal 0 ha
    if (i != numberOfPlayhouses - 1 && i % size != size - 1) {
      if (arrayGame[i] != 0 && arrayGame[i + 1] == 0) {
        while (arrayGame[i + 1] == 0 && i % size != size - 1) {
          arrayGame[i + 1] = arrayGame[i];
          arrayGame[i] = 0;
          i++;
        }
      }
    }
  }
  updateTempArray();
  setNumberInArray();
  updateArrayGame();
  moveUndo();
  if (clickUndo > 0) {
    clickUndo--;
    document.querySelector(".undo").innerHTML = "Undo: " + clickUndo;
  }
  moveNumber++;
  setLocalStorageGame();
}

function moveLeft() {
  for (let i = 0; i < numberOfPlayhouses; i++) {
    //enteghal 0 ha
    if (i != numberOfPlayhouses - 1 && i % size != size - 1) {
      if (arrayGame[i] == 0 && arrayGame[i + 1] != 0) {
        while (arrayGame[i + 1] != 0 && i % size != size - 1) {
          arrayGame[i] = arrayGame[i + 1];
          arrayGame[i + 1] = 0;
          while (arrayGame[i - 1] == 0 && i % size != 0) {
            arrayGame[i - 1] = arrayGame[i];
            arrayGame[i] = 0;
            i--;
          }
          i++;
        }
      }
    }
  }
  for (let i = 0; i < numberOfPlayhouses; i++) {
    if (i % size != size - 1) {
      //faghat ag 2 ta adad moshabeh kenar ham bashan
      if (arrayGame[i] == arrayGame[i + 1]) {
        const arrayGameNext = arrayGame[i];
        arrayGame[i] = arrayGameNext * 2;
        arrayGame[i + 1] = 0;
        let score = arrayGameNext * 2;
        scoreGame += score;
        getScoreGame.innerHTML = "Score: " + scoreGame;
      }
    }
  }
  for (let i = 0; i < numberOfPlayhouses; i++) {
    //enteghal 0 ha
    if (i != numberOfPlayhouses - 1 && i % size != size - 1) {
      if (arrayGame[i] == 0 && arrayGame[i + 1] != 0) {
        while (arrayGame[i + 1] != 0 && i % size != size - 1) {
          arrayGame[i] = arrayGame[i + 1];
          arrayGame[i + 1] = 0;
          while (arrayGame[i - 1] == 0 && i % size != 0) {
            arrayGame[i - 1] = arrayGame[i];
            arrayGame[i] = 0;
            i--;
          }
          i++;
        }
      }
    }
  }
  updateTempArray();
  setNumberInArray();
  updateArrayGame();
  moveUndo();
  if (clickUndo > 0) {
    clickUndo--;
    document.querySelector(".undo").innerHTML = "Undo: " + clickUndo;
  }
  moveNumber++;
  setLocalStorageGame();
}

function moveUp() {
  var tempnum = 0;
  for (let i = 0; i < size; ) {
    //enteghal 0 ha
    while (i < numberOfPlayhouses - size) {
      if (arrayGame[i] == 0 && arrayGame[i + size] != 0) {
        arrayGame[i] = arrayGame[i + size];
        arrayGame[i + size] = 0;
        if (arrayGame[i] != 0) {
          for (let j = i; j >= 0; j -= size) {
            if (arrayGame[j - size] == 0) {
              var t = j;
              arrayGame[t - size] = arrayGame[t];
              arrayGame[t] = 0;
            }
          }
        }
        i += size;
      } else {
        i += size;
        continue;
      }
    }
    tempnum++;
    i = tempnum;
  }
  for (let i = 0; i < size; i++) {
    var temp = i;
    while (temp < numberOfPlayhouses - size) {
      if (arrayGame[temp] == arrayGame[temp + size] && arrayGame[temp] != 0) {
        arrayGame[temp] = arrayGame[temp] * 2;
        arrayGame[temp + size] = 0;
        let score = arrayGame[temp];
        scoreGame += score;
        getScoreGame.innerHTML = "Score: " + scoreGame;
        temp += size;
      } else {
        temp += size;
        continue;
      }
    }
  }
  tempnum = 0;
  for (let i = 0; i < size; ) {
    //enteghal 0 ha
    while (i < numberOfPlayhouses - size) {
      if (arrayGame[i] == 0 && arrayGame[i + size] != 0) {
        arrayGame[i] = arrayGame[i + size];
        arrayGame[i + size] = 0;
        if (arrayGame[i] != 0) {
          for (let j = i; j >= 0; j -= size) {
            if (arrayGame[j - size] == 0) {
              t = j;
              arrayGame[t - size] = arrayGame[t];
              arrayGame[t] = 0;
            }
          }
        }
        i += size;
      } else {
        i += size;
        continue;
      }
    }
    tempnum++;
    i = tempnum;
  }
  updateTempArray();
  setNumberInArray();
  updateArrayGame();
  moveUndo();
  if (clickUndo > 0) {
    clickUndo--;
    document.querySelector(".undo").innerHTML = "Undo: " + clickUndo;
  }
  moveNumber++;
  setLocalStorageGame();
}

function moveDown() {
  var tempnum = numberOfPlayhouses - 1;
  for (let i = numberOfPlayhouses - 1; i >= numberOfPlayhouses - size; ) {
    //enteghal 0 ha
    while (i >= size) {
      if (arrayGame[i] == 0 && arrayGame[i - size] != 0) {
        arrayGame[i] = arrayGame[i - size];
        arrayGame[i - size] = 0;
        if (arrayGame[i + size] == 0) {
          for (let j = i; j <= numberOfPlayhouses - size; j += size) {
            if (arrayGame[j + size] == 0) {
              var t = j;
              arrayGame[t + size] = arrayGame[t];
              arrayGame[t] = 0;
            }
          }
        }
        i -= size;
      } else {
        i -= size;
        continue;
      }
    }
    tempnum--;
    i = tempnum;
  }
  for (let i = numberOfPlayhouses - 1; i >= numberOfPlayhouses - size; i--) {
    var temp = i;
    while (temp >= size) {
      if (arrayGame[temp] == arrayGame[temp - size] && arrayGame[temp] != 0) {
        arrayGame[temp] = arrayGame[temp] * 2;
        arrayGame[temp - size] = 0;
        let score = arrayGame[temp];
        scoreGame += score;
        getScoreGame.innerHTML = "Score: " + scoreGame;
        temp -= size;
      } else {
        temp -= size;
        continue;
      }
    }
  }
  tempnum = numberOfPlayhouses - 1;
  for (let i = numberOfPlayhouses - 1; i >= numberOfPlayhouses - size; ) {
    //enteghal 0 ha
    while (i >= size) {
      if (arrayGame[i] == 0 && arrayGame[i - size] != 0) {
        arrayGame[i] = arrayGame[i - size];
        arrayGame[i - size] = 0;
        if (arrayGame[i + size] == 0) {
          for (let j = i; j <= numberOfPlayhouses - size; j += size) {
            if (arrayGame[j + size] == 0) {
              var t = j;
              arrayGame[t + size] = arrayGame[t];
              arrayGame[t] = 0;
            }
          }
        }
        i -= size;
      } else {
        i -= size;
        continue;
      }
    }
    tempnum--;
    i = tempnum;
  }
  updateTempArray();
  setNumberInArray();
  updateArrayGame();
  moveUndo();
  if (clickUndo > 0) {
    clickUndo--;
    document.querySelector(".undo").innerHTML = "Undo: " + clickUndo;
  }
  moveNumber++;
  setLocalStorageGame();
}

function resetButton() {
  const selectReset = document.querySelector("#resetGame");
  const createResetDiv = document.createElement("div");
  createResetDiv.setAttribute("class", "resetDiv");
  selectReset.appendChild(createResetDiv);

  const createResetBtn = document.createElement("button");
  createResetBtn.setAttribute("class", "reset");
  createResetBtn.setAttribute("onclick", "resetGame()");
  createResetBtn.innerHTML = "Reset";
  createResetDiv.appendChild(createResetBtn);
}
function resetGame() {
  moveNumber = 0;
  moveCounter = 1;
  scoreGame = 0;
  clickUndo = 0;
  getScoreGame.innerHTML = "Score: " + scoreGame;
  document.querySelector(".undo").innerHTML = "Undo: " + clickUndo;

  arrayGame = [];
  for (let i = 0; i < numberOfPlayhouses; i++) {
    arrayGame.push(0);
    tempArray.push(i);
  }
  initialArray();
  updateTempArray();
  updateArrayGame();
  resetTime();
  startTimer();
  resetUndoArray();
}

function resetUndoArray() {
  for (let i = 0; i < move_data.length; i++) {
    move_data[i].moveArray = [];
    move_data[i].score = "";
  }
  localStorage.clear();
}

function startTimer() {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    time += 1;
    display.innerHTML =
      Math.floor(time / 3600)
        .toString()
        .padStart(2, "0") +
      ":" +
      Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, "0") +
      ":" +
      Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
  }, 1000);
}

function resetTime() {
  if (interval) {
    clearInterval(interval);
  }
  interval = null;
  time = 0;
  display.innerHTML = "00:00:00";
}

function undoButton() {
  const selectUndo = document.querySelector("#undo");

  const createUndoBtn = document.createElement("button");
  createUndoBtn.setAttribute("class", "reset");
  createUndoBtn.classList.add("undo");
  createUndoBtn.setAttribute("onclick", "undoGame()");
  createUndoBtn.innerHTML = "Undo: " + clickUndo;
  selectUndo.appendChild(createUndoBtn);
}
function undoGame() {
  if (clickUndo < 4) {
    moveCounter -= 2;

    for (let i = 0; i < move_data.length; i++) {
      if (move_data[i].number == moveCounter % size) {
        let arrayTemp = [];
        for (let j = 0; j < move_data[i].moveArray.length; j++) {
          arrayTemp.push(move_data[i].moveArray[j]);
        }
        arrayGame = arrayTemp;
        arrayTemp = [];
        scoreGame = move_data[i].score;
        updateTempArray();
        updateArrayGame();
        getScoreGame.innerHTML = "Score: " + scoreGame;
        break;
      } else if (move_data[i].number == size) {
        let arrayTemp = [];
        for (let j = 0; j < move_data[i].moveArray.length; j++) {
          arrayTemp.push(move_data[i].moveArray[j]);
        }
        arrayGame = arrayTemp;
        arrayTemp = [];

        scoreGame = move_data[i].score;
        updateTempArray();
        updateArrayGame();
        getScoreGame.innerHTML = "Score: " + scoreGame;
        break;
      }
    }

    moveCounter++;
    clickUndo++;
    document.querySelector(".undo").innerHTML = "Undo: " + clickUndo;
  }
  setLocalStorageGame();
}
function setLocalStorageGame() {
  let gameSetting = {
    scoreGame: scoreGame,
    moveCounter: moveCounter,
    clickUndo: clickUndo,
    moveNumber: moveNumber,
    time: time,
  };

  let movesGame = JSON.stringify(move_data);
  let settingGame = JSON.stringify(gameSetting);
  let setLocalStorage = movesGame + "/" + settingGame;
  localStorage.setItem("game", setLocalStorage);
}
window.onbeforeunload = function (event) {
  var message = "Important: Please click on 'Save' button to leave this page.";
  if (typeof event == "undefined") {
    event = window.event;
  }
  if (event) {
    setLocalStorageGame();
    // event.returnValue = message;
  }
  // return ;
};

function readLocalstorage() {
  const getLocalstorageTemp = window.localStorage.getItem("game");
  const splitLocalstorageTemp = getLocalstorageTemp.split("/");
  const settingTemp = splitLocalstorageTemp[1];
  const convertLocalstorageSettingTemp = JSON.parse(settingTemp);
  if (
    convertLocalstorageSettingTemp.moveNumber == 0 ||
    convertLocalstorageSettingTemp.moveNumber == null
  ) {
    setScore();
    initialArray();
    layout();
    resetButton();
    undoButton();
    startTimer();
  } else {
    const getLocalstorage = window.localStorage.getItem("game");
    const splitLocalstorage = getLocalstorage.split("/");
    const moveData = splitLocalstorage[0];
    const setting = splitLocalstorage[1];

    const convertLocalstorageMoveData = JSON.parse(moveData);
    const convertLocalstorageSetting = JSON.parse(setting);

    for (let i = 0; i < convertLocalstorageMoveData.length; i++) {
      move_data[i].score = convertLocalstorageMoveData[i].score;
      for (
        let j = 0;
        j < convertLocalstorageMoveData[i].moveArray.length;
        j++
      ) {
        move_data[i].moveArray[j] = convertLocalstorageMoveData[i].moveArray[j];
      }
    }

    scoreGame = convertLocalstorageSetting.scoreGame;
    moveCounter = convertLocalstorageSetting.moveCounter;
    clickUndo = convertLocalstorageSetting.clickUndo;
    moveNumber = convertLocalstorageSetting.moveNumber;
    time = convertLocalstorageSetting.time;

    setScore();
    let move = moveCounter - 1;
    const revertMoveNumber = move % size;
    if (revertMoveNumber != 0) {
      revertNum = revertMoveNumber - 1;
      for (let t = 0; t < size * size; t++) {
        arrayGame[t] = move_data[revertNum].moveArray[t];
      }
    } else {
      for (let t = 0; t < size * size; t++) {
        arrayGame[t] = move_data[size - 1].moveArray[t];
      }
    }
    layout();
    updateTempArray();
    resetButton();
    undoButton();
    interval = setInterval(() => {
      time += 1;
      display.innerHTML =
        Math.floor(time / 3600)
          .toString()
          .padStart(2, "0") +
        ":" +
        Math.floor((time % 3600) / 60)
          .toString()
          .padStart(2, "0") +
        ":" +
        Math.floor(time % 60)
          .toString()
          .padStart(2, "0");
    }, 1000);
  }
}
function addColor() {
  const allSquares = document.querySelectorAll(".grid-item");
  for (let i = 0; i < allSquares.length; i++) {
    const numberInSquare = allSquares[i].innerHTML;

    switch (numberInSquare) {
      case "2":
        // allSquares[i].style.backgroundColor = "rgb(228 193 78)";
        allSquares[i].style.backgroundColor = "#eee4da";
        allSquares[i].style.color = "#756452";

        break;
      case "4":
        // allSquares[i].style.backgroundColor = "rgb(235 150 31)";
        allSquares[i].style.backgroundColor = "#ebd8b6";
        allSquares[i].style.color = "#756452";

        break;
      case "8":
        // allSquares[i].style.backgroundColor = "rgb(235 104 31)";
        allSquares[i].style.backgroundColor = "#f1ae73";
        allSquares[i].style.color = "#ffffff";

        break;
      case "16":
        // allSquares[i].style.backgroundColor = "rgb(235 80 31)";
        allSquares[i].style.backgroundColor = "#f6925e";
        allSquares[i].style.color = "#ffffff";

        break;
      case "32":
        // allSquares[i].style.backgroundColor = "rgb(212 58 10)";
        allSquares[i].style.backgroundColor = "#f57658";
        allSquares[i].style.color = "#ffffff";

        break;
      case "64":
        // allSquares[i].style.backgroundColor = "rgb(231 16 0)";
        allSquares[i].style.backgroundColor = "#f55833";
        allSquares[i].style.color = "#ffffff";

        break;
      case "128":
        // allSquares[i].style.backgroundColor = "rgb(227 245 38 / 80%)";
        allSquares[i].style.backgroundColor = "#f2ce52";
        allSquares[i].style.color = "#ffffff";

        break;
      case "256":
        // allSquares[i].style.backgroundColor = "rgb(227 245 38 / 80%)";
        allSquares[i].style.backgroundColor = "#f4cc44";
        allSquares[i].style.color = "#ffffff";

        break;
      default:
        allSquares[i].style.backgroundColor = "#bdac97";
        allSquares[i].style.color = "#ffffff";
    }

    // if (allSquares[i].innerHTML == 2) {
    //   allSquares[i].style.backgroundColor = "rgb(228 193 78)";
    // }
    // if (allSquares[i].innerHTML == 4) {
    //   allSquares[i].style.backgroundColor = "rgb(235 150 31)";
    // }
    // if (allSquares[i].innerHTML == 8) {
    //   allSquares[i].style.backgroundColor = "rgb(235 104 31)";
    // } else {
    //   allSquares[i].style.backgroundColor = "#eee4da";
    // }
  }
}
