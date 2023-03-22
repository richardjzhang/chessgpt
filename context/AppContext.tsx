import React, { createContext, useContext, useState, useMemo } from "react";

interface OpenAiApiKeyContextValue {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
}

const OpenAiApiKeyContext = createContext<OpenAiApiKeyContextValue | undefined>(
  undefined
);

interface OpenAiApiKeyProviderProps {
  secret?: string;
  children: React.ReactNode;
}

export const OpenAiApiKeyProvider: React.FC<OpenAiApiKeyProviderProps> = ({
  secret = null,
  children,
}) => {
  const [apiKey, setApiKey] = useState<string | null>(secret);
  const value = useMemo(() => ({ apiKey, setApiKey }), [apiKey]);

  return (
    <OpenAiApiKeyContext.Provider value={value}>
      {children}
    </OpenAiApiKeyContext.Provider>
  );
};

export const useOpenAiApiKey = (): OpenAiApiKeyContextValue => {
  const context = useContext(OpenAiApiKeyContext);

  if (!context) {
    throw new Error(
      "useOpenAiApiKey must be used within an OpenAiApiKeyProvider"
    );
  }

  return context;
};
