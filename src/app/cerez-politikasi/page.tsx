import React from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Gökçe İnşaat ve Yapı çerez (cookie) kullanım politikası.",
  alternates: {
    canonical: `${siteConfig.url}/cerez-politikasi`,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Çerez Politikası" }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-card space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 border-b border-slate-100 pb-4">
            Çerez (Cookie) Politikası
          </h1>

          <p>
            Bu Çerez Politikası, web sitemizi ziyaret ettiğinizde cihazınıza yerleştirilen çerezlerin türlerini ve kullanım amaçlarını açıklamaktadır.
          </p>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            Çerez Nedir?
          </h2>
          <p>
            Çerezler, bir internet sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır.
          </p>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            Kullanılan Çerez Türleri
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması ve temel fonksiyonların yürütülmesi için gereklidir.</li>
            <li><strong>Performans ve Analiz Çerezleri:</strong> Ziyaretçi trafiğini ve sayfa yükleme sürelerini ölçerek deneyimi optimize etmek için kullanılır.</li>
          </ul>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            Çerez Tercihlerini Yönetme
          </h2>
          <p>
            Tarayıcınızın ayarlarından dilediğiniz zaman çerezleri silebilir veya engelleyebilirsiniz. Ancak bu durumda sitemizin bazı fonksiyonları kısıtlanabilir.
          </p>
        </div>

      </div>
    </div>
  );
}
