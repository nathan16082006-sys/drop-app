import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import CampaignCard from "@/components/CampaignCard";

async function getCampaigns() {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  const { data, error } = await supabase
    .from("campaigns")
    .select("id, name, category, description, commission_percent")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }
  return data;
}

export default async function CreatorOffers() {
  const campaigns = await getCampaigns();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Feed des offres
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          {campaigns.length} offre{campaigns.length !== 1 ? "s" : ""} disponible{campaigns.length !== 1 ? "s" : ""} pour toi
        </p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["Toutes", "Mode", "Beauté", "Tech", "Sport", "Lifestyle", "Alimentaire"].map((f) => (
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

      {campaigns.length === 0 ? (
        <div
          className="flex items-center justify-center h-48 rounded-2xl border text-sm"
          style={{ borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
        >
          Aucune campagne disponible pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
