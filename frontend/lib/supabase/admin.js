import { createClient as _createClient } from "@supabase/supabase-js";

let client = null;

export function createAdminClient() {
  if (client) return client;
  client = _createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  return client;
}
