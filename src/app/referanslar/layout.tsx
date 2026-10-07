import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Referans Projeler & Şantiye Videoları | Gökçe İnşaat ve Yapı",
  description: "Türkiye genelinde tamamladığımız karkas montajları, çatı kaplamaları ve çiftlik inşaatlarının gerçek video kayıtları ve şantiye fotoğrafları.",
  alternates: {
    canonical: `${siteConfig.url}/referanslar`,
  },
  openGraph: {
    title: "Referans Projeler & Şantiye Videoları | Gökçe İnşaat ve Yapı",
    description: "Türkiye genelinde tamamladığımız karkas montajları, çatı kaplamaları ve çiftlik inşaatlarının gerçek video kayıtları.",
    url: `${siteConfig.url}/referanslar`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
