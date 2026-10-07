import React from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Gökçe İnşaat ve Yapı gizlilik ve veri güvenliği politikası.",
  alternates: {
    canonical: `${siteConfig.url}/gizlilik-politikasi`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Gizlilik Politikası" }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-card space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 border-b border-slate-100 pb-4">
            Gizlilik Politikası
          </h1>

          <p>
            {siteConfig.name} olarak ziyaretçilerimizin ve müşterilerimizin gizliliğini korumak en temel taahhütlerimizdendir.
          </p>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            Bilgi Güvenliği
          </h2>
          <p>
            Web sitemiz üzerinden doldurduğunuz teklif, arsa bilgisi ve iletişim formlarındaki tüm veriler SSL şifreleme sertifikası ve güvenli sunucu altyapısıyla korunmaktadır.
          </p>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            Üçüncü Taraf Bağlantıları
          </h2>
          <p>
            Sitemiz üzerinde WhatsApp ve Instagram gibi üçüncü taraf servis bağlantıları yer alabilir. Bu servislerin gizlilik uygulamalarından kendi gizlilik politikaları sorumludur.
          </p>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            İletişim
          </h2>
          <p>
            Gizlilik politikamızla ilgili her türlü soru için bize <strong>{siteConfig.contact.email}</strong> üzerinden ulaşabilirsiniz.
          </p>
        </div>

      </div>
    </div>
  );
}
