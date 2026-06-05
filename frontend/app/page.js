import { Shield, Zap, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Fixed Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          height: "64px",
          background: "rgba(10,10,11,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
            }}
          >
            drop
          </span>
          <span
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#c8f135",
              lineHeight: 1,
            }}
          >
            .
          </span>
        </div>

        {/* Center links */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <a
            href="/fonctionnalites"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            Fonctionnalités
          </a>
          <a
            href="/comment-ca-marche"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Comment ça marche
          </a>
          <a
            href="/a-propos"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            À propos
          </a>
        </div>

        {/* Right buttons */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a
            href="/sign-in"
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Se connecter
          </a>
          <a
            href="/sign-up"
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              backgroundColor: "#c8f135",
              color: "#0a0a0b",
              fontSize: "0.875rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Créer un compte
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0a0a0b",
          paddingTop: "64px",
          paddingBottom: "120px",
        }}
      >
        {/* SVG Wave — left (pink/magenta) */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
            overflow: "visible",
          }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <filter id="blur-pink-8" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="blur-pink-20" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>
          <g className="wave-pink">
            <path
              d="M -100 1000 C 20 820, -80 680, 80 540 C 200 430, 40 290, 160 80"
              stroke="#EC4899"
              strokeWidth="1.5"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M -100 1000 C 20 820, -80 680, 80 540 C 200 430, 40 290, 160 80"
              stroke="#EC4899"
              strokeWidth="6"
              fill="none"
              opacity="0.3"
              filter="url(#blur-pink-8)"
            />
            <path
              d="M -100 1000 C 20 820, -80 680, 80 540 C 200 430, 40 290, 160 80"
              stroke="#EC4899"
              strokeWidth="20"
              fill="none"
              opacity="0.1"
              filter="url(#blur-pink-20)"
            />
          </g>
        </svg>

        {/* SVG Wave — right (lime) */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
            overflow: "visible",
          }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <filter id="blur-lime-8" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="blur-lime-20" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>
          <g className="wave-lime">
            <path
              d="M 1540 -100 C 1400 80, 1500 220, 1340 380 C 1210 500, 1400 640, 1260 880"
              stroke="#c8f135"
              strokeWidth="1.5"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M 1540 -100 C 1400 80, 1500 220, 1340 380 C 1210 500, 1400 640, 1260 880"
              stroke="#c8f135"
              strokeWidth="6"
              fill="none"
              opacity="0.3"
              filter="url(#blur-lime-8)"
            />
            <path
              d="M 1540 -100 C 1400 80, 1500 220, 1340 380 C 1210 500, 1400 640, 1260 880"
              stroke="#c8f135"
              strokeWidth="20"
              fill="none"
              opacity="0.1"
              filter="url(#blur-lime-20)"
            />
          </g>
        </svg>

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: "820px",
            width: "100%",
          }}
        >
          {/* Badge pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 1rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "2rem",
            }}
          >
            <span style={{ color: "#c8f135", fontSize: "0.55rem" }}>●</span>
            <span
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
              }}
            >
              LA COLLABORATION RÉINVENTÉE
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              marginBottom: "1.5rem",
              letterSpacing: "-0.035em",
            }}
          >
            <span style={{ display: "block", color: "#fff" }}>
              Gagne à chaque
            </span>
            <span
              style={{
                display: "block",
                background: "linear-gradient(90deg, #EC4899, #c8f135)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              partage.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              maxWidth: "540px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.65,
            }}
          >
            Drop connecte les créateurs et les marques pour des partenariats
            authentiques et performants.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            <a
              href="/sign-up?role=creator"
              style={{
                padding: "0.9rem 2rem",
                borderRadius: "999px",
                backgroundColor: "#c8f135",
                color: "#0a0a0b",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              Je suis créateur ↗
            </a>
            <a
              href="/sign-up?role=brand"
              style={{
                padding: "0.9rem 2rem",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              Je suis une marque ↗
            </a>
          </div>

          {/* Sign-in link */}
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.875rem" }}>
            Déjà un compte ?{" "}
            <a
              href="/sign-in"
              style={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Se connecter
            </a>
          </p>
        </div>

        {/* Trust badges strip */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            padding: "1.25rem 2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(10,10,11,0.6)",
            backdropFilter: "blur(10px)",
            zIndex: 1,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Shield size={20} color="#c8f135" strokeWidth={1.75} />
            <div>
              <div
                style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}
              >
                Partenariats vérifiés
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.75rem",
                }}
              >
                Des collaborations de confiance
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Zap size={20} color="#c8f135" strokeWidth={1.75} />
            <div>
              <div
                style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}
              >
                Paiements sécurisés
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.75rem",
                }}
              >
                Rapides et transparents
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Users size={20} color="#c8f135" strokeWidth={1.75} />
            <div>
              <div
                style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}
              >
                Communauté engagée
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.75rem",
                }}
              >
                Des créateurs passionnés
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
