"use client";

import { useState, useEffect } from "react";
import { Shield, Zap, Users } from "lucide-react";

const PARTICLES = [
  { size: 3, x: 12, y: 18, dur: 28, delay: 3,  color: "#c8f135", opacity: 0.30 },
  { size: 2, x: 85, y: 72, dur: 42, delay: 7,  color: "#EC4899", opacity: 0.25 },
  { size: 4, x: 33, y: 45, dur: 35, delay: 1,  color: "#c8f135", opacity: 0.35 },
  { size: 2, x: 68, y: 22, dur: 55, delay: 12, color: "#EC4899", opacity: 0.40 },
  { size: 3, x: 50, y: 88, dur: 23, delay: 5,  color: "#c8f135", opacity: 0.28 },
  { size: 2, x: 8,  y: 60, dur: 47, delay: 9,  color: "#EC4899", opacity: 0.32 },
  { size: 4, x: 92, y: 35, dur: 31, delay: 14, color: "#c8f135", opacity: 0.38 },
  { size: 3, x: 25, y: 78, dur: 60, delay: 0,  color: "#EC4899", opacity: 0.27 },
  { size: 2, x: 75, y: 55, dur: 20, delay: 6,  color: "#c8f135", opacity: 0.40 },
  { size: 3, x: 42, y: 12, dur: 38, delay: 11, color: "#EC4899", opacity: 0.30 },
  { size: 4, x: 60, y: 92, dur: 52, delay: 2,  color: "#c8f135", opacity: 0.25 },
  { size: 2, x: 18, y: 38, dur: 44, delay: 8,  color: "#EC4899", opacity: 0.35 },
  { size: 3, x: 88, y: 68, dur: 26, delay: 15, color: "#c8f135", opacity: 0.40 },
  { size: 2, x: 55, y: 25, dur: 33, delay: 4,  color: "#EC4899", opacity: 0.28 },
  { size: 4, x: 38, y: 62, dur: 58, delay: 10, color: "#c8f135", opacity: 0.32 },
];

export default function Home() {
  const [cursor, setCursor] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        .cursor-glow {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,241,53,0.06) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: left 0.1s ease, top 0.1s ease;
        }
        @media (max-width: 767px) {
          .cursor-glow { display: none; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-30px); }
        }
      `}</style>

      {/* Cursor glow */}
      <div
        className="cursor-glow"
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      />

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="drop-nav">
        <div className="drop-logo">
          <span>drop</span>
          <span className="drop-logo-dot">.</span>
        </div>

        <div className="drop-nav-links">
          <a href="/fonctionnalites" className="nav-link">Fonctionnalités</a>
          <a href="/comment-ca-marche" className="nav-link">Comment ça marche</a>
          <a href="/a-propos" className="nav-link">À propos</a>
        </div>

        <div className="drop-nav-actions">
          <a href="/sign-in" className="btn-nav-signin">Se connecter</a>
          <a href="/sign-up" className="btn-nav-signup">Créer un compte</a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <main className="drop-hero">

        {/* Gradient mesh — 5 organic layers */}
        <div className="mesh mesh-1" aria-hidden="true" />
        <div className="mesh mesh-2" aria-hidden="true" />
        <div className="mesh mesh-3" aria-hidden="true" />
        <div className="mesh mesh-4" aria-hidden="true" />
        <div className="mesh mesh-5" aria-hidden="true" />

        {/* SVG grain texture */}
        <svg className="drop-grain" aria-hidden="true">
          <defs>
            <filter id="grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: p.color,
              opacity: p.opacity,
              pointerEvents: "none",
              zIndex: 0,
              animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* Hero content — staggered fadeUp */}
        <div className="drop-hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot">●</span>
            <span className="hero-badge-text">LA COLLABORATION RÉINVENTÉE</span>
          </div>

          <h1 className="drop-h1">
            <span className="hero-title-1">Gagne à chaque</span>
            <span className="hero-title-2">partage.</span>
          </h1>

          <p className="hero-subtitle">
            Drop connecte les créateurs et les marques pour des partenariats
            authentiques et performants.
          </p>

          <div className="hero-buttons">
            <a href="/sign-up?role=creator" className="btn-creator">
              Je suis créateur ↗
            </a>
            <a href="/sign-up?role=brand" className="btn-brand">
              Je suis une marque ↗
            </a>
          </div>

          <p className="hero-signin">
            Déjà un compte ?{" "}
            <a href="/sign-in" className="signin-link">Se connecter</a>
          </p>
        </div>

        {/* Trust badges strip */}
        <div className="drop-trust">
          <div className="trust-badge">
            <Shield size={20} color="#c8f135" strokeWidth={1.75} />
            <div>
              <div className="trust-title">Partenariats vérifiés</div>
              <div className="trust-sub">Des collaborations de confiance</div>
            </div>
          </div>

          <div className="trust-badge">
            <Zap size={20} color="#EC4899" strokeWidth={1.75} />
            <div>
              <div className="trust-title">Paiements sécurisés</div>
              <div className="trust-sub">Rapides et transparents</div>
            </div>
          </div>

          <div className="trust-badge">
            <Users size={20} color="#c8f135" strokeWidth={1.75} />
            <div>
              <div className="trust-title">Communauté engagée</div>
              <div className="trust-sub">Des créateurs passionnés</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
