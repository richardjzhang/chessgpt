import { Dialog } from "@headlessui/react";

export default function Modal({ isOpen, children, title }) {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      open={isOpen}
      onClose={() => {}}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-white/40" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="flex justify-center text-2xl font-medium leading-6 text-gray-900 text-center"
          >
            {title}
          </Dialog.Title>

          {children}
        </div>
      </div>
    </Dialog>
  );
}
