const gameboard = (function() {
    const gameboardArray = [];

    return {

    }
})();

const game = (function() {
    const players = createPlayers(); 
    
    return {
    
    }

})();

function createPlayers() {
    const playerX = 'X';
    const playerY = 'Y';
    let currentPlayer = playerX;

    function getCurrentPlayer() {
        return currentPlayer;
        switchPlayers();
    }

    function switchPlayers() {
        currentPlayer = (currentPlayer === playerX) ? playerY : playerX
    }

    return {
        getCurrentPlayer,
        switchPlayers
    }
}


