export function chessPrompt({ type, move }) {
  const playerColor = chessColor(type);
  const computerColor = chessColor(type === "W" ? "B" : "W");
  return (
    "I would like you to guide me through a game of Chess. " +
    "I will suggest a move, and you will suggest a move in reponse " +
    "as the game progresses. Only respond with the chess notation of " +
    "the move that you will make. Do not include any explanation for your " +
    "move. The response should only return the move notation. For " +
    "example, if it is 'Black' player's move and White' has just " +
    "played the 1st move, then the response should only be e5. " +
    `I will play as '${playerColor}', and you will play as '${computerColor}'` +
    `. My first move is ${move}`
  );
}

function chessColor(type) {
  return type === "W" ? "White" : "Black";
}
