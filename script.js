const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X'
let gameActive = true;
const cells = [];

function createBoard(){
    board.innerHTML = ''
    cells.length = 0;
    for(let i = 0; i < 9; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell')
        cell.addEventListener('click', () => makeMove(i))
        board.appendChild(cell);
        cells.push(cell);
    } 
}

function makeMove(index){
    if(!gameActive || cells[index.textContent !== '']) return;

    cells[index].textContent = currentPlayer;
    cells[index].classList.add('taken');

    if (checkWin()) {
    message.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

    if (cells.every(cell => cell.textContent !== '')) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn`;

}

function checkWin(){
    const winPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPattern.some(pattern =>{
        const [a, b, c] = pattern
        return(
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        );
    });
}

function restartGame(){
    currentPlayer = 'X'
    gameActive = true
    message.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

restartGame()