"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Gift, Bell, X } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";

const CATEGORIES = ["Toutes", "Mode", "Beauté", "Tech", "Sport", "Lifestyle", "Alimentaire"];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function CampaignModal({ campaign, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const commissionLabel =
    campaign.commission_type === "fixed"
      ? `${campaign.commission_fixed}€ fixe`
      : `${campaign.commission_percent}% commission`;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 28,
          maxWidth: 480,
          width: "100%",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: 8,
            padding: 8,
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            display: "flex",
          }}
        >
          <X size={16} />
        </button>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
          {campaign.category}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            color: "#fff",
            fontSize: 20,
            marginBottom: 12,
          }}
        >
          {campaign.name}
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
            lineHeight: 1.75,
            marginBottom: 20,
          }}
        >
          {campaign.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {campaign.discount_percent != null && (
            <span style={tagPill}>{campaign.discount_percent}% code promo</span>
          )}
          <span style={tagPill}>{commissionLabel}</span>
          {campaign.duration_days != null && (
            <span style={tagPill}>{campaign.duration_days} jours</span>
          )}
        </div>
      </div>
    </div>
  );
}

const tagPill = {
  background: "rgba(255,255,255,0.06)",
  borderRadius: 20,
  padding: "4px 10px",
  fontSize: 12,
  color: "rgba(255,255,255,0.5)",
};

function NotifButton({ reducedMotion }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: hovered ? "#c8f13525" : "#c8f13514",
        border: "1px solid #c8f13530",
        color: "#c8f135",
        borderRadius: 999,
        padding: "10px 18px",
        cursor: "pointer",
        transition: reducedMotion ? "none" : "background 200ms",
        fontSize: 14,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      <Bell size={16} />
      Activer les notifications
    </button>
  );
}

export default function FeedClient({ campaigns }) {
  const [activeFilter, setActiveFilter] = useState("Toutes");
  const [search, setSearch] = useState("");
  const [modalCampaign, setModalCampaign] = useState(null);
  const reducedMotion = useReducedMotion();

  const filtered = campaigns.filter((c) => {
    const matchCat = activeFilter === "Toutes" || c.category === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      (c.description ?? "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Header with blobs */}
      <div style={{ position: "relative", overflow: "hidden", marginBottom: 32 }}>
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -60,
            width: 350,
            height: 250,
            background: "#EC4899",
            filter: "blur(80px)",
            opacity: 0.25,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -20,
            right: 50,
            width: 300,
            height: 300,
            background: "#c8f135",
            filter: "blur(100px)",
            opacity: 0.15,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, paddingBottom: 8 }}>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: 30,
              color: "#fff",
              marginBottom: 4,
            }}
          >
            Feed des offres
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
            {filtered.length} offre{filtered.length !== 1 ? "s" : ""} disponible
            {filtered.length !== 1 ? "s" : ""} pour toi
          </p>
        </div>
      </div>

      {/* Filters + search */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                transition: reducedMotion ? "none" : "background 150ms, color 150ms",
                backgroundColor:
                  activeFilter === cat ? "#c8f135" : "rgba(255,255,255,0.06)",
                color: activeFilter === cat ? "#0a0a0b" : "rgba(255,255,255,0.6)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.4)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Rechercher une marque, un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "8px 12px 8px 36px",
                width: 260,
                color: "#fff",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: 10,
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 192,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.07)",
            fontSize: 14,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Aucune campagne disponible pour le moment.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDetails={() => setModalCampaign(campaign)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      )}

      {/* Notification banner */}
      <div
        style={{
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 40,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Gift size={24} color="#EC4899" style={{ flexShrink: 0 }} />
          <div>
            <p
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: 3,
                fontSize: 15,
              }}
            >
              Nouvelles offres chaque semaine
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
              Active les notifications pour ne rater aucune opportunité exclusive.
            </p>
          </div>
        </div>
        <NotifButton reducedMotion={reducedMotion} />
      </div>

      {/* Modal */}
      {modalCampaign && (
        <CampaignModal
          campaign={modalCampaign}
          onClose={() => setModalCampaign(null)}
        />
      )}
    </>
  );
}
