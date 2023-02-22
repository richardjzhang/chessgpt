import { ChatGPTAPI } from "chatgpt";
import { chessPrompt } from "@/constants/prompts";

export default async function handler(req, res) {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { move, type } = req.query;

  const response = await api.sendMessage(chessPrompt({ type, move }));
  res.status(200).json({ move: response.text });
}
