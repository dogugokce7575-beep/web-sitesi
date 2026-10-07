import React from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni.",
  alternates: {
    canonical: `${siteConfig.url}/kvkk`,
  },
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "KVKK Aydınlatma Metni" }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-card space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 border-b border-slate-100 pb-4">
            6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
          </h1>

          <p>
            <strong>{siteConfig.legalName}</strong> (“Şirket” veya “Gökçe İnşaat ve Yapı”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca Veri Sorumlusu sıfatıyla, kişisel verilerinizin güvenliğine ve gizliliğine azami önem vermekteyiz.
          </p>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            1. İşlenen Kişisel Verileriniz
          </h2>
          <p>
            Web sitemizdeki teklif ve iletişim formları aracılığıyla toplanan kişisel verileriniz:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Kimlik Bilgisi:</strong> Ad, Soyad</li>
            <li><strong>İletişim Bilgisi:</strong> Telefon numarası, E-posta adresi, Şehir/İlçe</li>
            <li><strong>Proje Bilgisi:</strong> Talep edilen yapı türü, hayvan kapasitesi, arsa büyüklüğü ve mesaj içeriği</li>
          </ul>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            2. Kişisel Verilerin İşlenme Amaçları
          </h2>
          <p>
            Toplanan kişisel verileriniz;
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Talep ettiğiniz proje ve inşaat tekliflerinin hazırlanması ve tarafınıza iletilmesi,</li>
            <li>Keşif, mimari projelendirme ve sözleşme süreçlerinin yürütülmesi,</li>
            <li>Müşteri memnuniyetinin ve iletişiminin sağlanması amaçlarıyla işlenmektedir.</li>
          </ul>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            3. Kişisel Verilerin Aktarılması
          </h2>
          <p>
            Kişisel verileriniz, yasal zorunluluklar haricinde hiçbir üçüncü şahıs, kurum veya reklam amacıyla paylaşılmaz.
          </p>

          <h2 className="font-heading font-bold text-lg text-slate-900 pt-2">
            4. İlgili Kişi Olarak Haklarınız
          </h2>
          <p>
            KVKK’nın 11. maddesi uyarınca veri sahibi olarak dilediğiniz zaman şirketimize başvurarak verilerinizin işlenip işlenmediğini öğrenme, silinmesini talep etme ve düzeltilmesini isteme hakkına sahipsiniz. İletişim: <strong>{siteConfig.contact.email}</strong>
          </p>
        </div>

      </div>
    </div>
  );
}
