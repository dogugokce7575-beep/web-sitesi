import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, CheckCircle2, ArrowRight, MapPin, Key } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AboutSnippet() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Clear Text Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
              <Building2 className="w-3.5 h-3.5 text-brand-600" />
              <span>Kısaca Gökçe İnşaat ve Yapı</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Hayvancılıkta 100 Yıllık Tecrübe, <br className="hidden sm:inline" />
              <span className="text-brand-600">İnşaatta 40 Yıllık Deneyim.</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Gökçe İnşaat ve Yapı olarak hayvancılık alanındaki köklü tecrübemizi, 40 yıllık inşaat deneyimimizle birleştiriyoruz. Çiftlikten ahıra, yem deposundan gübre çukuruna kadar ihtiyaçları doğru planlayarak, işlevsel ve uzun ömürlü yapılar oluşturuyoruz.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Merkezimiz Ardahan'da bulunmakla birlikte, mobil şantiye filomuz ve montaj ekiplerimizle Türkiye'nin tüm illerinde zemin betonundan çatıya kadar tek elden, sözleşmeli net maliyet garantisiyle hizmet veriyoruz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2.5 text-xs text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Tek sözleşme, tek muhatap</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Sözleşmeli şeffaf bütçe</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>81 İlde mobil şantiye</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Zamanında anahtar teslim</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/hakkimizda"
                className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-brand-600 transition-colors"
              >
                <span>Kurumsal İlkelerimiz ve Hakkımızda</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Blueprint Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-200 bg-slate-900 group">
              <img
                src="/images/architectural-blueprint.jpg"
                alt="Gökçe İnşaat ve Yapı Mimari Proje ve Saha Uygulaması"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center space-x-2 text-brand-400 text-xs font-bold uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Mühendislik & Statik Proje Güvencesi</span>
                </div>
                <p className="text-sm font-bold">
                  3D CAD Tasarım, Zemin Etüdü ve Türkiye Geneli Saha Uygulaması
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
