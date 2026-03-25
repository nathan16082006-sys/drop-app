export default function Home() {
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center min-h-screen px-6"
      style={{ backgroundColor: "#0a0a0b" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-1 mb-10">
        <span className="text-5xl font-bold tracking-tight text-white">
          drop
        </span>
        <span
          className="text-5xl font-bold leading-none"
          style={{ color: "#c8f135" }}
        >
          .
        </span>
      </div>

      {/* Slogan */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-12 tracking-tight">
        Gagne à chaque partage.
      </h1>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <a
          href="/sign-up?role=creator"
          className="flex-1 flex items-center justify-center h-13 rounded-full font-semibold text-base transition-opacity hover:opacity-90 active:opacity-80"
          style={{ backgroundColor: "#c8f135", color: "#0a0a0b" }}
        >
          Je suis créateur
        </a>
        <a
          href="/sign-up?role=brand"
          className="flex-1 flex items-center justify-center h-13 rounded-full font-semibold text-base border transition-colors hover:bg-white/10 active:bg-white/20"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "#ffffff" }}
        >
          Je suis une marque
        </a>
      </div>

      {/* Sign-in link */}
      <p className="mt-10 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        Déjà un compte ?{" "}
        <a
          href="/sign-in"
          className="underline underline-offset-4 transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Se connecter
        </a>
      </p>
    </div>
  );
}
