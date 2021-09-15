const button = document.querySelector('#press');
const secretbox = document.querySelector('#tabl');
function pressed() {
  button.classList.add('hidden');
  secretbox.classList.remove('hidden');
  generateGameField()

}
button.addEventListener('click', pressed);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cells = [];

function generateGameField() {

  const gameField = document.querySelector('#gameField');
  const rowNumber = 9;
  const colNumber = 9;

  for (let rowIndex = 0; rowIndex < rowNumber; rowIndex += 1) {
    for (let colIndex = 0; colIndex < colNumber; colIndex += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gameField.append(cell);

      const number = getRandomInt(1, 9); //generate


      cell.textContent = number;
      
      cells.push({
        row: rowIndex,
        col: colIndex,
        el: cell,
        number: number,
        isShowed: true,
      });


    }
  }
}
