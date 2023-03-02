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

export default async function handler(req, res) {
  const { move, color, possibleMoves } = req.query;
  const isFirstMove = JSON.parse(req.query.isFirstMove || false);

  if (isFirstMove) {
    parentMessageId = undefined;
  }

  const prompt = isFirstMove
    ? initialChessPrompt({ color, move })
    : nextMovePrompt({ move, possibleMoves });
  let response = await api.sendMessage(prompt, { parentMessageId });
  parentMessageId = response.id;

  let nextMove = parseMove(response.text);

  let i = 0;
  while (
    possibleMoves &&
    !possibleMoves
      .split(",")
      .map((m) => m.trim())
      .includes(nextMove) &&
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
