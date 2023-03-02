import Modal from "@/components/Modal";

export default function PickColorModal({ isOpen, onClose, setColor }) {
  function handleChooseColor(color) {
    setColor(color);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} title="Pick a color">
      <div className="mt-4 flex space-x-2">
        <button
          type="button"
          className="w-full justify-center rounded-md border border-black bg-white px-4 py-2 text-lg font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => handleChooseColor("w")}
        >
          White
        </button>
        <button
          type="button"
          className="w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-lg text-white font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => handleChooseColor("b")}
        >
          Black
        </button>
      </div>
    </Modal>
  );
}
