import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { env } from "@/lib/env";

export async function GET(request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const { searchParams } = new URL(request.url);
  const shop = searchParams.get("shop");

  if (!shop || !shop.match(/^[a-zA-Z0-9-]+\.myshopify\.com$/)) {
    return NextResponse.json({ error: "Paramètre shop invalide." }, { status: 400 });
  }

  const nonce = crypto.randomBytes(16).toString("hex");
  const state = Buffer.from(JSON.stringify({ nonce, userId })).toString("base64url");

  const redirectUri = `${env.APP_URL}/api/shopify/callback`;
  const scopes = "read_products,read_orders,write_price_rules,write_discounts";

  const installUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  installUrl.searchParams.set("client_id", env.SHOPIFY_CLIENT_ID);
  installUrl.searchParams.set("scope", scopes);
  installUrl.searchParams.set("redirect_uri", redirectUri);
  installUrl.searchParams.set("state", state);

  console.log("OAuth URL:", installUrl.toString());

  const response = NextResponse.redirect(installUrl.toString());

  response.cookies.set("shopify_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}
