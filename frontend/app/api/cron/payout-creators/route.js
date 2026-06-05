import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  // 1. Vérifier l'autorisation
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const supabase = await createClient();

  // 2. Récupérer les ventes pending dont la payout_date est passée
  const { data: sales, error: salesError } = await supabase
    .from("sales")
    .select("id, promo_code_id, commission_amount")
    .eq("status", "pending")
    .lte("payout_date", new Date().toISOString());

  if (salesError) {
    return NextResponse.json({ error: "Erreur récupération des ventes." }, { status: 500 });
  }

  if (!sales || sales.length === 0) {
    return NextResponse.json({ success: true, paid: 0 });
  }

  // 3. Traiter chaque vente individuellement
  let paid = 0;

  for (const sale of sales) {
    try {
      // a. Récupérer le creator_id via promo_code_id
      const { data: promoCode, error: promoError } = await supabase
        .from("promo_codes")
        .select("creator_id")
        .eq("id", sale.promo_code_id)
        .single();

      if (promoError || !promoCode?.creator_id) {
        console.error(`[payout] promo_code introuvable pour sale ${sale.id}:`, promoError);
        continue;
      }

      const creatorId = promoCode.creator_id;

      // b. Incrémenter wallet_balance du créateur
      const { data: user, error: userFetchError } = await supabase
        .from("users")
        .select("wallet_balance")
        .eq("clerk_id", creatorId)
        .single();

      if (userFetchError || !user) {
        console.error(`[payout] utilisateur introuvable pour creator_id ${creatorId}:`, userFetchError);
        continue;
      }

      const newBalance = (user.wallet_balance ?? 0) + sale.commission_amount;

      const { error: balanceError } = await supabase
        .from("users")
        .update({ wallet_balance: newBalance })
        .eq("clerk_id", creatorId);

      if (balanceError) {
        console.error(`[payout] échec mise à jour wallet pour creator ${creatorId}:`, balanceError);
        continue;
      }

      // c. Marquer la vente comme payée
      const { error: saleUpdateError } = await supabase
        .from("sales")
        .update({ status: "paid" })
        .eq("id", sale.id);

      if (saleUpdateError) {
        console.error(`[payout] échec mise à jour statut pour sale ${sale.id}:`, saleUpdateError);
        continue;
      }

      paid++;
    } catch (err) {
      console.error(`[payout] erreur inattendue pour sale ${sale.id}:`, err);
    }
  }

  return NextResponse.json({ success: true, paid });
}
