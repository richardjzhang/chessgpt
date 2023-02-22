import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessGame = ({ playerColor = "w" }) => {
  const [game, setGame] = useState(new Chess());
  const [computerMove, setComputerMove] = useState(false);

  useEffect(() => {
    if (computerMove) {
      const timeout = setTimeout(makeComputerMove, 200);
      return () => clearTimeout(timeout);
    }
  }, [computerMove]);

  function makeAMove(move) {
    const gameCopy = Object.create(game);
    const result = gameCopy.move(move);
    setGame(gameCopy);
    setComputerMove((c) => !c);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  // function makeRandomMove() {
  //   const possibleMoves = game.moves();
  //   if (game.isGameOver()) return; // exit if the game is over
  //   const move =
  //     possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  //   makeAMove(move);
  // }

  async function makeComputerMove() {
    let data;
    if (game.history().length === 0 && playerColor === "b") {
      const response = await fetch(
        `/api/chatgpt?firstMove=true&color=${playerColor}`
      );
      data = await response.json();
    } else if (game.history().length === 1 && playerColor === "w") {
      const lastMove = game.history()[game.history().length - 1];
      const response = await fetch(
        `/api/chatgpt?move=${lastMove}&color=${playerColor}`
      );
      data = await response.json();
    } else {
      const lastMove = game.history()[game.history().length - 1];
      const response = await fetch(
        `/api/chatgpt?move=${lastMove}&possibleMoves=${game.moves()}`
      );
      data = await response.json();
    }
    makeAMove(data);
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    // illegal move
    if (move === null) return false;

    return true;
  }

  return (
    <div style={{ width: 400, height: 400 }}>
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
};

export default ChessGame;
