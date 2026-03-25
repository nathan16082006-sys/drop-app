import { createClient } from "@supabase/supabase-js";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";

async function getPromoCode(codeString) {
  const supabase = createClient(
    "https://ahljkhrldzgsyseonclz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFobGpraHJsZHpnc3lzZW9uY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTc1MzksImV4cCI6MjA4OTk3MzUzOX0.OLFjuilsBMLsxGaiPIRdqEqy-EFB4epfH42rGqNMvNQ"
  );
  const { data, error } = await supabase
    .from("promo_codes")
    .select("code_string, status, created_at, campaigns(name, category, commission_percent)")
    .eq("code_string", codeString)
    .maybeSingle();

  if (error) console.error(error.message);
  return data;
}

export default async function CodePage({ params }) {
  const { code } = await params;
  const promo = await getPromoCode(code);

  if (!promo) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Code introuvable.</p>
        <Link href="/dashboard/creator" className="text-sm underline" style={{ color: "#c8f135" }}>
          Retour aux offres
        </Link>
      </div>
    );
  }

  const campaign = promo.campaigns;

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-8 pt-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/creator"
          className="text-xs mb-6 inline-block transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          ← Retour aux offres
        </Link>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>
          Ton code promo
        </h1>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Campagne · {campaign?.name}
        </p>
      </div>

      {/* Code display */}
      <div
        className="flex flex-col items-center gap-6 p-10 rounded-2xl border"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
          Ton code exclusif
        </p>
        <p
          className="text-6xl font-bold tracking-widest"
          style={{ fontFamily: "var(--font-syne)", color: "#c8f135" }}
        >
          {promo.code_string}
        </p>
        <CopyButton text={promo.code_string} />
      </div>

      {/* Campaign details */}
      <div
        className="p-6 rounded-2xl border flex flex-col gap-3"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Campagne</span>
          <span className="text-sm font-medium text-white">{campaign?.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Catégorie</span>
          <span className="text-sm font-medium text-white">{campaign?.category}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Commission</span>
          <span className="text-sm font-semibold" style={{ color: "#c8f135" }}>
            {campaign?.commission_percent}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Statut</span>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: "#c8f13520", color: "#c8f135" }}
          >
            {promo.status}
          </span>
        </div>
      </div>
    </div>
  );
}
