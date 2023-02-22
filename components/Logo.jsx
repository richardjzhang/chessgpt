import Image from "next/image";

export default function Logo({ className }) {
  return (
    <Image
      alt="Open AI logo"
      className={className}
      src="/openai.png"
      width={200}
      height={200}
    />
  );
}
