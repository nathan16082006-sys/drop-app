export default function APropos() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
          drop
        </span>
        <span style={{ fontSize: "2rem", fontWeight: 800, color: "#c8f135", lineHeight: 1 }}>
          .
        </span>
      </div>
      <h1 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
        À propos
      </h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", margin: 0 }}>
        Bientôt disponible
      </p>
    </div>
  );
}
