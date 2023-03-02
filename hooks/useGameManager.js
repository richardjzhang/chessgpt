import { useCallback, useEffect, useState } from "react";
import useGameSounds from "@/hooks/useGameSounds";

export default function useGameManager({ playerColor, game, setGame }) {
  const [computerMove, setComputerMove] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const {
    playerMoveSound,
    computerMoveSound,
    captureSound,
    checkSound,
    gameOverSound,
    castleSound,
    promoteSound,
  } = useGameSounds();

  const handleSound = useCallback(() => {
    const totalMoves = game.history().length;
    const lastMove = game.history({ verbose: true })[totalMoves - 1];

    if (game.isGameOver()) {
      gameOverSound();
      return;
    }

    if (game.inCheck()) {
      checkSound();
      return;
    }

    if (lastMove.captured) {
      captureSound();
      return;
    }

    if (["k", "q"].includes(lastMove.flags)) {
      castleSound();
      return;
    }

    if (lastMove.flags === "np") {
      promoteSound();
      return;
    }

    if (computerMove) {
      computerMoveSound();
      return;
    }

    playerMoveSound();
  }, [
    castleSound,
    computerMoveSound,
    captureSound,
    computerMove,
    checkSound,
    gameOverSound,
    game,
    promoteSound,
    playerMoveSound,
  ]);

  const makeAMove = useCallback(
    (move) => {
      const gameCopy = Object.create(game);
      const result = gameCopy.move(move);
      setGame(gameCopy);
      handleSound(move);
      setComputerMove((c) => !c);
      return result; // null if the move was illegal, the move object if the move was legal
    },
    [game, handleSound, setGame]
  );

  function onDrop(sourceSquare, targetSquare) {
    if (!game.isGameOver() && !computerMove) {
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

    gameOverSound();

    return false;
  }

  const makeComputerMove = useCallback(async () => {
    let response;
    if (game.history().length === 0 && playerColor === "b") {
      response = await fetch(
        `/api/chatgpt?color=${playerColor}&isFirstMove=true`
      );
    } else if (game.history().length === 1 && playerColor === "w") {
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

  useEffect(() => {
    if (game.history().length === 0 && playerColor === "b") {
      setComputerMove(true);
    }

    if (computerMove && !game.isGameOver()) {
      setIsFetching(true);
      const timeout = setTimeout(makeComputerMove, 200);
      return () => {
        clearTimeout(timeout);
        setIsFetching(false);
      };
    }
  }, [makeComputerMove, computerMove, game, playerColor]);

  return { game, onDrop, isFetching, computerMove };
}
