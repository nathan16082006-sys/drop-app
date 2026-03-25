import Sidebar from "@/components/Sidebar";

export default function CreatorLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="creator" />
      <main className="flex-1 overflow-auto p-8" style={{ backgroundColor: "#0a0a0b" }}>
        {children}
      </main>
    </div>
  );
}
