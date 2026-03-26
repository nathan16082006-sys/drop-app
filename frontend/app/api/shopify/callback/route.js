import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

function verifyShopifyHmac(query, secret) {
  const { hmac, ...rest } = query;
  const message = Object.keys(rest)
    .sort()
    .map((k) => `${k}=${rest[k]}`)
    .join("&");
  const computed = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

  console.log("=== HMAC DEBUG ===");
  console.log("params triés :", message);
  console.log("hmac reçu    :", hmac);
  console.log("hmac calculé :", computed);
  console.log("match        :", computed === hmac);
  console.log("==================");

  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hmac));
}

export async function GET(request) {
  console.log("SECRET:", process.env.SHOPIFY_CLIENT_SECRET, env.SHOPIFY_CLIENT_SECRET);

  const { searchParams } = new URL(request.url);

  const code      = searchParams.get("code");
  const shop      = searchParams.get("shop");
  const hmac      = searchParams.get("hmac");
  const state     = searchParams.get("state");
  const timestamp = searchParams.get("timestamp");

  // 1. Vérifier le state anti-CSRF via cookie
  const cookieState = request.cookies.get("shopify_oauth_state")?.value;
  if (!cookieState || cookieState !== state) {
    return NextResponse.json({ error: "State invalide. Tentative CSRF possible." }, { status: 403 });
  }

  // 2. Vérifier le HMAC Shopify (tous les params sauf "hmac")
  const allParams = Object.fromEntries(searchParams.entries());
  const isValid = verifyShopifyHmac(allParams, env.SHOPIFY_CLIENT_SECRET);
  if (!isValid) {
    return NextResponse.json({ error: "HMAC invalide." }, { status: 403 });
  }

  // 3. Récupérer le userId depuis le state
  let userId;
  try {
    const decoded = JSON.parse(Buffer.from(state, "base64url").toString());
    userId = decoded.userId;
  } catch {
    return NextResponse.json({ error: "State malformé." }, { status: 400 });
  }

  // 4. Échanger le code contre un access token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env.SHOPIFY_CLIENT_ID,
      client_secret: env.SHOPIFY_CLIENT_SECRET,
      code,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.json({ error: "Échec de l'échange du code Shopify." }, { status: 500 });
  }

  const { access_token } = await tokenRes.json();

  // 5. Sauvegarder dans Supabase (upsert sur clerk_id)
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const { error: dbError } = await supabase.from("users").upsert(
    {
      clerk_id: userId,
      type: "brand",
      shopify_shop_domain: shop,
      shopify_access_token: access_token,
    },
    { onConflict: "clerk_id" }
  );

  if (dbError) {
    console.error("=== SUPABASE ERROR ===");
    console.error("message :", dbError.message);
    console.error("code    :", dbError.code);
    console.error("details :", dbError.details);
    console.error("hint    :", dbError.hint);
    console.error("=====================");
    return NextResponse.json({ error: "Erreur sauvegarde en base." }, { status: 500 });
  }

  // 6. Supprimer le cookie et rediriger
  const response = NextResponse.redirect(
    new URL("/dashboard/brand/shopify?connected=true", request.url)
  );
  response.cookies.delete("shopify_oauth_state");
  return response;
}
