import { ChatGPTAPI } from "chatgpt";
import {
  initialChessPrompt,
  invalidMovePrompt,
  nextMovePrompt,
} from "@/constants/prompts";

let parentMessageId;
const MAX_RETRIES = 10;
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

function parseMove(move) {
  return move.split("Move: ")[1];
}

function parsePossibleMoves(possibleMoves) {
  return possibleMoves ? possibleMoves.split(",").map((m) => m.trim()) : [];
}

function isValidChessMove(move) {
  const pattern =
    /^([NBRQK])?([a-h])?([1-8])?(x)?([a-h][1-8])(=?[NBRQ])?([+#])?$|^O-O(-O)?$|^Kx?[a-h][1-8][+#]?$|^([a-h])?[1-8]([a-h][1-8])(=?[NBRQ])?[+#]?$/;

  return pattern.test(move);
}

function validateParams({ move, color, possibleMoves, isFirstMove }) {
  if (typeof isFirstMove !== "boolean") {
    throw new Error("Invalid isFirstMove");
  }

  if (color && !["w", "b"].includes(color)) {
    throw new Error("Invalid color");
  }

  if (move && !isValidChessMove(move)) {
    throw new Error("Invalid move");
  }

  if (
    possibleMoves.length > 0 &&
    possibleMoves.some((m) => !isValidChessMove(m))
  ) {
    throw new Error("Invalid possible moves");
  }
}

export default async function handler(req, res) {
  const { color } = req.query;
  const isFirstMove = JSON.parse(req.query.isFirstMove || false);
  const possibleMoves = parsePossibleMoves(req.query.possibleMoves);
  const move = req.query.move?.trim();

  // Validate the params passed in before proceeding
  validateParams({ move, color, possibleMoves, isFirstMove });

  if (isFirstMove) {
    parentMessageId = undefined;
  }

  // Send the prompt to ChatGPT
  const prompt = isFirstMove
    ? initialChessPrompt({ color, move })
    : nextMovePrompt({ move });
  let response = await api.sendMessage(prompt, { parentMessageId });
  parentMessageId = response.id;

  let nextMove = parseMove(response.text);

  // If the move is invalid, get ChatGPT to try again. Max 10 retries.
  let i = 0;
  while (
    possibleMoves.length > 0 &&
    !possibleMoves.includes(nextMove) &&
    i < MAX_RETRIES
  ) {
    response = await api.sendMessage(invalidMovePrompt({ possibleMoves }), {
      parentMessageId,
    });
    parentMessageId = response.id;
    nextMove = parseMove(response.text);
    i++;
  }

  res.status(200).json(nextMove);
}
