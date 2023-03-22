import { useEffect, useState } from "react";
import Head from "next/head";
import ChessGame from "@/components/ChessGame";
import EnterInfoModal from "@/components/EnterInfoModal";
import PickColorModal from "@/components/PickColorModal";
import { useOpenAiApiKey } from "@/context/AppContext";
import useGameSounds from "@/hooks/useGameSounds";

export default function Home() {
  const { apiKey, setApiKey } = useOpenAiApiKey();
  const [showPickColorModal, setShowPickColorModal] = useState(!!apiKey);
  const [color, setColor] = useState(null);
  const { gameStartSound } = useGameSounds();

  useEffect(() => {
    if (apiKey) setShowPickColorModal(true);
  }, [apiKey]);

  return (
    <>
      <Head>
        <title>ChessGPT</title>
        <meta name="description" content="ChessGPT - Play ChatGPT in Chess!" />
        <meta property="og:title" content="ChessGPT" />
        <meta property="og:description" content="Play ChatGPT in Chess!" />
        <meta property="og:image" content="/open-graph.png" />
      </Head>
      <ChessGame playerColor={color} />
      <EnterInfoModal isOpen={!apiKey} setApiKey={setApiKey} />
      <PickColorModal
        isOpen={showPickColorModal}
        onClose={() => setShowPickColorModal(false)}
        setColor={(c) => {
          setColor(c);
          gameStartSound();
        }}
      />
    </>
  );
}
