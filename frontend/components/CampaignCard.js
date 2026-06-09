"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const CATEGORY_GRADIENTS = {
  "Beauté":      "linear-gradient(135deg, #EC4899, #9333EA)",
  "Tech":        "linear-gradient(135deg, #6c63ff, #1e1b4b)",
  "Mode":        "linear-gradient(135deg, #c8f135, #065f46)",
  "Sport":       "linear-gradient(135deg, #f97316, #dc2626)",
  "Lifestyle":   "linear-gradient(135deg, #06b6d4, #3b82f6)",
  "Alimentaire": "linear-gradient(135deg, #f59e0b, #92400e)",
};

const CATEGORY_GLOW = {
  "Beauté":      "#EC4899",
  "Tech":        "#6c63ff",
  "Mode":        "#c8f135",
  "Sport":       "#f97316",
  "Lifestyle":   "#06b6d4",
  "Alimentaire": "#f59e0b",
};

const tagPill = {
  background: "rgba(255,255,255,0.06)",
  borderRadius: 20,
  padding: "4px 10px",
  fontSize: 12,
  color: "rgba(255,255,255,0.5)",
};

function DetailsLink({ onDetails, reducedMotion }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onDetails}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        color: hovered ? "#fff" : "rgba(255,255,255,0.4)",
        textAlign: "center",
        width: "100%",
        padding: "2px 0",
        transition: reducedMotion ? "none" : "color 150ms",
      }}
    >
      Voir les détails →
    </button>
  );
}

export default function CampaignCard({ campaign, onDetails, reducedMotion = false }) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  async function handleGetCode() {
    if (!user || loading) return;
    setLoading(true);
    setError(null);

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

  const gradient =
    CATEGORY_GRADIENTS[campaign.category] ?? "linear-gradient(135deg, #2a2a2a, #141414)";
  const glowColor = CATEGORY_GLOW[campaign.category] ?? "#ffffff";
  const initials = campaign.name.slice(0, 2).toUpperCase();
  const commissionBadge =
    campaign.commission_type === "fixed"
      ? `${campaign.commission_fixed}€ fixe`
      : `${campaign.commission_percent}%`;

  const cardBoxShadow = !reducedMotion && hovered
    ? `0 8px 32px rgba(0,0,0,0.4), 0 0 24px -4px ${glowColor}40`
    : "0 0 0 0 transparent";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#141414",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: reducedMotion ? "none" : "transform 200ms, box-shadow 300ms ease",
        transform: !reducedMotion && hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: cardBoxShadow,
      }}
    >
      {/* Banner — avatar + badge overlaid */}
      <div
        style={{
          height: 160,
          background: gradient,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {/* Large background initials */}
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: 48,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          {initials}
        </span>

        {/* Avatar — top left */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "white",
            fontFamily: "var(--font-syne)",
          }}
        >
          {initials}
        </div>

        {/* Commission badge — top right */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(200,241,53,0.3)",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
            color: "#c8f135",
            fontFamily: "var(--font-syne)",
          }}
        >
          {commissionBadge}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        {/* Title + category */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              color: "#fff",
              fontSize: 15,
              marginBottom: 2,
            }}
          >
            {campaign.name}
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            {campaign.category}
          </p>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {campaign.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {campaign.discount_percent != null && (
            <span style={tagPill}>{campaign.discount_percent}% code promo</span>
          )}
          <span style={tagPill}>
            {campaign.commission_type === "fixed"
              ? `${campaign.commission_fixed}€ fixe`
              : `${campaign.commission_percent}% commission`}
          </span>
          {campaign.duration_days != null && (
            <span style={tagPill}>{campaign.duration_days} jours</span>
          )}
        </div>

        {error && (
          <p style={{ fontSize: 12, color: "#ff8080" }}>{error}</p>
        )}

        {/* CTA */}
        <button
          onClick={handleGetCode}
          disabled={loading}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: "#c8f135",
            color: "#0a0a0b",
            fontWeight: 700,
            borderRadius: 999,
            padding: "12px 20px",
            width: "100%",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
            transition: reducedMotion ? "none" : "all 200ms",
            transform:
              !reducedMotion && btnHovered && !loading
                ? "translateY(-1px)"
                : "translateY(0)",
            fontSize: 14,
            marginTop: "auto",
          }}
        >
          {loading ? "Génération..." : "Obtenir mon code"}
          {!loading && <ArrowUpRight size={16} />}
        </button>

        <DetailsLink onDetails={onDetails} reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}
