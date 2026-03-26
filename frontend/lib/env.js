function get(name, fallback) {
  const value = process.env[name] || fallback;
  if (!value) {
    throw new Error(
      `[env] Variable manquante : "${name}"\n` +
      `→ Vérifie que frontend/.env.local contient bien ${name}=... et que le serveur a été redémarré.`
    );
  }
  return value;
}

export const env = {
  // App
  get APP_URL()             { return get("APP_URL", "http://localhost:3000"); },

  // Supabase (publiques — disponibles client + serveur)
  get SUPABASE_URL()        { return get("NEXT_PUBLIC_SUPABASE_URL"); },
  get SUPABASE_ANON_KEY()   { return get("NEXT_PUBLIC_SUPABASE_ANON_KEY"); },

  // Shopify (serveur uniquement — ne pas importer dans un "use client")
  get SHOPIFY_CLIENT_ID()     { return get("SHOPIFY_CLIENT_ID"); },
  get SHOPIFY_CLIENT_SECRET() { return get("SHOPIFY_CLIENT_SECRET"); },
};
