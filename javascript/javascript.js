const gameboard = (function() {
    const gameboardArray = []

    const playerOne = createPlayer('X');
    const playerTwo = createPlayer('Y');

    const getPlayerOneMarker = () => playerOne.getMarker();
    const getPlayerTwoMarker = () => playerTwo.getMarker();

    return {
        getPlayerOneMarker,
        getPlayerTwoMarker
    }
})();

const game = (function() {
    
})();

function createPlayer(marker) {
    this.marker = marker;

    const getMarker = () => marker; 
    return {
        getMarker
    }
}


