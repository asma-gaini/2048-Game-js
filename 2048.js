const size = 5;
const numberOfPlayhouses = size * size;
var number = 0;
var randomIndex = 0;
let arrayGame = [
  0, 2, 0, 0, 4, 2, 2, 0, 4, 0, 2, 0, 4, 4, 2, 0, 2, 4, 0, 0, 0, 0, 2, 2, 2,
];
// let tempArray = [];
// for (let i = 0; i < numberOfPlayhouses; i++) {
//   arrayGame.push(0);
//   tempArray.push(i);
// }

window.onload = createGame();

function createGame() {
  //   initialArray();
  console.log(arrayGame);
  layout();
}

function layout() {
  const getLayout = document.querySelector("#layout");
  const createGrid = document.createElement("div");
  createGrid.setAttribute("class", "grid-container");
  getLayout.appendChild(createGrid);

  for (let i = 0; i < size * size; i++) {
    const createGridSquare = document.createElement("div");
    createGridSquare.setAttribute("class", "grid-item");
    createGridSquare.innerHTML = arrayGame[i];
    createGrid.appendChild(createGridSquare);
  }
}

function randomNumber() {
  const rand = Math.floor(Math.random() * tempArray.length);
  const randomTempValue = tempArray[rand];
  randomIndex = randomTempValue;
}

function changeRandomToNumber() {
  const randomNum = randomNumber();
  if (randomNum % 2 == 0) {
    number = 2;
  } else {
    number = 4;
  }
}

function setNumberInArray() {
  changeRandomToNumber();

  const index = tempArray.indexOf(randomIndex);
  console.log(randomIndex);
  const tempArrayWithoutElement = tempArray.splice(index, 1);
  console.log(tempArray);
  arrayGame[randomIndex] = number;
}
function initialArray() {
  for (let i = 0; i < 5; i++) {
    setNumberInArray();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.which === 40) {
    console.log("downArrowKey was pressed");
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
      if (arrayGame[i - 1] == arrayGame[i]) {
        console.log(arrayGame[i - 1]);
        const arrayGamePre = arrayGame[i - 1];
        arrayGame[i] = arrayGamePre * 2;
        arrayGame[i - 1] = 0;
        console.log(arrayGame);
      }
    }
  }
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
  layout();
}
function moveLeft() {
  for (let i = 0; i < numberOfPlayhouses; i++) {
    //enteghal 0 ha
    if (i != numberOfPlayhouses - 1 && i % size != 4) {
      if (arrayGame[i] == 0 && arrayGame[i + 1] != 0) {
        while (arrayGame[i + 1] != 0 && i % size != 4) {
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
    if (i % size != 4) {
      //faghat ag 2 ta adad moshabeh kenar ham bashan
      if (arrayGame[i] == arrayGame[i + 1]) {
        console.log(arrayGame[i - 1]);
        const arrayGameNext = arrayGame[i];
        arrayGame[i] = arrayGameNext * 2;
        arrayGame[i + 1] = 0;
      }
    }
  }
  for (let i = 0; i < numberOfPlayhouses; i++) {
    //enteghal 0 ha
    if (i != numberOfPlayhouses - 1 && i % size != 4) {
      if (arrayGame[i] == 0 && arrayGame[i + 1] != 0) {
        while (arrayGame[i + 1] != 0 && i % size != 4) {
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
  layout();
}

function moveUp() {
  var tempnum = 0;
  for (let i = 0; i < size; ) {
    //enteghal 0 ha
    while (i < numberOfPlayhouses - size) {
      if (arrayGame[i] == 0 && arrayGame[i + size] != 0) {
        arrayGame[i] = arrayGame[i + 5];
        arrayGame[i + 5] = 0;
        if (arrayGame[i] != 0) {
          for (let j = i; j >= 0; j -= 5) {
            if (arrayGame[i - 5] == 0) {
              var t = i;
              arrayGame[t - 5] = arrayGame[t];
              arrayGame[t] = 0;
            }
          }
        }
        i += 5;
      } else {
        i += 5;
        continue;
      }
    }
    tempnum++;
    i = tempnum;
  }
  for (let i = 0; i < size; i++) {
    var temp = i;
    while (temp < numberOfPlayhouses - size) {
      if (arrayGame[temp] == arrayGame[temp + 5] && arrayGame[temp] != 0) {
        arrayGame[temp] = arrayGame[temp] * 2;
        arrayGame[temp + 5] = 0;
        // console.log("yes");
        temp += 5;
      } else {
        temp += 5;
        continue;
      }
    }
  }
  tempnum = 0;
  for (let i = 0; i < size; ) {
    //enteghal 0 ha
    while (i < numberOfPlayhouses - size) {
      if (arrayGame[i] == 0 && arrayGame[i + size] != 0) {
        arrayGame[i] = arrayGame[i + 5];
        arrayGame[i + 5] = 0;
        if (arrayGame[i] != 0) {
          for (let j = i; j >= 0; j -= 5) {
            if (arrayGame[i - 5] == 0) {
              t = i;
              arrayGame[t - 5] = arrayGame[t];
              arrayGame[t] = 0;
            }
          }
        }
        i += 5;
      } else {
        i += 5;
        continue;
      }
    }
    tempnum++;
    i = tempnum;
  }

  layout();
}
