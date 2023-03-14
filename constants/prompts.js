function initialChessPrompt({ color, move }) {
  const playerIsWhite = color === "w";
  const playerColor = chessColor(color);
  const computerColor = chessColor(playerIsWhite ? "b" : "w");
  return `I would like you to act as a chess computer that makes moves. I want you to play as ${computerColor} and I will play as ${playerColor}.

  As an example, we will exchange moves in the following format...
  
  Move: d3
  
  ${
    playerIsWhite
      ? `Here is my first move.
  
  Move: ${move}`
      : "Please go first."
  }`;
}

const nextMovePrompt = ({ move }) => {
  return `Move: ${move}`;
};

const invalidMovePrompt = ({ possibleMoves }) => {
  return `That is not a possible move. Do not respond with the same move, and only select a move from the list ${possibleMoves}`;
};

function chessColor(color) {
  return color === "w" ? "White" : "Black";
}

export { initialChessPrompt, nextMovePrompt, invalidMovePrompt };
