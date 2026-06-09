import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function CreatorLayout({ children }) {
  const { userId } = await auth();
  if (userId) {
    const supabase = createAdminClient();
    await supabase
      .from("users")
      .upsert({ clerk_id: userId, type: "creator" }, { onConflict: "clerk_id" });
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar role="creator" />
      <main className="flex-1 overflow-auto p-8" style={{ backgroundColor: "#0a0a0b" }}>
        {children}
      </main>
    </div>
  );
}
