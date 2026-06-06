"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

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
function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 010-4h14v4" />
      <path d="M3 5v14a2 2 0 002 2h16v-5" />
      <path d="M18 12a2 2 0 000 4h4v-4z" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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
  { href: "/dashboard/creator", label: "Offres", icon: OffersIcon, exact: true },
  { href: "/dashboard/creator/codes", label: "Mes codes", icon: CodesIcon },
  { href: "/dashboard/creator/wallet", label: "Wallet", icon: WalletIcon },
  { href: "/dashboard/creator/profile", label: "Profil", icon: ProfileIcon },
];

const brandNav = [
  { href: "/dashboard/brand", label: "Dashboard", icon: HomeIcon, exact: true },
  { href: "/dashboard/brand/campaign", label: "Campagnes", icon: CampaignIcon },
{ href: "/dashboard/brand/invoices", label: "Factures", icon: InvoicesIcon },
];

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const nav = role === "creator" ? creatorNav : brandNav;
  const accent = role === "creator" ? "#c8f135" : "#6c63ff";
  const roleLabel = role === "creator" ? "Créateur" : "Marque";

  return (
    <aside
      className="flex flex-col w-60 shrink-0 min-h-screen px-4 py-6 border-r"
      style={{ backgroundColor: "#0d0d0f", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Logo */}
      <div className="flex items-center px-2 mb-8">
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.5rem", color: "#fff" }}>
          drop
        </span>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.5rem", color: "#c8f135" }}>
          .
        </span>
      </div>

      {/* Role chip */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 w-fit text-xs font-semibold"
        style={{ backgroundColor: `${accent}18`, color: accent }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
        {roleLabel}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
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

      {/* User */}
      <div
        className="flex items-center gap-3 px-3 py-3 rounded-xl border"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Mon compte
        </span>
      </div>
    </aside>
  );
}
