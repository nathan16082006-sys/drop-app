import { createClient as _createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

let client = null;

export function createClient() {
  if (client) return client;
  client = _createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  return client;
}
