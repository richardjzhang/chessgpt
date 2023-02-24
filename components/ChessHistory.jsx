import React from "react";

function isEven(n) {
  return n % 2 === 0;
}

function arrayToPairs(arr) {
  const pairs = arr.reduce((acc, current, index) => {
    if (index % 2 === 0) {
      if (index + 1 < arr.length) {
        acc.push([current, arr[index + 1]]);
      } else {
        acc.push([current]);
      }
    }
    return acc;
  }, []);
  return [...pairs, []];
}

export default function ChessHistory({
  history,
  turn,
  computerMove,
  playerColor,
}) {
  const isWhiteTurn = turn === "w";
  const historyPairs = arrayToPairs(history);
  return (
    <>
      <div className="mb-4 p-4 rounded-lg w-full flex items-center text-xl font-semibold bg-gray-800 text-blue-200 lg:mb-8">
        <div
          className={`mr-5 w-8 h-8 rounded-md transition-colors duration-500 ${
            isWhiteTurn ? "bg-white" : "bg-black border border-white/40"
          }`}
        />
        <p
          className={`transition-opacity duration-200 ${
            playerColor ? "opacity-100" : "opacity-0"
          }`}
        >
          {computerMove ? "ChatGPT's" : "Your"} turn
        </p>
      </div>
      <div className="flex flex-col-reverse">
        {historyPairs.map((moves, index) => {
          const isLastPair =
            (moves.length > 0 &&
              index === historyPairs.length - 2 &&
              historyPairs[index + 1].length === 0) ||
            index === historyPairs.length - 1;
          const whiteStyles = isLastPair
            ? "bg-white/95 text-gray-800 border border-gray-800"
            : "bg-gray-800 text-blue-200 border border-gray-800";
          const blackStyles = isLastPair
            ? "bg-black/40 text-gray-200 border border-white/40"
            : "bg-gray-800 text-blue-200 border border-gray-800";
          return (
            <div
              className={`flex items-center transition-all ${
                moves.length > 0 ? "h-full mb-4" : "h-0 mb-0"
              }`}
              key={index}
            >
              <div
                className={`flex items-center text-blue-200 font-semibold ${
                  moves.length > 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`ml-4 p-4 w-full rounded-lg flex justify-center items-center text-xl font-semibold transition-all duration-500 ${whiteStyles} ${
                  moves.length > 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {moves[0] || ""}
              </div>

              <div
                className={`ml-4 p-4 w-full rounded-lg flex justify-center items-center text-xl font-semibold transition-all duration-500 ${blackStyles} ${
                  moves.length > 1 ? "opacity-100" : "opacity-0"
                }`}
              >
                {moves[1] || ""}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
