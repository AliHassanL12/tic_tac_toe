const gameboard = (function() {
    let gameboardArray = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-'],
    ];
    const baseBoard = gameboardArray

    function resetBoard() {
        gameboardArray = [
            ['-','-','-'],
            ['-','-','-'],
            ['-','-','-'],
        ];
        display();
    }

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

    function isGameOver(currentPlayer, a, b) {
        const arr = gameboard.getBoard();
        if (checkRow(arr, a, b) || 
        checkColumn(arr, b, currentPlayer) || 
        checkDiagonal(arr, currentPlayer)) 
        {
            console.log(`${currentPlayer} wins!`);
            gameboard.resetBoard();
            players.resetPlayers();
            return true;
        } else {
            return false; 
        }
    }

    function checkRow(arr, a, b) {
        if (arr[a].every(checkWin)) {
            return true;
        }
        function checkWin(element) {
            return element === arr[a][b];
        }
    }

    function checkColumn(arr, b, currentPlayer) {
        if (
            (arr[0][b] === currentPlayer) &&
            (arr[1][b] === currentPlayer) &&
            (arr[2][b] === currentPlayer) 
        ) return true; 
    }

    function checkDiagonal(arr, currentPlayer) {
        if (
            ((arr[0][0] === currentPlayer) &&
            (arr[1][1] === currentPlayer) &&
            (arr[2][2] === currentPlayer))
            ||
            ((arr[0][2] === currentPlayer) &&
            (arr[1][1] === currentPlayer) &&
            (arr[2][0] === currentPlayer))
        ) return true;
    }

    function nextTurn() {
        players.switchPlayers();
    }

    function playTurn(a, b) {
        if (gameboard.canPlace(a, b)) {
            const currentPlayer = players.getCurrentPlayer();
            gameboard.placeMark(currentPlayer, a, b);
            if (!isGameOver(currentPlayer, a, b)) {
                nextTurn();
            }
        }
        else {
            console.log('That spot is already taken. Choose another.');
        }
    }
    return {
        playTurn,
    }

})();

const players = (function() {
    const playerX = 'X';
    const playerY = 'Y';
    let currentPlayer = playerX;

    const getCurrentPlayer = () => currentPlayer;

    function switchPlayers() {
        currentPlayer = (currentPlayer === playerX) ? playerY : playerX; 
    }

    function resetPlayers() {
        currentPlayer = playerX;
    }

    return {
        getCurrentPlayer,
        switchPlayers,
        resetPlayers
    }
})();

const dom = (function() {
    function display() {
        const boardArray = gameboard.getBoard();
        const DOMobj = getRefElements();
        for (let i = 0; i < boardArray.length; i++) {
            const divContainer = document.createElement('div');
            divContainer.classList.add('boardSubContainer')
            DOMobj.boardContainer.appendChild(divContainer);
            for (let j = 0; j < boardArray.length; j++) {
                const div = document.createElement('div');
                div.classList.add('boardPieces')
                div.textContent = boardArray[i][j];
                divContainer.appendChild(div);
            } 
        }
    }

    function getRefElements() {
        const boardContainer = document.querySelector('.boardContainer');
        return {
            boardContainer
        }
    }
    return {
        display
    }
})();