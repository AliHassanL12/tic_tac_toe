const gameboard = (function() {
    let gameboardArray = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-'],
    ];

    function resetBoard() {
        gameboardArray = [
            ['-','-','-'],
            ['-','-','-'],
            ['-','-','-'],
        ];
    }


    function placeMark(playerMarker, a, b) {
        if ((a >= 0 && b >=0) && (a <= 3 && b <= 3) && (gameboardArray[a][b] === '-')) {
            gameboardArray[a][b] = playerMarker;
            dom.removeBoard();
            dom.display();
        }
    }

    function canPlace(a, b) {
        if (gameboardArray[a][b] === '-') return true;
    }

    function getBoard() {
        return gameboardArray;
    }

    return {
        resetBoard,
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
            const message = `Congratulations, ${currentPlayer} wins!`
            dom.printMsg(message);
            dom.setGameIsOver(true);
            return true;
        } else {
            const emptyCell = '-';
            const isNotDraw = arr.some(subArray => {
                return subArray.includes(emptyCell); 
            })
            if (!isNotDraw) {
                const drawMsg = `Draw! Neither win!`;
                dom.printMsg(drawMsg);
                return true;
            }
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
    }
    return {
        playTurn,
    }

})();

const players = (function() {
    const playerX = 'X';
    const playerY = 'O';
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

    let gameOver = false; 

    display();

    function display() {
        const boardArray = gameboard.getBoard();
        const DOMobj = getRefElements();
        createBoard(boardArray, DOMobj);
        attachListeners();
    }

    function getRefElements() {
        const boardContainer = document.querySelector('.boardContainer');
        const message = document.querySelector('.message')
        return {
            boardContainer,
            message
        }
    }

    function createBoard(boardArray, DOMobj) {
        for (let i = 0; i < boardArray.length; i++) {
            const divContainer = document.createElement('div');
            divContainer.setAttribute('id', i);
            divContainer.classList.add('boardSubContainer')
            DOMobj.boardContainer.appendChild(divContainer);
            for (let j = 0; j < boardArray.length; j++) {
                const div = document.createElement('div');
                div.setAttribute('id', j);
                div.classList.add('boardPieces')
                div.textContent = boardArray[i][j];
                divContainer.appendChild(div);
            } 
        }
    }

    function attachListeners() {
        const boardPieces = document.querySelectorAll('.boardPieces');
        boardPieces.forEach((cell) => {
            cell.addEventListener('click', (event) => {
                const cellParent = cell.parentNode;
                if (!gameOver) game.playTurn(cellParent.id, cell.id);
            });
        })
    }


    function resetDOMBoard() {
        setGameIsOver(false);
        removeMessage(getRefElements());
        gameboard.resetBoard();
        players.resetPlayers();
        removeBoard();
        display();
    }

    function setGameIsOver(boolean) {
        gameOver = boolean;
    }

    function removeMessage(elementRef) {
        elementRef.message.textContent = '';
    }

    function removeBoard() {
        const boardContainer = document.querySelector('.boardContainer');
        while (boardContainer.firstChild) {
            boardContainer.firstChild.remove();
        }
    }

    function printMsg(message) {
        const elementRef = getRefElements();
        elementRef.message.textContent = message;
        addRestartButton();
    }

    function addRestartButton() {
        const domRef = getRefElements()
        const restartGameBtn = document.createElement('button');
        restartGameBtn.classList.add('restartBtn');
        restartGameBtn.textContent = 'Restart';
        domRef.message.appendChild(restartGameBtn)
        restartGameBtn.addEventListener('click', () => resetDOMBoard());
    }



    // Creation of Start Button and logic to input names and begin playing
    


    return {
        display,
        removeBoard,
        printMsg,
        setGameIsOver
    }
})();