"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = ["Mode", "Beauté", "Tech", "Sport", "Lifestyle", "Alimentaire", "Autre"];

export default function NewCampaign() {
  const { user } = useUser();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    commission_percent: "",
    start_date: "",
    end_date: "",
    max_creators: "",
    max_budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const start = new Date(form.start_date);
    const end = new Date(form.end_date);
    const duration_days = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));

    setLoading(true);
    const supabase = createClient();
    const { error: sbError } = await supabase.from("campaigns").insert({
      name: form.name,
      category: form.category,
      description: form.description,
      commission_percent: parseFloat(form.commission_percent),
      duration_days,
      max_creators: parseInt(form.max_creators),
      max_budget: parseFloat(form.max_budget),
      brand_id: user.id,
    });
    setLoading(false);

    if (sbError) {
      setError(sbError.message);
    } else {
      setSuccess(true);
      setForm({ name: "", category: "", description: "", commission_percent: "", start_date: "", end_date: "", max_creators: "", max_budget: "" });
    }
  }

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

      {success && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "rgba(108,99,255,0.15)", color: "#a89fff", border: "1px solid rgba(108,99,255,0.3)" }}>
          Campagne créée avec succès !
        </div>
      )}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "rgba(255,80,80,0.1)", color: "#ff8080", border: "1px solid rgba(255,80,80,0.25)" }}>
          {error}
        </div>
      )}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Infos générales */}
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="text-sm font-semibold mb-5" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
            Informations générales
          </h2>
          <div className="flex flex-col gap-4">
            <Field label="Nom de la campagne" name="name" placeholder="Ex : Collection Printemps 2026" value={form.name} onChange={handleChange} required />

            <div>
              <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Catégorie</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-transparent"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: form.category ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)", backgroundColor: "#111113" }}
              >
                <option value="" disabled style={{ backgroundColor: "#111113" }}>Sélectionner une catégorie</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} style={{ backgroundColor: "#111113" }}>{c}</option>
                ))}
              </select>
            </div>

            <Field label="Description" name="description" placeholder="Décris ta campagne aux créateurs..." textarea value={form.description} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-4">
              <Field label="Date de début" name="start_date" type="date" value={form.start_date} onChange={handleChange} required />
              <Field label="Date de fin" name="end_date" type="date" value={form.end_date} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* Commission */}
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="text-sm font-semibold mb-5" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
            Structure de commission
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Taux de commission (%)" name="commission_percent" placeholder="Ex : 15" type="number" value={form.commission_percent} onChange={handleChange} required />
            <Field label="Budget maximum (€)" name="max_budget" placeholder="Ex : 5000" type="number" value={form.max_budget} onChange={handleChange} required />
            <Field label="Créateurs max" name="max_creators" placeholder="Ex : 20" type="number" value={form.max_creators} onChange={handleChange} required />
          </div>
        </div>

        {/* Produits */}
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}>
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
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#6c63ff", color: "#ffffff" }}
          >
            {loading ? "Enregistrement..." : "Lancer la campagne"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, placeholder, textarea, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-transparent resize-none"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-transparent"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
        />
      )}
    </div>
  );
}
