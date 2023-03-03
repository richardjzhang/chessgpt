import { useState } from "react";
import Head from "next/head";
import ChessGame from "@/components/ChessGame";
import PickColorModal from "@/components/PickColorModal";
import useSound from "use-sound";

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [color, setColor] = useState(null);
  const [gameStartSound] = useSound("/sounds/game-start.mp3");

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
      <PickColorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        setColor={(c) => {
          setColor(c);
          gameStartSound();
        }}
      />
    </>
  );
}
