const gameboard = (function() {
    const gameboardArray = [];

    return {
        
    }
})();

const game = (function() {
    const playerOne = createPlayer('X');
    const playerTwo = createPlayer('Y');
})();

function createPlayer(marker) {
    const marker = marker; 

    const getMarker = () => marker; 
    return {
        getMarker
    }
}


