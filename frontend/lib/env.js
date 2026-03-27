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

  // Supabase (publiques — accès statique obligatoire pour que Next.js inline les NEXT_PUBLIC_)
  get SUPABASE_URL() {
    const v = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!v) throw new Error('[env] Variable manquante : "NEXT_PUBLIC_SUPABASE_URL"\n→ Vérifie frontend/.env.local et redémarre le serveur.');
    return v;
  },
  get SUPABASE_ANON_KEY() {
    const v = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!v) throw new Error('[env] Variable manquante : "NEXT_PUBLIC_SUPABASE_ANON_KEY"\n→ Vérifie frontend/.env.local et redémarre le serveur.');
    return v;
  },

  // Shopify (serveur uniquement — ne pas importer dans un "use client")
  get SHOPIFY_CLIENT_ID()     { return get("SHOPIFY_CLIENT_ID"); },
  get SHOPIFY_CLIENT_SECRET() { return get("SHOPIFY_CLIENT_SECRET"); },
};
