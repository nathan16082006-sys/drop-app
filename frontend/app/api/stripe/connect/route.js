import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const supabase = await createClient();

  // 1. Vérifier si un stripe_account_id existe déjà
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("stripe_account_id")
    .eq("clerk_id", userId)
    .maybeSingle();

  if (userError) {
    return NextResponse.json({ error: "Erreur base de données." }, { status: 500 });
  }

  let accountId = user?.stripe_account_id;

  // 2. Créer un compte Stripe Express si nécessaire
  if (!accountId) {
    const account = await stripe.accounts.create({
      type: "express",
      capabilities: {
        transfers: { requested: true },
      },
    });

    accountId = account.id;

    // 3. Sauvegarder dans Supabase
    const { error: updateError } = await supabase
      .from("users")
      .update({ stripe_account_id: accountId })
      .eq("clerk_id", userId);

    if (updateError) {
      return NextResponse.json({ error: "Erreur sauvegarde compte Stripe." }, { status: 500 });
    }
  }

  // 4. Générer le lien d'onboarding Stripe
  const baseUrl = env.APP_URL;
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${baseUrl}/dashboard/creator/wallet?stripe=refresh`,
    return_url: `${baseUrl}/dashboard/creator/wallet?stripe=success`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}
