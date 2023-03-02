import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import ChessHistory from "@/components/ChessHistory";
import Logo from "@/components/Logo";
import useGameManager from "@/hooks/useGameManager";

const ChessGame = ({ playerColor }) => {
  const [game, setGame] = useState(new Chess());
  const { onDrop, isFetching, computerMove } = useGameManager({
    playerColor,
    game,
    setGame,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <Logo className={`mb-4 ${isFetching ? "animate-spin" : ""}`} />
      <div className="w-full flex flex-col space-y-10 lg:flex lg:h-[31rem] lg:space-x-20 lg:flex-row lg:space-y-0">
        <div className="w-full max-h-full lg:w-full">
          {playerColor ? (
            <Chessboard
              boardOrientation={playerColor === "w" ? "white" : "black"}
              customBoardStyle={{ borderRadius: 12 }}
              position={game.fen()}
              onPieceDrop={onDrop}
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
