function initialChessPrompt({ color, move }) {
  const playerColor = chessColor(color);
  const computerColor = chessColor(color === "w" ? "b" : "w");
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
      move
        ? ` My first move is ${move} - respond with just the chess move, no text before or after`
        : "What is your move? Respond with just the chess move, no text before or after"
    }`
  );
}

const nextMovePrompt = ({ move, possibleMoves }) => {
  return `My move is ${move}. For your next move, only select a move from this list: ${possibleMoves}. What is your next move? Like before, respond with just the move, no text before and after.`;
};

function chessColor(color) {
  return color === "w" ? "White" : "Black";
}

export { initialChessPrompt, nextMovePrompt };
