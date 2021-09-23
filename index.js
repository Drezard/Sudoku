const button = document.querySelector('#press');
const secretbox = document.querySelector('#tabl');
function pressed() {
  button.classList.add('hidden');
  secretbox.classList.remove('hidden');
  generateGameField()
  fillUpField();
}
button.addEventListener('click', pressed);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cells = [];
const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];


function getNumberForCell(colIndex, rowIndex, sqrIndex) {
  const numbersInRow = cells.filter((item) => item.row === rowIndex).map((item) => item.number);
  const numbersInColumn = cells.filter((item) => item.col === colIndex).map((item) => item.number);

  const numbersInSqr = cells.filter((item) => item.sqr === sqrIndex).map((item) => item.number);

  const numberList = possibleNumbers.filter((numb) => {
    return !(numbersInRow.includes(numb) || numbersInColumn.includes(numb) || numbersInSqr.includes(numb));
  })

  const rand = getRandomIntInclusive(0, numberList.length - 1);
  console.log(numberList, rand, numberList[rand]);

  const number = numberList[rand]; //generate

  return number;
}



function generateGameField() {

  const gameField = document.querySelector('#gameField');
  const rowNumber = 9;
  const colNumber = 9;

  for (let rowIndex = 0; rowIndex < rowNumber; rowIndex += 1) {
    for (let colIndex = 0; colIndex < colNumber; colIndex += 1) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      gameField.append(cellElement);

      const inputElement = document.createElement('input');
      cellElement.append(inputElement);

      const sqrIndex = Math.floor(colIndex / 3) + Math.floor(rowIndex / 3) * 3;
      const cell = {
        row: rowIndex,
        sqr: sqrIndex,
        col: colIndex,
        el: cellElement,
        number: 0,
        isShowed: true,
      };

      cells.push(cell);
    }
  }
}


function fillUpField() {
  for (let i = 0; i < 17; i += 1) {
    const col = getRandomIntInclusive(0, 8);
    const row = getRandomIntInclusive(0, 8);

    const cell = cells.find((cell) => cell.col === col && cell.row === row);

    if (cell.number !== 0) {
      i -= 1;
      continue;
    }
    const number = getNumberForCell(cell.col, cell.row, cell.sqr);
    console.log(i, col, row, cell, number);

    cell.number = number;
    cell.el.innerText = number;
  }

}

function checkArrayWithUniqNumbers(a) {
  if ((new Set(a)).length === a.length) return true;
  return false;
}

function check() {
  for (const cell of cells) {
    if (cell.number === 0) return false;
  }

  for (let rowIndex = 0; rowIndex <= 8; rowIndex++) {
    const numbersInRow = cells.filter((item) => item.row === rowIndex).map((item) => item.number);
    if (!checkArrayWithUniqNumbers(numbersInRow)) return false;
  }

  for (let colIndex = 0; colIndex <= 8; colIndex++) {
    const numbersInCol = cells.filter((item) => item.col === colIndex).map((item) => item.number);
    if (!checkArrayWithUniqNumbers(numbersInCol)) return false;
  }

  for (let sqrIndex = 0; sqrIndex <= 8; sqrIndex++) {
    const numbersInSqr = cells.filter((item) => item.sqr === sqrIndex).map((item) => item.number);
    if (!checkArrayWithUniqNumbers(numbersInSqr)) return false;
  }

  return true;
}