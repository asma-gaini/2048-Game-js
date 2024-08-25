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
  layout();
  initialArray();
  console.log(arrayGame);
}

function layout() {
  const getLayout = document.querySelector("#layout");
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      
    }
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
  for (let i = 0; i < 3; i++) {
    setNumberInArray();
  }
}
