import { auth, currentUser } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import Sidebar from "@/components/Sidebar";

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
          position: "relative",
        }}
      >
        {/* Fixed ambient blobs — stay in viewport during scroll */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "240px",
            right: 0,
            height: "100vh",
            pointerEvents: "none",
            zIndex: 0,
            overflow: "visible",
          }}
        >
          {/* Blob 1 — Rose top-right */}
          <div
            style={{
              position: "absolute",
              top: -120,
              right: -80,
              width: 580,
              height: 460,
              background: "radial-gradient(ellipse at 45% 45%, #EC4899 0%, transparent 65%)",
              opacity: 0.32,
              borderRadius: "50%",
              filter: "blur(40px)",
              animation: "feedMesh1 50s ease-in-out infinite alternate",
              pointerEvents: "none",
            }}
          />
          {/* Blob 2 — Lime top-right accent */}
          <div
            style={{
              position: "absolute",
              top: 60,
              right: 220,
              width: 380,
              height: 360,
              background: "radial-gradient(ellipse at 55% 55%, #c8f135 0%, transparent 62%)",
              opacity: 0.30,
              borderRadius: "42% 58% 55% 45% / 48% 52% 48% 52%",
              filter: "blur(50px)",
              animation: "feedMesh2 65s ease-in-out infinite alternate",
              pointerEvents: "none",
            }}
          />
          {/* Blob 3 — Lime top-left dominant */}
          <div
            style={{
              position: "absolute",
              top: -110,
              left: -80,
              width: 560,
              height: 440,
              background: "radial-gradient(ellipse at 55% 45%, #c8f135 0%, transparent 65%)",
              opacity: 0.26,
              borderRadius: "50%",
              filter: "blur(42px)",
              animation: "feedMesh3 57s ease-in-out infinite alternate",
              pointerEvents: "none",
            }}
          />
          {/* Blob 4 — Rose top-left accent */}
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 190,
              width: 360,
              height: 340,
              background: "radial-gradient(ellipse at 45% 55%, #EC4899 0%, transparent 62%)",
              opacity: 0.21,
              borderRadius: "58% 42% 45% 55% / 52% 48% 52% 48%",
              filter: "blur(48px)",
              animation: "feedMesh4 72s ease-in-out infinite alternate",
              pointerEvents: "none",
            }}
          />
          {/* Blob 5 — Lime bottom-right ambient */}
          <div
            style={{
              position: "absolute",
              bottom: -60,
              right: -60,
              width: 440,
              height: 380,
              background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 63%)",
              opacity: 0.17,
              borderRadius: "50%",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          {/* Blob 6 — Rose bottom-left ambient */}
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 400,
              height: 360,
              background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 60%)",
              opacity: 0.15,
              borderRadius: "50%",
              filter: "blur(55px)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Page content above blobs */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "32px",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
