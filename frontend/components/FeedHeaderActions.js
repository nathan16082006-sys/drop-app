"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Wallet, ChevronRight } from "lucide-react";

export default function FeedHeaderActions({ walletBalance = 0 }) {
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
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Notification */}
      <div style={{ position: "relative" }} ref={notifRef}>
        <button
          onClick={() => setNotifOpen((v) => !v)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "rgba(255,255,255,0.07)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.7)",
            transition: "background 200ms",
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
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: 20,
              width: 300,
              zIndex: 50,
            }}
          >
            <p
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
              }}
            >
              Aucune notification.
            </p>
          </div>
        )}
      </div>

      {/* Wallet */}
      <Link
        href="/dashboard/creator/wallet"
        style={{
          borderRadius: 10,
          background: "#c8f13510",
          border: "0.5px solid #c8f13530",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          transition: "background 200ms",
        }}
      >
        <Wallet size={16} color="#c8f135" />
        <span style={{ color: "#c8f135", fontWeight: 700, fontSize: 14 }}>
          {parseFloat(walletBalance).toFixed(2)} €
        </span>
        <ChevronRight size={14} color="rgba(255,255,255,0.4)" />
      </Link>
    </div>
  );
}
