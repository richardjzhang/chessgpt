import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { initialChessPrompt, nextMovePrompt } from "@/constants/prompts";

let parentMessageId;
let conversationId;

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

  const response = await api.sendMessage(
    isFirstMove
      ? initialChessPrompt({ color, move })
      : nextMovePrompt({ move, possibleMoves }),
    { conversationId, parentMessageId }
  );

  parentMessageId = response.id;
  if (!conversationId) {
    conversationId = response.conversationId;
  }

  res.status(200).json(response.text);
}
