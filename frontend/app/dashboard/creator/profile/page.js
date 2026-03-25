"use client";
import { useUser } from "@clerk/nextjs";

const networks = [
  { label: "Instagram", placeholder: "@ton_pseudo", connected: false },
  { label: "TikTok", placeholder: "@ton_pseudo", connected: true },
  { label: "YouTube", placeholder: "URL chaîne", connected: false },
];

export default function Profile() {
  const { user } = useUser();

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Mon profil
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Tes informations et réseaux sociaux
        </p>
      </div>

      {/* Avatar + name */}
      <div
        className="flex items-center gap-5 p-6 rounded-2xl border mb-6"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt="avatar" className="w-16 h-16 rounded-2xl object-cover" />
        ) : (
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: "#c8f13520", color: "#c8f135" }}
          >
            {user?.firstName?.[0] ?? "?"}
          </div>
        )}
        <div>
          <p className="font-semibold text-lg">
            {user?.fullName ?? "—"}
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            {user?.primaryEmailAddress?.emailAddress ?? "—"}
          </p>
        </div>
      </div>

      {/* Niche */}
      <div
        className="p-6 rounded-2xl border mb-6"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
          Ma niche
        </h2>
        <div className="flex gap-2 flex-wrap">
          {["Mode", "Tech", "Sport", "Lifestyle", "Beauté", "Gaming"].map((n) => (
            <button
              key={n}
              className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div
        className="p-6 rounded-2xl border"
        style={{ backgroundColor: "#111113", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-syne)", color: "rgba(255,255,255,0.6)" }}>
          Réseaux sociaux
        </h2>
        <div className="flex flex-col gap-3">
          {networks.map((n) => (
            <div key={n.label} className="flex items-center gap-3">
              <span className="w-20 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                {n.label}
              </span>
              <input
                type="text"
                placeholder={n.placeholder}
                defaultValue={n.connected ? n.placeholder : ""}
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none border bg-transparent"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
              />
              <span
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: n.connected ? "#c8f13520" : "rgba(255,255,255,0.05)",
                  color: n.connected ? "#c8f135" : "rgba(255,255,255,0.3)",
                }}
              >
                {n.connected ? "Lié" : "—"}
              </span>
            </div>
          ))}
        </div>

        <button
          className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#c8f135", color: "#0a0a0b" }}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
