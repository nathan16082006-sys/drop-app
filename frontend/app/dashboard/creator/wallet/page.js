"use client";

export const dynamic = 'force-dynamic';

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

function WalletContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stripeParam = searchParams.get("stripe");
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/connect", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Wallet
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Tes gains et virements
        </p>
      </div>

      {/* Bandeaux de retour Stripe */}
      {stripeParam === "success" && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-6 text-sm font-medium"
          style={{ backgroundColor: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}
        >
          <span>✓</span>
          Compte bancaire connecté avec succès !
        </div>
      )}
      {stripeParam === "refresh" && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-6 text-sm font-medium"
          style={{ backgroundColor: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", color: "#facc15" }}
        >
          <span>⚠</span>
          L&apos;onboarding a expiré, recommence.
        </div>
      )}

      {/* Soldes */}
      <div
        className="relative p-8 rounded-3xl mb-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1f0f 0%, #0d0d0f 100%)",
          border: "1px solid rgba(200,241,53,0.15)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "#c8f135", transform: "translate(30%, -30%)" }}
        />
        <div className="grid grid-cols-2 gap-8 relative">
          <div>
            <p className="text-xs mb-2 uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
              Disponible
            </p>
            <p className="text-4xl font-bold" style={{ fontFamily: "var(--font-syne)", color: "#c8f135" }}>
              0,00 €
            </p>
          </div>
          <div>
            <p className="text-xs mb-2 uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
              En attente
            </p>
            <p className="text-4xl font-bold" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.35)" }}>
              0,00 €
            </p>
          </div>
        </div>
      </div>

      {/* Connexion compte bancaire */}
      <div
        className="p-6 rounded-2xl border"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <h2 className="text-base font-semibold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Compte bancaire
        </h2>
        <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
          Connecte ton compte pour recevoir tes virements.
        </p>

        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#c8f135", color: "#0a0a0b" }}
        >
          {loading ? "Redirection…" : "Connecter mon compte bancaire"}
        </button>

        <p className="mt-3 text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
          Sécurisé par Stripe · Tes données bancaires ne transitent pas par drop.
        </p>
      </div>
    </div>
  );
}

export default function WalletPage() {
  return (
    <Suspense>
      <WalletContent />
    </Suspense>
  );
}
