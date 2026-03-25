"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShopifyConnect() {
  const [shop, setShop] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  function handleConnect(e) {
    e.preventDefault();
    const raw = shop.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (!raw.endsWith(".myshopify.com")) {
      setError("L'URL doit se terminer par .myshopify.com");
      return;
    }
    setError(null);
    router.push(`/api/shopify/auth?shop=${encodeURIComponent(raw)}`);
  }

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Connexion Shopify
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Connecte ta boutique pour synchroniser produits et commandes
        </p>
      </div>

      {/* Status card */}
      <div
        className="flex items-center gap-4 p-5 rounded-2xl border mb-6"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#96bf4822" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15.5 2.1s-.2-.1-.5-.1c-.3 0-2.4.6-2.4.6S11 1 9.5 1C6.7 1 5.3 4.5 4.9 6.2c-1 .3-1.7.5-1.8.6C2.4 7 2.4 7 2.3 7.7L1 19l13 2.5 7-1.5V8c-3.3-.9-5.5-4.7-5.5-5.9zM12 3.5c0 .5-.6 2.4-.6 2.4s-1.4-.5-2.6-.5c-1 0-1.8.5-1.8.5S7.5 4 9.5 3.2c.8-.3 2.5-.3 2.5.3zM12 3.5" fill="#96bf48"/>
          </svg>
        </div>
        <div>
          <p className="font-medium text-sm">Non connecté</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Aucune boutique liée pour l'instant
          </p>
        </div>
        <div
          className="ml-auto w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        />
      </div>

      {/* Connect form */}
      <form
        onSubmit={handleConnect}
        className="p-6 rounded-2xl border mb-6 flex flex-col gap-4"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <h2 className="text-sm font-semibold" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
          Connecter ma boutique
        </h2>

        <div>
          <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            URL de ta boutique Shopify
          </label>
          <div
            className="flex items-center border rounded-xl overflow-hidden"
            style={{ borderColor: error ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.1)" }}
          >
            <span
              className="px-4 py-3 text-sm border-r shrink-0"
              style={{ color: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              https://
            </span>
            <input
              type="text"
              value={shop}
              onChange={(e) => { setShop(e.target.value); setError(null); }}
              placeholder="ma-boutique.myshopify.com"
              className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
              style={{ color: "rgba(255,255,255,0.8)" }}
            />
          </div>
          {error && (
            <p className="text-xs mt-2" style={{ color: "#ff8080" }}>{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#6c63ff", color: "#ffffff" }}
        >
          Connecter via Shopify OAuth
        </button>
      </form>

      {/* What it does */}
      <div
        className="p-6 rounded-2xl border"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
          Ce que la connexion permet
        </h2>
        <ul className="flex flex-col gap-3">
          {[
            "Synchroniser ton catalogue produits",
            "Tracker les commandes issues des créateurs",
            "Calculer automatiquement les commissions",
            "Générer les factures créateurs",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#6c63ff" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
