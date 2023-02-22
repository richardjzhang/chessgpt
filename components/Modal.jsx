import { Dialog } from "@headlessui/react";

export default function Modal({ isOpen, onClose, setColor }) {
  function handleChooseColor(color) {
    setColor(color);
    onClose();
  }

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      open={isOpen}
      onClose={onClose}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-white/40" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="flex justify-center text-lg font-medium leading-6 text-gray-900 text-center"
          >
            Pick a color
          </Dialog.Title>

          <div className="mt-4 flex space-x-2">
            <button
              type="button"
              className="w-full justify-center rounded-md border border-black bg-white px-4 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => handleChooseColor("w")}
            >
              White
            </button>
            <button
              type="button"
              className="w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm text-white font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => handleChooseColor("b")}
            >
              Black
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
