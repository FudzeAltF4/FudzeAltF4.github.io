// Seleciona os elementos do HTML
const statusText = document.getElementById('status-text');
const restartButton = document.getElementById('restart-button');
const cells = document.querySelectorAll('.cell');

// Variáveis do jogo
let currentPlayer = 'X';
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para lidar com o clique na célula
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Se a célula já estiver preenchida ou o jogo tiver acabado, não faz nada
    if (boardState[cellIndex] !== "" || !gameActive) {
        return;
    }

    // Atualiza o estado do jogo
    boardState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Verifica o resultado
    checkResult();
}

// Função para verificar se há um vencedor ou empate
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = boardState[condition[0]];
        const b = boardState[condition[1]];
        const c = boardState[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `O Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
    }

    // Verifica se deu empate
    if (!boardState.includes("")) {
        statusText.textContent = `Deu empate!`;
        gameActive = false;
        return;
    }

    // Passa a vez para o próximo jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `É a vez do Jogador ${currentPlayer}`;
}

// Função para recomeçar o jogo
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `É a vez do Jogador ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
}

// Adiciona os "escutadores" de eventos
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
