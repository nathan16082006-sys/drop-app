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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar — scrolls independently */}
      <div style={{ height: "100vh", overflowY: "auto", flexShrink: 0 }}>
        <Sidebar role="creator" walletBalance={walletBalance} userInfo={userInfo} />
      </div>

      {/* Main area — scrolls independently */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#0a0a0b",
        }}
      >
        {/* Fixed ambient blobs — stay in place during scroll */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "60vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -120,
              right: -80,
              width: 520,
              height: 420,
              background: "#EC4899",
              borderRadius: "50%",
              filter: "blur(120px)",
              opacity: 0.38,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 80,
              right: 120,
              width: 380,
              height: 480,
              background: "#c8f135",
              borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
              filter: "blur(130px)",
              opacity: 0.28,
            }}
          />
        </div>

        {/* Content above blobs */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}
        >
          <CreatorTopBar walletBalance={walletBalance} />
          <main style={{ flex: 1, padding: "32px" }}>{children}</main>
        </div>
      </div>
    </div>
  );
}
