import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import ChessHistory from "@/components/ChessHistory";
import Logo from "@/components/Logo";
import useGameManager from "@/hooks/useGameManager";

const ChessGame = ({ playerColor }) => {
  const [game, setGame] = useState(new Chess());
  const {
    onDrop,
    isFetching,
    computerMove,
    onSquareClick,
    onSquareRightClick,
    customSquareStyles,
  } = useGameManager({
    playerColor,
    game,
    setGame,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4">
        <Logo className={`relative z-10 ${isFetching ? "animate-spin" : ""}`} />
        <div className="flex justify-center ml-16 -mt-7 relative">
          <div className="px-2 py-0.5 rounded w-fit bg-emerald-500 text-gray-900 text-xs font-semibold">
            Beta
          </div>
        </div>
      </div>
      <div className="mb-6 p-4 rounded-lg w-full flex items-center text-center font-semibold bg-gray-800 text-yellow-200">
        OpenAI is currently experiencing a heavy amount of traffic, so the game
        may pause unexpectedly as we may not receive a response 😅. Apologies
        for the inconvenience!
      </div>
      <div className="w-full flex flex-col space-y-10 lg:flex lg:h-[31rem] lg:space-x-20 lg:flex-row lg:space-y-0">
        <div className="w-full max-h-full lg:w-full">
          {playerColor ? (
            <Chessboard
              boardOrientation={playerColor === "w" ? "white" : "black"}
              customBoardStyle={{ borderRadius: 12 }}
              position={game.fen()}
              onPieceDrop={onDrop}
              onSquareClick={onSquareClick}
              onSquareRightClick={onSquareRightClick}
              customSquareStyles={customSquareStyles}
            />
          ) : (
            <Chessboard customBoardStyle={{ borderRadius: 12 }} />
          )}
        </div>
        <div className="lg:h-[31rem] lg:overflow-auto lg:w-full">
          <ChessHistory
            isGameOver={game.isGameOver()}
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
