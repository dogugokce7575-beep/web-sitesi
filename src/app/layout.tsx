import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import WhatsAppFloatingButton from "@/components/layout/WhatsAppFloatingButton";
import CookieBanner from "@/components/layout/CookieBanner";
import SchemaOrg from "@/components/seo/SchemaOrg";
import { siteConfig } from "@/config/site";

export const viewport: Viewport = {
  themeColor: "#0e382b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Gökçe İnşaat ve Yapı | Anahtar Teslim Çiftlik, Ahır ve İnşaat",
    template: "%s | Gökçe İnşaat ve Yapı",
  },
  description: "Türkiye’nin her yerinde anahtar teslim çiftlik, ahır, ağıl, yem deposu, gübre çukuru ve tarımsal yapı çözümleri. Gökçe İnşaat ve Yapı.",
  keywords: [
    "Gökçe İnşaat ve Yapı",
    "anahtar teslim inşaat",
    "çiftlik yapımı",
    "çiftlik inşaatı",
    "ahır yapımı",
    "ahır inşaatı",
    "besi çiftliği yapımı",
    "süt çiftliği yapımı",
    "koyun çiftliği yapımı",
    "ağıl yapımı",
    "tarımsal yapı",
    "hayvancılık yapıları",
    "ağır çelik çiftlik",
    "prefabrik ahır",
    "betonarme ahır",
    "yem deposu",
    "gübre çukuru",
    "çiftlik modelleri",
    "ahır maliyeti hesaplama",
    "anahtar teslim çiftlik projeleri"
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    title: "Gökçe İnşaat ve Yapı | Anahtar Teslim Çiftlik, Ahır ve İnşaat",
    description: "Türkiye’nin her yerinde anahtar teslim çiftlik, ahır, ağıl, yem deposu, gübre çukuru ve tarımsal yapı çözümleri. Gökçe İnşaat ve Yapı.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero-farm.jpg",
        width: 1200,
        height: 630,
        alt: "Gökçe İnşaat ve Yapı - Anahtar Teslim Çiftlik ve Ahır Projeleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gökçe İnşaat ve Yapı | Anahtar Teslim Çiftlik, Ahır ve İnşaat",
    description: "Türkiye’nin her yerinde anahtar teslim çiftlik, ahır, ağıl, yem deposu, gübre çukuru ve tarımsal yapı çözümleri. Gökçe İnşaat ve Yapı.",
    images: ["/images/hero-farm.jpg"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <SchemaOrg />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-surface-soft text-slate-900 selection:bg-brand-900 selection:text-white pb-14 lg:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomBar />
        <WhatsAppFloatingButton />
        <CookieBanner />
      </body>
    </html>
  );
}
