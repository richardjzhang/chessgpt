function initialChessPrompt({ color, move }) {
  const playerColor = chessColor(color);
  const computerColor = chessColor(color === "W" ? "B" : "W");
  return (
    "I would like you to guide me through a game of Chess. " +
    "I will suggest a move, and you will suggest a move in response " +
    "as the game progresses. \n\nOnly respond with the chess notation of " +
    "the move that you will make. Do not include any explanation for your " +
    "move. The response should only return the move, no text before and after\n\nFor " +
    "example, if it is 'Black' player's move and White' has just " +
    "played the 1st move, then the response should only be e5\n\n" +
    `I will play as '${playerColor}', and you will play as '${computerColor}'\n\n` +
    `${
      move ? ` My first move is ${move} - respond with just the chess move` : ""
    }`
  );
}

const nextMovePrompt = ({ move, possibleMoves }) => {
  return `My move is ${move}. Based on the following possible moves ${possibleMoves} for you, what is your next move? Like before, respond with just the move, no text before and after.`;
};

function chessColor(color) {
  return color === "w" ? "White" : "Black";
}

export { initialChessPrompt, nextMovePrompt };
