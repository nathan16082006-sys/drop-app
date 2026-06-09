import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function BrandLayout({ children }) {
  const { userId } = await auth();
  if (userId) {
    const supabase = createAdminClient();
    await supabase
      .from("users")
      .upsert({ clerk_id: userId, type: "brand" }, { onConflict: "clerk_id" });
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar role="brand" />
      <main className="flex-1 overflow-auto p-8" style={{ backgroundColor: "#0a0a0b" }}>
        {children}
      </main>
    </div>
  );
}
