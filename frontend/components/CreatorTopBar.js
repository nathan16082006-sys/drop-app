"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Wallet, ChevronRight } from "lucide-react";

export default function CreatorTopBar({ walletBalance = 0 }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(10,10,11,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 32px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Notification */}
      <div style={{ position: "relative" }} ref={notifRef}>
        <button
          onClick={() => setNotifOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: 10,
            cursor: "pointer",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <Bell size={18} />
        </button>
        {notifOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "#141414",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              width: 320,
              padding: "28px 20px",
              zIndex: 100,
            }}
          >
            <p
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.35)",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              Aucune notification pour le moment.
            </p>
          </div>
        )}
      </div>

      {/* Wallet */}
      <Link
        href="/dashboard/creator/wallet"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#c8f13514",
          border: "1px solid #c8f13530",
          borderRadius: 10,
          padding: "10px 14px",
          textDecoration: "none",
          color: "#c8f135",
        }}
      >
        <Wallet size={16} color="#c8f135" />
        <span style={{ fontWeight: 700, fontSize: 14 }}>
          {parseFloat(walletBalance).toFixed(2)} €
        </span>
        <ChevronRight size={14} />
      </Link>
    </div>
  );
}
