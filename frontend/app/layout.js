import { Syne, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "drop. — Gagne à chaque partage.",
  description: "La plateforme d'affiliation pour créateurs et marques.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="fr" className={`${syne.variable} ${dmSans.variable} h-full`}>
        <body className="min-h-full flex flex-col font-body bg-app text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
