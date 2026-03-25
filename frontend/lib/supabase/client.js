import { createClient as _createClient } from "@supabase/supabase-js";

let client = null;

export function createClient() {
  if (client) return client;
  client = _createClient(
    "https://ahljkhrldzgsyseonclz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFobGpraHJsZHpnc3lzZW9uY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTc1MzksImV4cCI6MjA4OTk3MzUzOX0.OLFjuilsBMLsxGaiPIRdqEqy-EFB4epfH42rGqNMvNQ"
  );
  return client;
}
