function initialChessPrompt({ color, move }) {
  const playerColor = chessColor(color);
  const computerColor = chessColor(color === "w" ? "b" : "w");
  return `I would like you to guide me through a game of Chess. I will suggest a move, and you will suggest a move in response as the game progresses. 

Only respond with the chess notation of the move that you will make. Do not include any explanation for your move. The response should only return the move, no text before and after
    
For example, if it is 'Black' player's (your) move and White (me) has just played the 1st move, then the response should be in the following format:
    
e.g.
// White's input
Move: e4

// Black's response
Move: e5

In this game, I will play as '${playerColor}', and you will play as '${computerColor}'. To help you, I will provide a list of possible moves after my first move that you are to select from and respond with. You are only to choose from this list (if there are possible moves provided)

e.g. Valid response
// My input
Move: e6
Possible Moves: [e4, e5, d6]

// Your response
Move: e4

e.g. Invalid response
// My input
Move: e6
Possible Moves: [e4, e5, d6]

// Your response
Move: h8

As an additional instruction, I also do not require that you provide any commentary on whether any of my moves are valid. Only your moves will be validated.
    
${
  move
    ? `So, for my first move...
Move: ${move}`
    : `What is your first move as ${computerColor}? The response should be in the format explained previously`
}`;
}

const nextMovePrompt = ({ move, possibleMoves }) => {
  return `Move: ${move}
Possible moves: ${possibleMoves}`;
};

const invalidMovePrompt = ({ possibleMoves }) => {
  return `That is not a possible move. Only select a move from this list

Possible moves: ${possibleMoves}
    
Reply with one of the moves in the list in the following format only. Do not have any extra text before or after the move.

e.g.
// Valid response
Move: e5

// Invalid response
Apologies, here is the correct move.
Move: e5`;
};

function chessColor(color) {
  return color === "w" ? "White" : "Black";
}

export { initialChessPrompt, nextMovePrompt, invalidMovePrompt };
