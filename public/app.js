// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player moves
const ticTacToe = (element, index) => {
    // Check if the cell is empty and the game is still active
    if (cells[index] === '' && isGameActive()) {
        // Update the cell with the current player's symbol
        cells[index] = currentPlayer;
        element.textContent = currentPlayer;

        // Check for a win or a draw
        if (checkWin(currentPlayer)) {
            // Display the winning message
            result.textContent = `Player ${currentPlayer} Wins!`;
            disableButtons();
        } else if (isBoardFull()) {
            // Display a draw message
            result.textContent = "It's a Draw!";
            disableButtons();
        } else {
            // Switch to the other player's turn
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            result.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
};

// Function to check if the game is still active
const isGameActive = () => {
    return result.textContent === '';
};

// Function to check for a win
const checkWin = (player) => {
    for (let condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] === player && cells[b] === player && cells[c] === player) {
            return true;
        }
    }
    return false;
};

// Function to check if the board is full (draw)
const isBoardFull = () => {
    return cells.every(cell => cell !== '');
};

// Function to disable all buttons
const disableButtons = () => {
    btns.forEach(btn => btn.disabled = true);
};

// Function to reset the game
const resetGame = () => {
    // Reset game state
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';

    // Clear cell text content
    btns.forEach(btn => btn.textContent = '');

    // Reset result message
    result.textContent = `Player ${currentPlayer}'s Turn`;

    // Enable all buttons
    btns.forEach(btn => btn.disabled = false);
};

// Add click event listeners to buttons
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

// Add click event listener to reset button
document.querySelector('#reset').addEventListener('click', resetGame);