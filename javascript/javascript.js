const gameboard = (function() {
    const gameboardArray = [
        '-','-','-',
        '-','-','-',
        '-','-','-',
    ];

    const resetBoard = () => gameboardArray = [];

    function display() {
        console.log(gameboardArray)
    }

    function placeMark(player, index) {
        if ((index >= 1 && index <= 9) && (gameboardArray[index - 1] === '-')) {
            gameboardArray[index - 1] = player; 
            display();
        }
    }

    function canPlace(index) {
        if (gameboardArray[index - 1] === '-') return true;
    }

    display();

    return {
        resetBoard,
        display,
        placeMark,
        canPlace
    }
})();

const game = (function() {
    const players = createPlayers(); 

    function nextTurn() {
        players.switchPlayers();
    }

    function playTurn(index) {
        if (gameboard.canPlace(index)) {
            gameboard.placeMark(players.getCurrentPlayer(), index);
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


