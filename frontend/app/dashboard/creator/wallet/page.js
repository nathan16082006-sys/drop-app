const transactions = [
  { id: 1, label: "Commission Nike — mars", amount: "+€216", date: "22 mars 2026", type: "credit" },
  { id: 2, label: "Commission Notion — mars", amount: "+€372", date: "20 mars 2026", type: "credit" },
  { id: 3, label: "Virement bancaire", amount: "-€500", date: "15 mars 2026", type: "debit" },
  { id: 4, label: "Commission Sephora — fév.", amount: "+€56", date: "28 fév. 2026", type: "credit" },
  { id: 5, label: "Commission Gymshark — fév.", amount: "+€264", date: "14 fév. 2026", type: "credit" },
];

export default function Wallet() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Wallet
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Tes gains et mouvements
        </p>
      </div>

      {/* Balance card */}
      <div
        className="relative p-8 rounded-3xl mb-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1f0f 0%, #0d0d0f 100%)", border: "1px solid rgba(200,241,53,0.15)" }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "#c8f135", transform: "translate(30%, -30%)" }}
        />
        <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          Solde disponible
        </p>
        <p className="text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-syne)", color: "#c8f135" }}>
          €408
        </p>
        <button
          className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#c8f135", color: "#0a0a0b" }}
        >
          Virer sur mon compte
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: "Gains ce mois", value: "€588" },
          { label: "Total retiré", value: "€1 200" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
              {s.value}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-base font-semibold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
          Historique
        </h2>
        <div className="flex flex-col gap-2">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between px-5 py-4 rounded-xl border"
              style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div>
                <p className="text-sm font-medium mb-0.5">{t.label}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {t.date}
                </p>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: t.type === "credit" ? "#c8f135" : "rgba(255,255,255,0.5)" }}
              >
                {t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
