import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <main className="w-screen h-screen bg-gray-900">
      <Component {...pageProps} />
    </main>
  );
}
