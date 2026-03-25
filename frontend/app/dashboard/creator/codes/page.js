const codes = [
  { id: 1, brand: "Nike", code: "DROP-NK42", clicks: 248, conversions: 18, earnings: "€216", status: "Actif" },
  { id: 2, brand: "Notion", code: "DROP-NT91", clicks: 134, conversions: 31, earnings: "€372", status: "Actif" },
  { id: 3, brand: "Sephora", code: "DROP-SP07", clicks: 89, conversions: 7, earnings: "€56", status: "Actif" },
  { id: 4, brand: "Gymshark", code: "DROP-GS15", clicks: 312, conversions: 22, earnings: "€264", status: "Expiré" },
];

export default function MesCodes() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Mes codes
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Tes codes affiliés actifs et leurs performances
        </p>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Clics totaux", value: "783" },
          { label: "Conversions", value: "78" },
          { label: "Gains totaux", value: "€908" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)", color: "#c8f135" }}>
              {s.value}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Codes list */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#111113", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {["Marque", "Code", "Clics", "Conversions", "Gains", "Statut"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left font-medium"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codes.map((c, i) => (
              <tr
                key={c.id}
                style={{
                  backgroundColor: i % 2 === 0 ? "#0d0d0f" : "#111113",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <td className="px-5 py-4 font-medium">{c.brand}</td>
                <td className="px-5 py-4">
                  <code
                    className="px-2.5 py-1 rounded-lg text-xs"
                    style={{ backgroundColor: "#c8f13518", color: "#c8f135" }}
                  >
                    {c.code}
                  </code>
                </td>
                <td className="px-5 py-4" style={{ color: "rgba(255,255,255,0.7)" }}>{c.clicks}</td>
                <td className="px-5 py-4" style={{ color: "rgba(255,255,255,0.7)" }}>{c.conversions}</td>
                <td className="px-5 py-4 font-semibold text-white">{c.earnings}</td>
                <td className="px-5 py-4">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: c.status === "Actif" ? "#c8f13520" : "rgba(255,255,255,0.06)",
                      color: c.status === "Actif" ? "#c8f135" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
