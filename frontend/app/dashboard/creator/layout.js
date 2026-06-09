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
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: -120, right: -80, width: 580, height: 460, background: "radial-gradient(ellipse at 45% 45%, #EC4899 0%, transparent 65%)", opacity: 0.20, borderRadius: "50%", filter: "blur(40px)", animation: "feedMesh1 50s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: 60, right: 220, width: 380, height: 360, background: "radial-gradient(ellipse at 55% 55%, #c8f135 0%, transparent 62%)", opacity: 0.19, borderRadius: "42% 58% 55% 45% / 48% 52% 48% 52%", filter: "blur(50px)", animation: "feedMesh2 65s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: -110, left: -80, width: 560, height: 440, background: "radial-gradient(ellipse at 55% 45%, #c8f135 0%, transparent 65%)", opacity: 0.17, borderRadius: "50%", filter: "blur(42px)", animation: "feedMesh3 57s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: 70, left: 190, width: 360, height: 340, background: "radial-gradient(ellipse at 45% 55%, #EC4899 0%, transparent 62%)", opacity: 0.16, borderRadius: "58% 42% 45% 55% / 52% 48% 52% 48%", filter: "blur(48px)", animation: "feedMesh4 72s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: -50, left: "38%", width: 400, height: 340, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 64%)", opacity: 0.14, borderRadius: "50%", filter: "blur(55px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "4%", right: "18%", width: 320, height: 280, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 62%)", opacity: 0.18, borderRadius: "50%", filter: "blur(46px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "26%", right: -40, width: 480, height: 440, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 65%)", opacity: 0.17, borderRadius: "50%", filter: "blur(48px)", animation: "feedMesh5 80s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "30%", left: -60, width: 460, height: 420, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 63%)", opacity: 0.16, borderRadius: "50%", filter: "blur(52px)", animation: "feedMesh6 90s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "40%", left: "26%", width: 520, height: 440, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 62%)", opacity: 0.16, borderRadius: "50%", filter: "blur(70px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "56%", right: 20, width: 400, height: 360, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 63%)", opacity: 0.14, borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", bottom: "10%", left: "18%", width: 440, height: 400, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 61%)", opacity: 0.17, borderRadius: "50%", filter: "blur(54px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", bottom: -70, left: "30%", width: 480, height: 420, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 63%)", opacity: 0.15, borderRadius: "50%", filter: "blur(58px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", bottom: -60, right: -60, width: 460, height: 400, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 62%)", opacity: 0.16, borderRadius: "50%", filter: "blur(55px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", bottom: -40, left: -40, width: 420, height: 380, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 63%)", opacity: 0.14, borderRadius: "50%", filter: "blur(56px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: -80, left: -120, width: 500, height: 440, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 64%)", opacity: 0.15, borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "12%", right: -20, width: 380, height: 360, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 62%)", opacity: 0.16, borderRadius: "50%", filter: "blur(48px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "10%", left: "50%", width: 360, height: 320, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 63%)", opacity: 0.14, borderRadius: "50%", filter: "blur(55px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "48%", left: "8%", width: 380, height: 340, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 61%)", opacity: 0.15, borderRadius: "50%", filter: "blur(52px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "38%", right: "5%", width: 340, height: 300, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 63%)", opacity: 0.14, borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", top: "70%", left: "40%", width: 440, height: 400, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 62%)", opacity: 0.16, borderRadius: "50%", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", bottom: -100, left: "50%", width: 460, height: 420, background: "radial-gradient(ellipse at 50% 50%, #c8f135 0%, transparent 64%)", opacity: 0.14, borderRadius: "50%", filter: "blur(65px)" }} />
          <div style={{ position: "absolute", pointerEvents: "none", mixBlendMode: "screen", bottom: "15%", right: "10%", width: 360, height: 320, background: "radial-gradient(ellipse at 50% 50%, #EC4899 0%, transparent 62%)", opacity: 0.15, borderRadius: "50%", filter: "blur(52px)" }} />
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
