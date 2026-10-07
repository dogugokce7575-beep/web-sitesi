import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "İletişim | Gökçe İnşaat ve Yapı",
  description: "Türkiye genelinde çiftlik ve ahır projeleriniz için keşif, projelendirme ve teklif talebinde bulunun. Telefon: 0533 509 99 75. Gökçe İnşaat ve Yapı.",
  alternates: {
    canonical: `${siteConfig.url}/iletisim`,
  },
  openGraph: {
    title: "İletişim | Gökçe İnşaat ve Yapı",
    description: "Doğrudan arayın, WhatsApp'tan yazın veya teklif formunu doldurun. Türkiye geneli anahtar teslim yapı.",
    url: `${siteConfig.url}/iletisim`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
