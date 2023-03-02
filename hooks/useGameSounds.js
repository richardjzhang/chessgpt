import useSound from "use-sound";

export default function useGameSounds() {
  const [gameStartSound] = useSound("/sounds/game-start.mp3");
  const [computerMoveSound] = useSound("/sounds/normal.mp3");
  const [playerMoveSound] = useSound("/sounds/move-self.mp3");
  const [gameOverSound] = useSound("/sounds/game-end.mp3");
  const [captureSound] = useSound("/sounds/capture.mp3");
  const [castleSound] = useSound("/sounds/castle.mp3");
  const [promoteSound] = useSound("/sounds/promote.mp3");
  const [checkSound] = useSound("/sounds/check.mp3");

  return {
    gameStartSound,
    computerMoveSound,
    playerMoveSound,
    gameOverSound,
    captureSound,
    castleSound,
    promoteSound,
    checkSound,
  };
}
