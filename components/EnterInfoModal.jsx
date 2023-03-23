import { useState } from "react";
import Modal from "@/components/Modal";
import Link from "next/link";

export default function EnterInfoModal({ isOpen, setApiKey }) {
  const [inputText, setInputText] = useState("");

  function handleSetApiKey() {
    setApiKey(inputText);
  }

  return (
    <Modal isOpen={isOpen} title="Play Chess with ChatGPT">
      <div className="mt-4 text-black">
        <p>
          Due to high traffic I&apos;ve had to shift to a Bring Your Own Key
          (BYOK) model for this app. If you&apos;d like to try playing chess
          with ChatGPT, please enter your own OpenAI API Key.
        </p>
        <p className="mt-2">
          We will <bold>not</bold> store your key on our servers - you can check
          my{" "}
          <Link
            className="underline"
            href="https://github.com/richardjzhang/chessgpt"
            target="_blank"
          >
            code
          </Link>{" "}
          if you want to be sure!
        </p>
        <p className="mt-2">
          If you&apos;re unsure how to get an API key, you can find more details{" "}
          <Link
            className="underline"
            href="https://elephas.app/blog/how-to-create-openai-api-keys-cl5c4f21d281431po7k8fgyol0"
            target="_blank"
          >
            here
          </Link>
          .{" "}
        </p>
      </div>
      <div className="mt-6">
        <label className="text-gray-700 font-semibold" for="apiKey">
          OpenAI API Key
        </label>
        <input
          className="mt-2 shadow appearance-none border rounded w-full py-3 px-3 leading-tight bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline"
          id="apiKey"
          placeholder="e.g. bo-Xi7psYHXhILsCBJ72J17T"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <button
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        onClick={handleSetApiKey}
      >
        Submit
      </button>
    </Modal>
  );
}
