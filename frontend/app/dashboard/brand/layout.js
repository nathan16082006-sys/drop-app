import Sidebar from "@/components/Sidebar";

export default function BrandLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="brand" />
      <main className="flex-1 overflow-auto p-8" style={{ backgroundColor: "#0a0a0b" }}>
        {children}
      </main>
    </div>
  );
}
