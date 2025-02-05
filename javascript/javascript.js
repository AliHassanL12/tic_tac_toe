const gameboard = (function() {
    const gameboardArray = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-'],
    ];

    const resetBoard = () => gameboardArray = [];

    function display() {
        console.log(gameboardArray);
    }

    function placeMark(playerMarker, a, b) {
        if ((a >= 0 && b >=0) && (a <= 3 && b <= 3) && (gameboardArray[a][b] === '-')) {
            gameboardArray[a][b] = playerMarker;
            display();
        }
    }

    function canPlace(a, b) {
        if (gameboardArray[a][b] === '-') return true;
    }

    function getBoard() {
        return gameboardArray;
    }

    display();

    return {
        resetBoard,
        display,
        placeMark,
        canPlace,
        getBoard
    }
})();

const game = (function() {
    const players = createPlayers(); 

    function isGameOver(currentPlayer, a, b) {
        const arr = gameboard.getBoard();
        checkRow(arr, a, b);
        if(checkRow(arr, a, b)) {
            console.log(`${currentPlayer} wins!`);
        };
    }

    function checkRow(arr, a, b) {
        if (arr[a].every(checkWin)) {
            return true;
        }
        function checkWin(element) {
            return element === arr[a][b];
        }
    }

    function nextTurn() {
        players.switchPlayers();
    }

    function playTurn(a, b) {
        if (gameboard.canPlace(a, b)) {
            const currentPlayer = players.getCurrentPlayer();
            gameboard.placeMark(currentPlayer, a, b);
            isGameOver(currentPlayer, a, b);
            nextTurn();
        }
        else {
            console.log('That spot is already taken. Choose another.');
        }
    }
    return {
        playTurn,
    }

})();

function createPlayers() {
    const playerX = 'X';
    const playerY = 'Y';
    let currentPlayer = playerX;

    const getCurrentPlayer = () => currentPlayer;

    function switchPlayers() {
        currentPlayer = (currentPlayer === playerX) ? playerY : playerX; 
    }

    return {
        getCurrentPlayer,
        switchPlayers
    }
}


