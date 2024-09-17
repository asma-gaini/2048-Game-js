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
var my4dArray = [
  [1, [], ,],
  [2, [], ,],
  [3, [], ,],
  [4, [], ,],
  [5, [], ,],
];

// my3dArray[0][0] = [0, 2, 0, 3, 5];
// my3dArray[0][1] = [100];
// my3dArray[0][3] = ["time"];
// console.log(my3dArray);

let scoreGame = 0;
let moveCounter = 1;
let clickUndo = 0;

const size = 5;
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

window.onload = createGame();

function createGame() {
  setScore();
  initialArray();
  layout();
  resetButton();
  undoButton();
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

  for (let i = 0; i < size * size; i++) {
    const createGridSquare = document.createElement("div");
    createGridSquare.setAttribute("class", "grid-item");
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
}

function randomNumber() {
  const rand = Math.floor(Math.random() * tempArray.length);
  const randomTempValue = tempArray[rand];
  randomIndex = randomTempValue;
}

function changeRandomToNumber() {
  randomNumber();
  // console.log(randomIndex);
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
      move_data[i].moveArray = arrayGame;
      move_data[i].score = scoreGame;
      break;
      // console.log("undo score : " + move_data[i].score);
    } else if (move_data[i].number == size) {
      move_data[i].moveArray = arrayGame;

      move_data[i].score = scoreGame;
      break;
    }
  }
  // console.log("move before: " + moveCounter);

  moveCounter++;
  // console.log("move after: " + moveCounter);
}

// function moveUndo() {
//   for (let i = 0; i < my4dArray.length; i++) {
//     if (my4dArray[i][0] == moveCounter % size) {
//       my4dArray[i][1] = arrayGame;
//       my4dArray[i][2] = scoreGame;
//       console.log("yes");
//       break;
//       // console.log("undo score : " + move_data[i].score);
//     } else if (my4dArray[i][0] == size) {
//       my4dArray[i][1] = arrayGame;

//       my4dArray[i][2] = scoreGame;
//       console.log("heyy");
//       break;
//     }
//   }
//   // console.log("move before: " + moveCounter);

//   moveCounter++;
//   // console.log("move after: " + moveCounter);
// }

function moveRight() {
  for (let i = numberOfPlayhouses - 1; i >= 0; i--) {
    //enteghal 0 ha
    if (i != numberOfPlayhouses - 1 && i % size != 4) {
      if (arrayGame[i] != 0 && arrayGame[i + 1] == 0) {
        while (arrayGame[i + 1] == 0 && i % size != 4) {
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
  //bayad ba shart bezaram k ag bishtar az 5 ta bood jaygozin she . ye temp bezanm k shomare ro negah darh k alan chand bayad jaygozin beshe
  // move_data.push("array:" + arrayGame);
  // move_data.push("score :" + scoreGame);
  // console.log(move_data);
  // console.log(typeof move_data);
  // console.log(move_data[0]);
  moveUndo();
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
}

function resetButton() {
  const selectReset = document.querySelector("#reset");
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
  scoreGame = 0;
  getScoreGame.innerHTML = "Score: " + scoreGame;
  arrayGame = [];
  for (let i = 0; i < numberOfPlayhouses; i++) {
    arrayGame.push(0);
    tempArray.push(i);
  }
  initialArray();
  updateTempArray();
  updateArrayGame();
}

function undoButton() {
  const selectUndo = document.querySelector("#undo");

  const createUndoBtn = document.createElement("button");
  createUndoBtn.setAttribute("class", "reset");
  createUndoBtn.setAttribute("onclick", "undoGame()");
  createUndoBtn.innerHTML = "Undo";
  selectUndo.appendChild(createUndoBtn);
}
function undoGame() {
  if (clickUndo < 4) {
    // console.log("move before undo: " + moveCounter);
    moveCounter -= 2;
    // console.log("move after undo: " + moveCounter);

    for (let i = 0; i < move_data.length; i++) {
      // console.log("i : " + i + " move_data[i].number: " + move_data[i].number);
      if (move_data[i].number == moveCounter % size) {
        // console.log("move_data[i].moveArray : " + move_data[i].moveArray);
        arrayGame = move_data[i].moveArray;
        // console.log("arrayGame : " + arrayGame);
        scoreGame = move_data[i].score;
        updateTempArray();
        updateArrayGame();
        getScoreGame.innerHTML = "Score: " + scoreGame;
        break;
      } else if (move_data[i].number == size) {
        // console.log("move_data[i].moveArray : " + move_data[i].moveArray);

        arrayGame = move_data[i].moveArray;
        // console.log("arrayGame : " + arrayGame);

        scoreGame = move_data[i].score;
        updateTempArray();
        updateArrayGame();
        getScoreGame.innerHTML = "Score: " + scoreGame;
        break;
      }
    }

    moveCounter++;
    clickUndo++;
  }
}
