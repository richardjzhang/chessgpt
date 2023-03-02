import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import {
  initialChessPrompt,
  invalidMovePrompt,
  nextMovePrompt,
} from "@/constants/prompts";

let parentMessageId;
let conversationId;

function parseMove(move) {
  return move.split("Move: ")[1];
}

export default async function handler(req, res) {
  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.OPENAI_ACCESS_TOKEN,
  });
  const { move, color, possibleMoves } = req.query;
  const isFirstMove = JSON.parse(req.query.isFirstMove || false);

  if (isFirstMove) {
    parentMessageId = undefined;
    conversationId = undefined;
  }

  let response = await api.sendMessage(
    isFirstMove
      ? initialChessPrompt({ color, move })
      : nextMovePrompt({ move, possibleMoves }),
    { conversationId, parentMessageId }
  );
  parentMessageId = response.id;
  if (!conversationId) conversationId = response.conversationId;
  let nextMove = parseMove(response.text);

  while (
    possibleMoves &&
    !possibleMoves
      .split(",")
      .map((m) => m.trim())
      .includes(nextMove)
  ) {
    response = await api.sendMessage(invalidMovePrompt({ possibleMoves }), {
      conversationId,
      parentMessageId,
    });
    nextMove = parseMove(response.text);
  }

  res.status(200).json(nextMove);
}
