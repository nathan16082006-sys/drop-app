import { Shield, Zap, Users } from "lucide-react";

export default function Home() {
  return (
    <>
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

        {/* Gradient mesh — 5 organic layers fused via mix-blend-mode */}
        <div className="mesh mesh-1" aria-hidden="true" />
        <div className="mesh mesh-2" aria-hidden="true" />
        <div className="mesh mesh-3" aria-hidden="true" />
        <div className="mesh mesh-4" aria-hidden="true" />
        <div className="mesh mesh-5" aria-hidden="true" />

        {/* SVG grain texture overlay */}
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
