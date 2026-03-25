const offers = [
  { id: 1, brand: "Nike", category: "Sport", commission: "12%", desc: "Partage les dernières sneakers et gagne sur chaque vente.", color: "#ff6b35" },
  { id: 2, brand: "Sephora", category: "Beauté", commission: "8%", desc: "Beauté, soin et parfums — commission sur tout le catalogue.", color: "#e91e8c" },
  { id: 3, brand: "Notion", category: "SaaS", commission: "20%", desc: "Outil de productivité — commissions récurrentes.", color: "#ffffff" },
  { id: 4, brand: "Gymshark", category: "Sport", commission: "15%", desc: "Vêtements fitness avec un taux parmi les meilleurs du marché.", color: "#00d4aa" },
  { id: 5, brand: "Cdiscount", category: "E-commerce", commission: "5%", desc: "Millions de produits, taux de conversion élevé.", color: "#f5a623" },
  { id: 6, brand: "Figma", category: "SaaS", commission: "18%", desc: "Design collaboratif — commissions récurrentes sur abonnements.", color: "#a259ff" },
];

export default function CreatorOffers() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Feed des offres
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          {offers.length} offres disponibles pour toi
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["Toutes", "Sport", "Beauté", "SaaS", "E-commerce"].map((f) => (
          <button
            key={f}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: f === "Toutes" ? "#c8f135" : "rgba(255,255,255,0.06)",
              color: f === "Toutes" ? "#0a0a0b" : "rgba(255,255,255,0.6)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col gap-4 p-5 rounded-2xl border transition-colors hover:border-white/20"
            style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
          >
            {/* Brand avatar */}
            <div className="flex items-center justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: `${offer.color}22`, color: offer.color }}
              >
                {offer.brand.slice(0, 2).toUpperCase()}
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{ backgroundColor: "#c8f13520", color: "#c8f135" }}
              >
                {offer.commission}
              </span>
            </div>

            <div>
              <p className="font-semibold text-white mb-1">{offer.brand}</p>
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                {offer.category}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {offer.desc}
              </p>
            </div>

            <button
              className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#c8f135", color: "#0a0a0b" }}
            >
              Obtenir mon code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
