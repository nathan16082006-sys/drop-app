"use client";

export default function NewCampaign() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Créer une campagne
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Configure ta campagne d'affiliation en quelques étapes
        </p>
      </div>

      <form className="flex flex-col gap-6">
        {/* Infos générales */}
        <div
          className="p-6 rounded-2xl border"
          style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-sm font-semibold mb-5" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
            Informations générales
          </h2>
          <div className="flex flex-col gap-4">
            <Field label="Nom de la campagne" placeholder="Ex : Collection Printemps 2026" />
            <Field label="Description" placeholder="Décris ta campagne aux créateurs..." textarea />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Date de début" type="date" />
              <Field label="Date de fin" type="date" />
            </div>
          </div>
        </div>

        {/* Commission */}
        <div
          className="p-6 rounded-2xl border"
          style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-sm font-semibold mb-5" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
            Structure de commission
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Taux de commission (%)" placeholder="Ex : 15" type="number" />
            <Field label="Budget maximum (€)" placeholder="Ex : 5000" type="number" />
          </div>
          <div className="mt-4">
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
              Type de commission
            </p>
            <div className="flex gap-3">
              {["Sur vente", "Sur clic", "Mixte"].map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="commType" className="accent-[#6c63ff]" defaultChecked={t === "Sur vente"} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Produits */}
        <div
          className="p-6 rounded-2xl border"
          style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-sm font-semibold mb-5" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
            Produits concernés
          </h2>
          <div
            className="flex items-center justify-center h-24 rounded-xl border border-dashed text-sm cursor-pointer hover:border-[#6c63ff] transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.3)" }}
          >
            + Sélectionner des produits Shopify
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:bg-white/5"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
          >
            Sauvegarder brouillon
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#6c63ff", color: "#ffffff" }}
          >
            Lancer la campagne
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, placeholder, textarea, type = "text" }) {
  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-transparent resize-none"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-transparent"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
        />
      )}
    </div>
  );
}
