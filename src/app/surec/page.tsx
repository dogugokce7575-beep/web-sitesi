import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  PhoneCall, 
  Compass, 
  FileCheck2, 
  HardHat, 
  Key, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Sparkles
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Nasıl Çalışıyoruz? | 5 Aşamalı Anahtar Teslim Süreç",
  description: "Gökçe İnşaat ve Yapı ile inşaat süreci sandığınızdan daha kolay. İhtiyaç analizinden 81 ilde anahtar teslime 5 aşamalı şeffaf süreç rehberi.",
  alternates: {
    canonical: `${siteConfig.url}/surec`,
  },
};

export default function ProcessPage() {
  const steps = [
    {
      num: "01",
      icon: PhoneCall,
      title: "İhtiyacınızı Dinliyoruz & Ön Keşif",
      headline: "Arazinizi, Hedeflerinizi ve Bütçenizi Analiz Ediyoruz",
      desc: "İnşaat sürecinin en önemli adımı doğru bir ihtiyaç programı oluşturmaktır. Türkiye'nin hangi ilinde olursa olsun arazinizin konumu, toprak yapısı, yol ve altyapı bağlantıları, hedeflenen hayvan kapasitesi veya konut yerleşimi detaylıca incelenir.",
      deliverables: [
        "Arazi eğim ve rüzgar yönü analizi",
        "Kapasiteye göre taban alanı (m²) fizibilitesi",
        "Ön bütçe ve süre projeksiyonu",
      ],
    },
    {
      num: "02",
      icon: Compass,
      title: "Mimari ve Statik Projelendirme",
      headline: "Bulunduğunuz Bölgenin İklim ve Kar Yükü Şartlarına Uygun 3D Tasarım",
      desc: "Projenin yapılacağı ilin resmi kar, rüzgar ve deprem parametrelerine göre çelik karkas mukavemeti, doğal baca etkili mahya havalandırması, traktör yemleme yolları ve padok ölçüleri bilgisayar ortamında milimetrik olarak çizilir.",
      deliverables: [
        "3D Mimari görselleştirme ve kat planları",
        "Statik çelik ve betonarme mühendislik hesapları",
        "TKDK / Kırsal Kalkınma hibe standartlarına uyum",
      ],
    },
    {
      num: "03",
      icon: FileCheck2,
      title: "Şeffaf Maliyet & Sözleşmeli Teklif",
      headline: "Sürpriz Ekstra Maliyetlere Son Veren Net Bütçe",
      desc: "Tüm malzeme markaları, beton sınıfları, çelik tonajı ve işçilik kalemleri şeffaf bir metraj cetveliyle sözleşmeye bağlanır. Süreç ortasında beklenmedik fiyat artışlarıyla karşılaşmazsınız.",
      deliverables: [
        "Kalem kalem malzeme & işçilik cetveli",
        "Net iş bitirme tarihi ve takvimi",
        "Hukuki güvenceli anahtar teslim sözleşme",
      ],
    },
    {
      num: "04",
      icon: HardHat,
      title: "Saha İmalatı ve Montaj",
      headline: "Zemin Betonundan Çatı İzolasyonuna Tek Elden İnşaat",
      desc: "Farklı taşeronlarla ayrı ayrı uğraşmanıza gerek kalmaz. Kendi deneyimli şantiye ekibimizle zemin hafriyatını yapıyor, C25/30 betonarme temeli atıyor, fabrikada hazırlanan çelik elemanları civatalı montajla kuruyor ve yalıtımlı çatıyı kapatıyoruz.",
      deliverables: [
        "Hafriyat ve donatılı temel betonu dökümü",
        "Endüstriyel çelik konstrüksiyon montajı",
        "Sandviç panel / taş yünü ısı izolasyonu uygulaması",
      ],
    },
    {
      num: "05",
      icon: Key,
      title: "Eksiksiz Anahtar Teslimat",
      headline: "Tüm Sistemler Çalışır Halde, Hemen Kullanıma Hazır",
      desc: "İç padok ayırıcı paravanlar, donmaz suluk hatları, aydınlatma armatürleri, elektrik ve su vanaları tek tek test edilir. Yapınız sıfır eksikle ve temizlenmiş olarak hemen kullanıma hazır teslim edilir.",
      deliverables: [
        "Donmaz suluk ve su tesisatı fonksiyon testleri",
        "Elektrik ve LED aydınlatma hatlarının devreye alınması",
        "Saha temizliği ve anahtar teslim tutanağı",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Nasıl Çalışıyoruz? (Süreç)" }]} />

        {/* Page Hero */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-14 mb-14 relative overflow-hidden shadow-premium">
          <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Gökçe İnşaat Güvencesi</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Süreç Sandığınızdan <br />
              <span className="text-gradient-orange">
                Daha Kolay.
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Türkiye'nin neresinde olursanız olun inşaat sürecindeki tüm zorlukları ve usta stresini ortadan kaldırıyoruz. Siz sadece hayalinizi anlatın, gerisini bize bırakın.
            </p>
          </div>
        </div>

        {/* Comparison: Geleneksel vs Gökçe İnşaat */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card mb-16">
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mb-6 text-center">
            Neden Anahtar Teslim Modelimizi Tercih Etmelisiniz?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Geleneksel Yöntem */}
            <div className="space-y-4 pr-0 md:pr-6 pt-4 md:pt-0">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-base">
                <AlertCircle className="w-5 h-5" />
                <span>Geleneksel / Parçalı Yöntem</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Betoncu, çelikçi, çatıcı, tesisatçıyla ayrı ayrı pazarlık ve iletişim stresi.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Bir ustanın hatasını diğeri düzeltmez; işler gecikir ve maliyet katlanır.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Öngörülemeyen ek masraflar ve kontrolsüz malzeme israfı.</span>
                </li>
              </ul>
            </div>

            {/* Gökçe İnşaat Yöntemi */}
            <div className="space-y-4 pl-0 md:pl-8 pt-6 md:pt-0">
              <div className="flex items-center space-x-2 text-brand-600 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Gökçe İnşaat ve Yapı Modeli</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Tek sözleşme, tek muhatap ve baştan sona profesyonel tek ekip.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Taahhüt edilen takvimde, 81 ilde gecikme olmadan anahtar teslim tamamlama.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Şeffaf sözleşmeli fiyat güvencesi ile bütçeniz asla aşılmaz.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5 Step Timeline Vertical Deep Dive */}
        <div className="space-y-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card hover:border-brand-500 transition-all flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Step Num & Icon */}
                <div className="flex items-center space-x-4 md:flex-col md:space-x-0 md:space-y-3 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-anthracite-950 text-brand-400 flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="font-heading font-black text-2xl text-brand-600/40">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                      Adım {idx + 1}
                    </span>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-sm font-semibold text-brand-700">
                      {step.headline}
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-800 mb-2">Bu Aşamada Ne Yapıyoruz?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center space-x-2 text-xs text-slate-700 bg-surface-soft p-3 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl max-w-4xl mx-auto border border-anthracite-800">
          <h3 className="font-heading font-black text-2xl sm:text-3xl">
            Projenizi Birlikte Planlayalım
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            İhtiyaçlarınızı dinlemek ve ücretsiz keşif raporu hazırlamak için hazırız.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2"
            >
              <span>Ücretsiz Teklif Al</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.defaultWhatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm"
            >
              <span>WhatsApp'tan Yazın</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
