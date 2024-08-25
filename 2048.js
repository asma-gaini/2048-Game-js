const size = 5;
const numberOfPlayhouses = size * size;
var number = 0;
var randomIndex = 0;
let arrayGame = [];
let tempArray = [];
for (let i = 0; i < numberOfPlayhouses; i++) {
  arrayGame.push(0);
  tempArray.push(i);
}

window.onload = createGame();

function createGame() {
  initialArray();
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
  const rand = Math.floor(Math.random() * numberOfPlayhouses);
  randomIndex = rand;
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
  const includeIndex = tempArray.includes(index);

  if (includeIndex == false) {
    const rand = Math.floor(Math.random() * numberOfPlayhouses);
    randomIndex = rand;
    setNumberInArray();
  } else {
    const tempArrayWithoutElement = tempArray.splice(index, 1);
    arrayGame[randomIndex] = number;
  }
}
function initialArray() {
  for (let i = 0; i < 5; i++) {
    setNumberInArray();
  }
}

document.addEventListener("keydown", (e) => {
  //down key
  if (e.which === 40) {
    console.log("downArrowKey was pressed");
  }

  //upkey
  else if (e.which === 38) {
    console.log("upArrowKey was pressed");
  }

  //Enter key
  else if (e.which === 37) {
    console.log("leftArrowKey was pressed");
  } else if (e.which === 39) {
    console.log("rightArrowKey was pressed");
  }
});
