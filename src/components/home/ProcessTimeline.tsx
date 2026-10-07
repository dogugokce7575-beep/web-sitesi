import React from "react";
import Link from "next/link";
import { 
  PhoneCall, 
  Compass, 
  FileCheck2, 
  HardHat, 
  Key, 
  ArrowRight, 
  ShieldCheck 
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      icon: PhoneCall,
      title: "İhtiyacınızı Dinliyoruz",
      desc: "Arazinizi, hayvan kapasitenizi veya konut talebinizi analiz ediyor; hedef bütçenize göre ön fizibilite yapıyoruz.",
    },
    {
      num: "02",
      icon: Compass,
      title: "Projeyi Planlıyoruz",
      desc: "Bölgenin iklim koşullarına uygun mimari, statik mukavemet, havalandırma ve traktör yemleme planlarını hazırlıyoruz.",
    },
    {
      num: "03",
      icon: FileCheck2,
      title: "Maliyet ve Teklifi Oluşturuyoruz",
      desc: "Sürpriz ek maliyetler çıkarmayan, malzeme ve işçilik kalemleri şeffaf anahtar teslim teklif ve sözleşmemizi sunuyoruz.",
    },
    {
      num: "04",
      icon: HardHat,
      title: "İnşaata Başlıyoruz",
      desc: "Zemin hafriyatı, temel betonu, çelik karkas montajı ve çatı kaplamasını tek elden, planlanan takvimde yürütüyoruz.",
    },
    {
      num: "05",
      icon: Key,
      title: "Anahtar Teslim Teslim Ediyoruz",
      desc: "Tüm sistemleri (suluk, aydınlatma, padoklar, kapılar) eksiksiz test ederek yapınızı hemen kullanıma hazır teslim ediyoruz.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Adım Adım Anahtar Teslim Güvencesi</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Süreç Sandığınızdan <span className="text-brand-600">Daha Kolay.</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Tek tek ustalarla uğraşmayın. Projenizin başından sonuna kadar tek muhatapla, şeffaf ve güvenli bir süreç yaşayın.
          </p>
        </div>

        {/* Timeline Grid (5 Steps) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-surface-soft rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Step Number Watermark / Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-heading text-slate-300 group-hover:text-brand-600 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-anthracite-950 text-brand-400 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center shadow-md transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] font-bold text-brand-700">
                  <span>Adım {index + 1} / 5</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="mt-14 max-w-4xl mx-auto bg-anthracite-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-anthracite-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Hemen Bugün İlk Adımı Atalım
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm">
              Uzman ekibimiz arazinizi ve projenizi ücretsiz değerlendirsin.
            </p>
          </div>

          <Link
            href="/teklif-al"
            className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all flex items-center space-x-2 shrink-0"
          >
            <span>Ücretsiz Teklif Formunu Doldur</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
