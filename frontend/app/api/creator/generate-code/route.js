import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createShopifyDiscountCode } from "@/lib/shopify";
import { env } from "@/lib/env";

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { campaign_id, code_string } = await request.json();
  if (!campaign_id || !code_string) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  // 1. Vérifier si un code existe déjà pour ce créateur / cette campagne
  const { data: existing } = await supabase
    .from("promo_codes")
    .select("code_string")
    .eq("campaign_id", campaign_id)
    .eq("creator_id", userId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ code_string: existing.code_string });
  }

  // 2. Récupérer la campagne (brand_id + commission_percent)
  const { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .select("brand_id, commission_percent")
    .eq("id", campaign_id)
    .single();

  if (campaignError || !campaign) {
    return NextResponse.json({ error: "Campagne introuvable." }, { status: 404 });
  }

  // 3. Récupérer les credentials Shopify de la marque
  const { data: brandRow, error: brandError } = await supabase
    .from("users")
    .select("shopify_shop_domain, shopify_access_token")
    .eq("clerk_id", campaign.brand_id)
    .maybeSingle();

  console.log("brand row:", JSON.stringify(brandRow));
  console.log("shopify token exists:", !!brandRow?.shopify_access_token);
  console.log("brand error:", brandError?.message ?? null);

  // 4. Créer le code dans Shopify (si la marque a connecté sa boutique)
  let shopifyIds = null;
  if (brandRow?.shopify_shop_domain && brandRow?.shopify_access_token) {
    try {
      shopifyIds = await createShopifyDiscountCode(
        brandRow.shopify_shop_domain,
        brandRow.shopify_access_token,
        code_string,
        campaign.commission_percent
      );
      console.log("shopify response:", JSON.stringify(shopifyIds));
    } catch (err) {
      console.error("shopify error:", err.message);
    }
  } else {
    console.log("shopify response: skipped — boutique non connectée");
  }

  // 5. Sauvegarder dans promo_codes
  const { error: insertError } = await supabase.from("promo_codes").insert({
    campaign_id,
    creator_id: userId,
    code_string,
    status: "active",
    shopify_price_rule_id: shopifyIds?.discount_id ?? null,
    shopify_discount_code_id: shopifyIds?.code_id ?? null,
  });

  if (insertError) {
    console.error("Supabase insert error:", insertError.message);
    return NextResponse.json({ error: "Erreur sauvegarde du code." }, { status: 500 });
  }

  return NextResponse.json({ code_string });
}
