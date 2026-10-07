import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Çiftlik Model Kataloğu | Besi, Süt, Karma ve Açık Besi Modelleri",
  description: "25 baştan 250 başa kadar Model A, B, C, D ve E standart çiftlik modelleri, teknik çizimler, kapasite planları ve yerleşim mimarisi. Gökçe İnşaat ve Yapı.",
  alternates: {
    canonical: `${siteConfig.url}/projeler`,
  },
  openGraph: {
    title: "Çiftlik Model Kataloğu | Besi, Süt, Karma ve Açık Besi Modelleri",
    description: "25 baştan 250 başa kadar Model A, B, C, D ve E standart çiftlik modelleri, teknik çizimler, kapasite planları ve yerleşim mimarisi.",
    url: `${siteConfig.url}/projeler`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
