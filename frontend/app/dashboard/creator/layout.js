import { auth, currentUser } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import Sidebar from "@/components/Sidebar";
import CreatorTopBar from "@/components/CreatorTopBar";

export default async function CreatorLayout({ children }) {
  const { userId } = await auth();

  let walletBalance = 0;
  let userInfo = null;

  if (userId) {
    const supabase = createAdminClient();
    const [, walletResult, clerkUser] = await Promise.all([
      supabase
        .from("users")
        .upsert({ clerk_id: userId, type: "creator" }, { onConflict: "clerk_id" }),
      supabase
        .from("users")
        .select("wallet_balance")
        .eq("clerk_id", userId)
        .single(),
      currentUser(),
    ]);
    walletBalance = walletResult.data?.wallet_balance ?? 0;
    if (clerkUser) {
      userInfo = {
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        username: clerkUser.username,
        imageUrl: clerkUser.imageUrl,
      };
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar role="creator" walletBalance={walletBalance} userInfo={userInfo} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0b",
          overflow: "auto",
          minHeight: "100vh",
        }}
      >
        <CreatorTopBar walletBalance={walletBalance} />
        <main style={{ flex: 1, padding: "32px" }}>{children}</main>
      </div>
    </div>
  );
}
