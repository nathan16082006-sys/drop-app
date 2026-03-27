"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORY_COLORS = {
  Mode:        "#a259ff",
  Beauté:      "#e91e8c",
  Tech:        "#6c63ff",
  Sport:       "#00d4aa",
  Lifestyle:   "#c8f135",
  Alimentaire: "#f5a623",
  Autre:       "#ffffff",
};

export default function CampaignCard({ campaign }) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGetCode() {
    if (!user || loading) return;
    setLoading(true);
    setError(null);

    // Génère le code côté client uniquement pour l'affichage du label
    const firstName = (user.firstName || user.username || "USER")
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 4);
    const code_string = `${firstName}${campaign.commission_percent}`;

    const res = await fetch("/api/creator/generate-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaign_id: campaign.id, code_string }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue.");
      setLoading(false);
      return;
    }

    router.push(`/dashboard/creator/codes/${data.code_string}`);
  }

  const color = CATEGORY_COLORS[campaign.category] ?? "#ffffff";

  return (
    <div
      className="flex flex-col gap-4 p-5 rounded-2xl border transition-colors hover:border-white/20"
      style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {campaign.name.slice(0, 2).toUpperCase()}
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-semibold"
          style={{ backgroundColor: "#c8f13520", color: "#c8f135" }}
        >
          {campaign.commission_percent}%
        </span>
      </div>

      <div>
        <p className="font-semibold text-white mb-1">{campaign.name}</p>
        <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
          {campaign.category}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          {campaign.description}
        </p>
      </div>

      {error && (
        <p className="text-xs" style={{ color: "#ff8080" }}>{error}</p>
      )}

      <button
        onClick={handleGetCode}
        disabled={loading}
        className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#c8f135", color: "#0a0a0b" }}
      >
        {loading ? "Génération..." : "Obtenir mon code"}
      </button>
    </div>
  );
}
