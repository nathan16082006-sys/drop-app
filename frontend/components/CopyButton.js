"use client";

import { useState } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="px-8 py-3 rounded-xl text-sm font-semibold transition-all"
      style={{
        backgroundColor: copied ? "rgba(200,241,53,0.15)" : "#c8f135",
        color: copied ? "#c8f135" : "#0a0a0b",
        border: copied ? "1px solid #c8f135" : "1px solid transparent",
      }}
    >
      {copied ? "Copié !" : "Copier le code"}
    </button>
  );
}
