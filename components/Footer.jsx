import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-auto w-full h-40 p-4 flex flex-col space-y-2 justify-center bg-gray-800 text-sm text-blue-400 text-center">
      <p>
        ChatGPT is a language model owned by OpenAI. We acknowledge that all
        rights to ChatGPT and its underlying technology are owned by OpenAI.
      </p>
      <p>
        © 2023{" "}
        <Link
          className="text-blue-300 underline"
          href="https://twitter.com/zirichii"
        >
          zirichii
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
}
