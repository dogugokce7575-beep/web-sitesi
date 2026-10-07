import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Çiftlik Yapım Maliyeti | Fiyat Hesaplama | Gökçe İnşaat",
  description: "Çiftlik yapım maliyeti, metrekare fiyatları ve kademeli anahtar teslim hesaplama aracı. Gökçe İnşaat ve Yapı ile anında şeffaf fiyat çıkarın.",
  alternates: {
    canonical: `${siteConfig.url}/ciftlik-fiyatlari`,
  },
  openGraph: {
    title: "Çiftlik Yapım Maliyeti | Fiyat Hesaplama | Gökçe İnşaat",
    description: "Kapasite, model ve yapı sistemine göre anında anahtar teslim çiftlik yapım maliyetini hesaplayın.",
    url: `${siteConfig.url}/ciftlik-fiyatlari`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
