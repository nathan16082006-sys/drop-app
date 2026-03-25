const invoices = [
  { id: "INV-2026-031", creator: "Lucas M.", date: "31 mars 2026", amount: "€1 044", status: "Payée" },
  { id: "INV-2026-030", creator: "Sarah K.", date: "28 mars 2026", amount: "€768", status: "Payée" },
  { id: "INV-2026-029", creator: "Alex B.", date: "20 mars 2026", amount: "€612", status: "En attente" },
  { id: "INV-2026-028", creator: "Marie L.", date: "15 mars 2026", amount: "€390", status: "En attente" },
  { id: "INV-2026-027", creator: "Tom R.", date: "01 mars 2026", amount: "€204", status: "Payée" },
];

export default function Invoices() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
            Factures
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Toutes les factures de tes créateurs affiliés
          </p>
        </div>
        <button
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#6c63ff", color: "#ffffff" }}
        >
          Exporter tout
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total à payer", value: "€1 002", color: "#f59e0b" },
          { label: "Payé ce mois", value: "€2 016", color: "#6c63ff" },
          { label: "Factures en attente", value: "2", color: "rgba(255,255,255,0.6)" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)", color: s.color }}>
              {s.value}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#111113", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {["Numéro", "Créateur", "Date", "Montant", "Statut", ""].map((h) => (
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
            {invoices.map((inv, i) => (
              <tr
                key={inv.id}
                style={{
                  backgroundColor: i % 2 === 0 ? "#0d0d0f" : "#111113",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <td className="px-5 py-4">
                  <code className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {inv.id}
                  </code>
                </td>
                <td className="px-5 py-4 font-medium">{inv.creator}</td>
                <td className="px-5 py-4" style={{ color: "rgba(255,255,255,0.5)" }}>{inv.date}</td>
                <td className="px-5 py-4 font-semibold">{inv.amount}</td>
                <td className="px-5 py-4">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: inv.status === "Payée" ? "#6c63ff22" : "#f59e0b22",
                      color: inv.status === "Payée" ? "#6c63ff" : "#f59e0b",
                    }}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Télécharger PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
