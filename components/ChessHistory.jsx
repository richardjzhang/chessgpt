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
  return isEven(pairs.length) ? [...pairs, []] : pairs;
}

export default function ChessHistory({ history, turn }) {
  const isWhiteTurn = turn === "w";
  const historyPairs = arrayToPairs(history);
  return (
    <>
      <div className="mb-8 p-4 rounded-lg w-full flex items-center text-lg font-semibold bg-gray-800 text-blue-200">
        <div
          className={`mr-3 w-6 h-6 rounded-md border-black transition-colors duration-500 ${
            isWhiteTurn ? "bg-white" : "bg-black"
          }`}
        />
        <p>{isWhiteTurn ? "White" : "Black"} to move</p>
      </div>
      <>
        {historyPairs.map((moves, index) => {
          const isLastPair =
            (moves.length > 0 &&
              index === historyPairs.length - 2 &&
              historyPairs[index + 1].length === 0) ||
            index === historyPairs.length - 1;
          const whiteStyles = isLastPair
            ? "bg-white/95 text-gray-800"
            : "bg-gray-800 text-blue-200";
          const blackStyles = isLastPair
            ? "bg-black/40 text-gray-200"
            : "bg-gray-800 text-blue-200";
          return (
            <div className="mb-4 flex items-center" key={index}>
              <div
                className={`flex items-center text-blue-200 font-semibold ${
                  moves.length > 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`ml-4 p-4 w-full rounded-lg flex justify-center items-center text-lg font-semibold transition-all duration-500 ${whiteStyles} ${
                  moves.length > 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {moves[0] || ""}
              </div>

              <div
                className={`ml-4 p-4 w-full rounded-lg flex justify-center items-center text-lg font-semibold transition-all duration-500 ${blackStyles} ${
                  moves.length > 1 ? "opacity-100" : "opacity-0"
                }`}
              >
                {moves[1] || ""}
              </div>
            </div>
          );
        })}
      </>
    </>
  );
}
