import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Ücretsiz Proje ve Fiyat Teklifi Alın",
  description: "Arsanıza ve hayvancılık hedefinize özel anahtar teslim ahır, çiftlik ve konut yapım teklifi isteyin. 81 ilde anahtar teslim inşaat güvencesi.",
  alternates: {
    canonical: `${siteConfig.url}/teklif-al`,
  },
  openGraph: {
    title: "Ücretsiz Proje ve Fiyat Teklifi Alın | Gökçe İnşaat",
    description: "Anahtar teslim ahır, çiftlik, depo ve ev projeleriniz için 24 saat içinde net fiyat teklifi alın.",
    url: `${siteConfig.url}/teklif-al`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
