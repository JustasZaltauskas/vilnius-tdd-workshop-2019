import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Registration } from './Registration';
import { Game } from './Game';
import { gameStatus, GAME_STATUS } from './gameService';

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [current, setCurrent] = useState(GAME_STATUS.player1);
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [winner, setWinner] = useState('');

  const handleNewGame = (player1, player2) => {
    setPlayer1(player1);
    setPlayer2(player2);
  };

  const handleCellClicked = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== '') {
      return;
    }
    const _board = board.map(row => [...row]);

    _board[rowIndex][colIndex] = current;
    if (gameStatus(_board) === current) {
      setWinner(current);
    }
    setBoard(_board);
    changePlayer();
  };

  const changePlayer = () => {
    setCurrent(
      current === GAME_STATUS.player1
        ? GAME_STATUS.player2
        : GAME_STATUS.player1
    );
  };

  const getWinner = () => {
    return current === GAME_STATUS.player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => {
    return current === GAME_STATUS.player1 ? player1 : player2;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          data-testid="app-link"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Registration onNewGame={handleNewGame} />
      <strong data-testid="current-player">{getCurrentPlayer()}</strong>
      <div className="tic-toe">
        <Game
          player1={player1}
          player2={player2}
          board={board}
          onCellClicked={handleCellClicked}
        />
        {winner && <div data-testid="winner-message">{getWinner()} won!!</div>}
      </div>
    </div>
  );
}

export default App;
