const button = document.querySelector('#press');
const secretbox = document.querySelector('#tabl');
function pressed() {
  button.classList.add('hidden');
  secretbox.classList.remove('hidden');
  generateGameField()

}
button.addEventListener('click', pressed);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cells = [];
const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function generateGameField() {

  const gameField = document.querySelector('#gameField');
  const rowNumber = 9;
  const colNumber = 9;

  for (let rowIndex = 0; rowIndex < rowNumber; rowIndex += 1) {
    for (let colIndex = 0; colIndex < colNumber; colIndex += 1) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      gameField.append(cellElement);

      const numbersInRow = cells.filter((item) => item.row === rowIndex).map((item) => item.number);
      const numbersInColumn = cells.filter((item) => item.col === colIndex).map((item) => item.number);


      const sqrIndex = Math.floor(colIndex / 3) + Math.floor(rowIndex / 3) * 3;

      // const numbersInColumnAndRow = cells.filter((item) => item.col&row === colIndex).map((item) => item.number)
      const numbersInSqr = cells.filter((item) => item.sqr === sqrIndex).map((item) => item.number); 
      
      const numberList = possibleNumbers.filter((numb) => {
        return !(numbersInRow.includes(numb) || numbersInColumn.includes(numb) || numbersInSqr.includes(numb));
      })

      const rand = getRandomIntInclusive(0, numberList.length - 1);
      console.log(numberList, rand, numberList[rand]);

      const number = numberList[rand]; //generate


      cellElement.textContent = number;

      const cell = {
        row: rowIndex,
        sqr: sqrIndex,
        col: colIndex,
        el: cellElement,
        number: number,
        isShowed: true,
      };
      
      cells.push(cell);


    }
  }
}
