const gameboard = (function() {
    const gameboardArray = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-'],
    ];

    const resetBoard = () => gameboardArray = [];

    function display() {
        console.log(gameboardArray)
    }

    return {
        resetBoard,
        display
    }
})();

const game = (function() {
    const players = createPlayers(); 

    gameboard.display();
    return {
    
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


