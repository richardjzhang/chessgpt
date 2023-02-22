import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import Logo from "@/components/Logo";

const ChessGame = ({ playerColor, boardOrientation }) => {
  const [game, setGame] = useState(new Chess());
  const [computerMove, setComputerMove] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (playerColor === "b" && game.history().length === 0) {
      handleFirstBlackMove();
      console.log({ playerColor });
    }
  }, []);

  useEffect(() => {
    if (computerMove && game.history().length !== 0) {
      setIsFetching(true);
      const timeout = setTimeout(makeComputerMove, 200);
      return () => {
        clearTimeout(timeout);
        setIsFetching(false);
      };
    }
  }, [computerMove]);

  function makeAMove(move) {
    const gameCopy = Object.create(game);
    const result = gameCopy.move(move);
    setGame(gameCopy);
    setComputerMove((c) => !c);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  async function handleFirstBlackMove() {
    setComputerMove(true);
    setIsFetching(true);
    const response = await fetch(
      `/api/chatgpt?color=${playerColor}&isFirstMove=true`
    );
    const data = await response.json();
    makeAMove(data);
    setIsFetching(false);
  }

  async function makeComputerMove() {
    let response;
    if (game.history().length === 1 && playerColor === "w") {
      const lastMove = game.history()[game.history().length - 1];
      response = await fetch(
        `/api/chatgpt?move=${lastMove}&color=${playerColor}&isFirstMove=true`
      );
    } else {
      const lastMove = game.history()[game.history().length - 1];
      response = await fetch(
        `/api/chatgpt?move=${lastMove}&possibleMoves=${game.moves().join(", ")}`
      );
    }
    const data = await response.json();
    makeAMove(data);
    setIsFetching(false);
  }

  function onDrop(sourceSquare, targetSquare) {
    try {
      makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }

  return (
    <>
      <Logo className={`mb-4 ${isFetching ? "animate-spin" : ""}`} />
      <Chessboard
        boardOrientation={boardOrientation}
        position={game.fen()}
        onPieceDrop={onDrop}
      />
    </>
  );
};

export default ChessGame;
