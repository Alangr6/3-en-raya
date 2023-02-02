import { useState } from "react";
import { turns } from "./data/data";
import { Square } from "./Square";
import { saveGameStorage, resetStorage } from "./logic/storage";
import "./App.css";
import { checkEndGame, checkWinner } from "./logic/board";

function App() {
  const boardFromLocalstorage = window.localStorage.getItem("board");
  const turnFromLocalstorage = window.localStorage.getItem("turn");

  const [board, setBoard] = useState(
    JSON.parse(boardFromLocalstorage) ?? Array(9).fill(null)
  );
  /*  const [board, setBoard] = useState(() => {
    if (boardFromLocalstorage) return JSON.parse(boardFromLocalstorage);
    return Array(9).fill(null)
  }); */
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(turnFromLocalstorage ?? turns.x);

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newTurn = turn == turns.o ? turns.x : turns.o;
    setTurn(newTurn);
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    saveGameStorage({ board: newBoard, turn: newTurn });

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.x);
    setWinner(null);

    resetStorage();
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset</button>

      <div className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </div>
      <section className="turn">
        <Square isSelected={turn == turns.x}>{turns.x}</Square>
        <Square isSelected={turn == turns.o}>{turns.o}</Square>
      </section>

      {winner != null && (
        <section className="winner">
          <div className="text">
            <h2>{winner == false ? "Empate" : `Gano: ${winner}`}</h2>
            <footer>
              <button onClick={resetGame}>Reset</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
