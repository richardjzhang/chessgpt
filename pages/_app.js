import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { OpenAiApiKeyProvider } from "@/context/AppContext";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <OpenAiApiKeyProvider secret={process.env.NEXT_PUBLIC_OPENAI_API_KEY}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </OpenAiApiKeyProvider>
  );
}
