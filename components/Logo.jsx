import Image from "next/image";

export default function Logo({ className, size = 200 }) {
  return (
    <Image
      alt="Open AI logo"
      className={`${className} -my-4`}
      src="/openai.png"
      width={size}
      height={size}
    />
  );
}
