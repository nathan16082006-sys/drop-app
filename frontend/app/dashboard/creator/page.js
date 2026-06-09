import { createAdminClient } from "@/lib/supabase/admin";
import FeedClient from "./FeedClient";

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

export default async function CreatorOffers() {
  const campaigns = await getCampaigns();
  return <FeedClient campaigns={campaigns} />;
}
