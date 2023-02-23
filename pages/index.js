import { useState } from "react";
import ChessGame from "@/components/ChessGame";
import Modal from "@/components/Modal";
import { Chessboard } from "react-chessboard";
import Logo from "@/components/Logo";

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [color, setColor] = useState(null);

  return (
    <>
      <div className="px-10 py-4 w-full h-full flex justify-center items-center">
        <div className="mx-auto max-w-xl w-full flex flex-col items-center sm:w-8/12">
          {color ? (
            <ChessGame
              playerColor={color}
              boardOrientation={color === "w" ? "white" : "black"}
            />
          ) : (
            <>
              <Logo className="mb-4" />
              <Chessboard />
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        setColor={(c) => setColor(c)}
      />
    </>
  );
}
