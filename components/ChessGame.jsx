import { useCallback, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import useSound from "use-sound";
import ChessHistory from "@/components/ChessHistory";
import Logo from "@/components/Logo";

const ChessGame = ({ playerColor, boardOrientation }) => {
  const [game, setGame] = useState(new Chess());
  const [computerMove, setComputerMove] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [normalMoveSound] = useSound("/sounds/normal.mp3");

  const makeAMove = useCallback(
    (move) => {
      const gameCopy = Object.create(game);
      const result = gameCopy.move(move);
      setGame(gameCopy);
      setComputerMove((c) => !c);
      normalMoveSound();
      return result; // null if the move was illegal, the move object if the move was legal
    },
    [game, normalMoveSound]
  );

  const makeComputerMove = useCallback(async () => {
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
  }, [game, makeAMove, playerColor]);

  const handleFirstBlackMove = useCallback(async () => {
    setComputerMove(true);
    setIsFetching(true);
    const response = await fetch(
      `/api/chatgpt?color=${playerColor}&isFirstMove=true`
    );
    const data = await response.json();
    makeAMove(data);
    setIsFetching(false);
  }, [makeAMove, playerColor]);

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

  useEffect(() => {
    if (playerColor === "b" && game.history().length === 0) {
      handleFirstBlackMove();
    }
  }, [handleFirstBlackMove, playerColor, game]);

  useEffect(() => {
    if (computerMove && game.history().length !== 0) {
      setIsFetching(true);
      const timeout = setTimeout(makeComputerMove, 200);
      return () => {
        clearTimeout(timeout);
        setIsFetching(false);
      };
    }
  }, [makeComputerMove, computerMove, game]);

  return (
    <div className="w-full flex flex-col items-center">
      <Logo className={`mb-4 ${isFetching ? "animate-spin" : ""}`} />
      <div className="w-full grid gap-10 grid-cols-1 lg:grid-cols-2 lg:h-[31rem] lg:gap-20">
        <div className="w-full max-h-full">
          {playerColor ? (
            <Chessboard
              boardOrientation={boardOrientation}
              customBoardStyle={{ borderRadius: 12 }}
              position={game.fen()}
              onPieceDrop={onDrop}
            />
          ) : (
            <Chessboard customBoardStyle={{ borderRadius: 12 }} />
          )}
        </div>
        <div className="lg:h-[31rem] lg:overflow-auto">
          <ChessHistory
            history={game.history()}
            turn={game.turn()}
            computerMove={computerMove}
            playerColor={playerColor}
          />
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
