import { useCallback, useEffect, useState } from "react";
import useGameSounds from "@/hooks/useGameSounds";

export default function useGameManager({ playerColor, game, setGame }) {
  const [computerMove, setComputerMove] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [squareStyles, setSquareStyles] = useState({});
  const [currentSelectedSquare, setCurrentSelectedSquare] = useState(null);
  const [moveFrom, setMoveFrom] = useState("");
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
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
      try {
        const gameCopy = Object.create(game);
        const result = gameCopy.move(move);
        setGame(gameCopy);
        handleSound(move);
        setComputerMove((c) => !c);
      } catch {
        return null;
      }
    },
    [game, handleSound, setGame]
  );

  function onDrop(sourceSquare, targetSquare) {
    if (!game.isGameOver() && !computerMove) {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
      if (move) {
        setMoveFrom("");
        setOptionSquares({});
        return true;
      }
    }

    return false;
  }

  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      return false;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    if (!game.isGameOver() && !computerMove) {
      setRightClickedSquares({});

      function resetFirstMove(square) {
        const hasOptions = getMoveOptions(square);
        if (hasOptions) setMoveFrom(square);
      }

      console.log({ moveFrom });

      // from square
      if (!moveFrom) {
        resetFirstMove(square);
        return;
      }

      // attempt to make move
      const move = makeAMove({
        from: moveFrom,
        to: square,
        promotion: "q", // always promote to a queen for example simplicity
      });
      console.log({ move });

      // if invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        resetFirstMove(square);
        return;
      }

      setMoveFrom("");
      setOptionSquares({});
      return true;
    }

    return false;
  }

  function onSquareRightClick(square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
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

  return {
    game,
    onDrop,
    isFetching,
    computerMove,
    onSquareClick,
    onSquareRightClick,
    customSquareStyles: {
      ...moveSquares,
      ...optionSquares,
      ...rightClickedSquares,
    },
  };
}
