import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import FeedClient from "./FeedClient";
import FeedHeaderActions from "@/components/FeedHeaderActions";

async function getCampaigns() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select(
      "id, name, category, description, commission_percent, commission_type, commission_fixed, discount_percent, duration_days"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }
  return data ?? [];
}

async function getWalletBalance(userId) {
  if (!userId) return 0;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("users")
    .select("wallet_balance")
    .eq("clerk_id", userId)
    .single();
  return data?.wallet_balance ?? 0;
}

export default async function CreatorOffers() {
  const { userId } = await auth();
  const [campaigns, walletBalance] = await Promise.all([
    getCampaigns(),
    getWalletBalance(userId),
  ]);

  return (
    <>
      {/* Page header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: 28,
              color: "#fff",
              marginBottom: 4,
            }}
          >
            Feed des offres
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
            {campaigns.length} offre{campaigns.length !== 1 ? "s" : ""}{" "}
            disponible{campaigns.length !== 1 ? "s" : ""} pour toi
          </p>
        </div>
        <FeedHeaderActions walletBalance={walletBalance} />
      </div>

      {/* Feed content */}
      <FeedClient campaigns={campaigns} />
    </>
  );
}
