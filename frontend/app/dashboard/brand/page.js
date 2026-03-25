const stats = [
  { label: "Créateurs actifs", value: "24", delta: "+3 ce mois" },
  { label: "Clics générés", value: "12 840", delta: "+18% vs mois dernier" },
  { label: "Conversions", value: "438", delta: "3,4% taux" },
  { label: "Revenus générés", value: "€28 450", delta: "+€4 200 ce mois" },
];

const topCreators = [
  { name: "Lucas M.", handle: "@lucasm", conversions: 87, earnings: "€1 044" },
  { name: "Sarah K.", handle: "@sarahk", conversions: 64, earnings: "€768" },
  { name: "Alex B.", handle: "@alexb", conversions: 51, earnings: "€612" },
];

export default function BrandDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Vue d'ensemble de tes campagnes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)", color: "#6c63ff" }}>
              {s.value}
            </p>
            <p className="text-xs font-medium mb-1 text-white">{s.label}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top créateurs */}
        <div
          className="p-6 rounded-2xl border"
          style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-base font-semibold mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            Top créateurs
          </h2>
          <div className="flex flex-col gap-3">
            {topCreators.map((c, i) => (
              <div key={c.name} className="flex items-center gap-4">
                <span
                  className="w-6 text-sm font-bold"
                  style={{ color: i === 0 ? "#6c63ff" : "rgba(255,255,255,0.3)" }}
                >
                  #{i + 1}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: "#6c63ff22", color: "#6c63ff" }}
                >
                  {c.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.handle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{c.earnings}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.conversions} conv.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campagnes actives */}
        <div
          className="p-6 rounded-2xl border"
          style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-base font-semibold mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            Campagnes actives
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { name: "Collection Printemps", creators: 12, status: "Active" },
              { name: "Lancement App Mobile", creators: 8, status: "Active" },
              { name: "Soldes Été", creators: 4, status: "Brouillon" },
            ].map((camp) => (
              <div
                key={camp.name}
                className="flex items-center justify-between py-3 border-b last:border-0"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div>
                  <p className="text-sm font-medium">{camp.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {camp.creators} créateurs
                  </p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: camp.status === "Active" ? "#6c63ff22" : "rgba(255,255,255,0.06)",
                    color: camp.status === "Active" ? "#6c63ff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {camp.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
