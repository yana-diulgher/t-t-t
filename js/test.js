const buttons = document.querySelectorAll('.btn');
let currentPlayer = 'X';
let moves = []; 
const p1 = document.querySelector('.text-for-X');
const p2 = document.querySelector('.text-for-O');
const winnerText = document.querySelector('.winner-text');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (button.textContent) return; 

        button.textContent = currentPlayer;
        button.disabled = true;
        moves.push({ index: index, player: currentPlayer });
        
        winner = checkWinner();

        if (winner) {
            winnerText.textContent = `Победил "${winner}"`;
            disableAllButtons();

        } else if (isDraw()) {
            winnerText.textContent = 'Ничья!';
            for(i=0;i<9;i++){
                buttons[i].style.backgroundColor = '#79d9c4ff';
            }
            
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'X') {
                p1.style.color = 'black';
                p2.style.color = 'gray';
            } else {
                p2.style.color = 'black';
                p1.style.color = 'gray';
            }
        }

       
    });
});

    

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            buttons[a].textContent &&
            buttons[a].textContent === buttons[b].textContent &&
            buttons[a].textContent === buttons[c].textContent
        ) {
            buttons[a].style.backgroundColor = 'lightgreen';
            buttons[b].style.backgroundColor = 'lightgreen';
            buttons[c].style.backgroundColor = 'lightgreen';
            return buttons[a].textContent;
        }
    }
    return false;
}

function isDraw() {
    return [...buttons].every(button => button.textContent);
}

function disableAllButtons() {
    buttons.forEach(button => button.disabled = true);
}
function enableAllButtons() {
    buttons.forEach(button => button.disabled = false);
}

function backMove() {
    if (moves.length === 0) return;

    let lastMove = moves.pop();
    buttons[lastMove.index].textContent = '';
    buttons[lastMove.index].disabled = false;
    winnerText.textContent = '';
    currentPlayer = lastMove.player;
    buttons.forEach(button => {
        button.removeEventListener('click', disableAllButtons);
        enableAllButtons();
        for(i=0;i<9;i++){
            buttons[i].style.backgroundColor = '#f0f0f0';}
    });
}

const backBtn = document.getElementById('back');

backBtn.addEventListener('click', backMove);

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
    buttons.forEach(button => {
        button.textContent = '';
        button.disabled = false;
        button.style.backgroundColor = '#f0f0f0';
    });
    currentPlayer = 'X';
    p1.style.color = 'black';
    p2.style.color = 'gray';
    winnerText.textContent = '';
    moves = [];
});
