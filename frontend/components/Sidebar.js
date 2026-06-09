"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, User, ChevronRight } from "lucide-react";

function OffersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function CodesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function CampaignIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
function InvoicesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

const creatorNav = [
  { href: "/dashboard/creator/dashboard", label: "Dashboard", icon: () => <LayoutDashboard size={18} /> },
  { href: "/dashboard/creator", label: "Offres", icon: OffersIcon, exact: true },
  { href: "/dashboard/creator/codes", label: "Mes codes", icon: CodesIcon },
  { href: "/dashboard/creator/wallet", label: "Wallet", icon: () => <Wallet size={18} /> },
  { href: "/dashboard/creator/profile", label: "Profil", icon: () => <User size={18} /> },
];

const brandNav = [
  { href: "/dashboard/brand", label: "Dashboard", icon: HomeIcon, exact: true },
  { href: "/dashboard/brand/campaign", label: "Campagnes", icon: CampaignIcon },
  { href: "/dashboard/brand/invoices", label: "Factures", icon: InvoicesIcon },
];

function Sparkline() {
  return (
    <svg viewBox="0 0 200 36" preserveAspectRatio="none" style={{ width: "100%", height: 28, display: "block" }}>
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 28 C15 24 25 10 40 14 C55 18 65 30 80 26 C95 22 105 10 120 14 C135 18 145 28 160 24 C175 20 185 12 200 16 L200 36 L0 36 Z"
        fill="url(#sparkFill)"
      />
      <path
        d="M0 28 C15 24 25 10 40 14 C55 18 65 30 80 26 C95 22 105 10 120 14 C135 18 145 28 160 24 C175 20 185 12 200 16"
        fill="none"
        stroke="#EC4899"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

export default function Sidebar({ role, walletBalance = 0, userInfo = null }) {
  const pathname = usePathname();
  const nav = role === "creator" ? creatorNav : brandNav;
  const accent = role === "creator" ? "#c8f135" : "#6c63ff";
  const roleLabel = role === "creator" ? "Créateur" : "Marque";

  const initials = userInfo
    ? ((userInfo.firstName?.[0] ?? "") + (userInfo.lastName?.[0] ?? "")).toUpperCase() || "?"
    : "?";
  const displayName = userInfo
    ? [userInfo.firstName, userInfo.lastName].filter(Boolean).join(" ") ||
      userInfo.username ||
      "Utilisateur"
    : "Utilisateur";

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        width: 240,
        flexShrink: 0,
        minHeight: "100vh",
        padding: "24px 16px",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "#0d0d0f",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 8px", marginBottom: 32 }}>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.5rem", color: "#fff" }}>
          drop
        </span>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.5rem", color: "#c8f135" }}>
          .
        </span>
      </div>

      {/* Role chip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          borderRadius: 999,
          marginBottom: 32,
          width: "fit-content",
          backgroundColor: `${accent}18`,
          color: accent,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: accent,
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        {roleLabel}
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "background-color 150ms, color 150ms",
                backgroundColor: isActive ? `${accent}14` : "transparent",
                color: isActive ? accent : "rgba(255,255,255,0.5)",
              }}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Wallet widget — creator only */}
      {role === "creator" && (
        <div
          style={{
            backgroundColor: "#141414",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "14px",
            marginBottom: 12,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 500,
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Ce mois-ci
          </p>
          <p
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              color: "#fff",
              fontSize: 22,
              marginBottom: 8,
              lineHeight: 1,
            }}
          >
            {parseFloat(walletBalance).toFixed(2)} €
          </p>
          <Sparkline />
          <Link
            href="/dashboard/creator/wallet"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              marginTop: 10,
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
            }}
          >
            Voir mes stats
            <ChevronRight size={13} />
          </Link>
        </div>
      )}

      {/* User info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 8px 4px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {userInfo?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={userInfo.imageUrl}
            alt={displayName}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#c8f13520",
              color: "#c8f135",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
        )}
        <div style={{ overflow: "hidden", flex: 1 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {displayName}
          </p>
          {userInfo?.username && (
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              @{userInfo.username}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
