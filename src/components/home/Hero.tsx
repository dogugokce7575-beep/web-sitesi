import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Key, Ruler, MapPin, CheckCircle2, MessageSquare, Calculator } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.defaultWhatsappMessage
  )}`;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-anthracite-950 text-white overflow-hidden">
      {/* High-Resolution Local Architectural Photography Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-farm.jpg"
          alt="Modern Çiftlik ve Yapı Projeleri - Gökçe İnşaat ve Yapı"
          className="w-full h-full object-cover object-center scale-105 transform animate-fadeIn opacity-40 filter brightness-105 contrast-105"
        />
        {/* Clean Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950 via-anthracite-950/85 to-anthracite-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950 via-transparent to-anthracite-950/80" />
        <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:pt-32 lg:pb-20 my-auto flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Core Trust Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tag Pill */}
            <div className="inline-flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/40 backdrop-blur-md text-brand-400 text-xs sm:text-sm font-bold shadow-inner">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                <span>Türkiye Geneli Anahtar Teslim Yapı Hizmeti</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-slate-200 text-xs font-semibold">
                <span className="text-brand-400 font-bold">100 Yıl</span> Hayvancılık • <span className="text-brand-400 font-bold">40 Yıl</span> İnşaat
              </div>
            </div>

            {/* Exact Brand Trust Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              Doğru Proje. <br />
              <span className="text-gradient-orange">
                Şeffaf Fiyat.
              </span>{" "}
              Anahtar Teslim Çözüm.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              Gökçe İnşaat ve Yapı; ev, ahır, besi çiftliği ve farklı yapı projelerini Türkiye genelinde planlar, uygular ve anahtar teslim olarak teslim eder.
            </p>

            {/* Clean Trust Strip */}
            <div className="p-4 bg-anthracite-900/90 border-l-4 border-brand-500 rounded-r-xl backdrop-blur-sm shadow-md flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                “Projenizi biz planlayalım, biz uygulayalım, siz sonucu görün.”
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/teklif-al"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-brand-600 hover:bg-brand-500 active:scale-95 shadow-xl shadow-brand-600/30 transition-all duration-200 group"
              >
                <span>Ücretsiz Teklif Al</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/ciftlik-fiyatlari"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-bold text-slate-100 hover:text-white bg-anthracite-900/90 hover:bg-anthracite-800 border border-slate-700/80 backdrop-blur-md transition-all duration-200"
              >
                <Calculator className="w-4 h-4 mr-2 text-brand-400" />
                <span>Model & Fiyat Listesi</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-bold text-white bg-emerald-700/90 hover:bg-emerald-600 border border-emerald-600/50 backdrop-blur-md active:scale-95 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-emerald-300" />
                <span>WhatsApp’tan Bilgi Al</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Architectural Showcase Frame */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/80 bg-slate-900 group">
              <img
                src="/images/beef-farm-c.jpg"
                alt="Modern Besi Çiftliği İç Görünüm ve Yem Yolu"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Standart Model C — 50/100 Baş</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <p className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider">
                  4.20m Traktör Yem Yolu + Donmaz Suluk
                </p>
                <p className="text-sm font-bold text-slate-100">
                  Doğal Baca Havalandırmalı Ağır Çelik Karkas Tesis
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Trust Indicators Strip (Hero Footer) */}
      <div className="relative z-10 w-full bg-anthracite-900/95 border-t border-anthracite-800 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          
          <div className="flex items-center space-x-3 text-slate-200">
            <div className="w-11 h-11 rounded-xl bg-anthracite-800 flex items-center justify-center text-brand-400 shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Anahtar Teslim</p>
              <p className="text-xs text-slate-400">Tek elden eksiksiz teslimat</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-200">
            <div className="w-11 h-11 rounded-xl bg-anthracite-800 flex items-center justify-center text-brand-400 shrink-0">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Proje + Uygulama</p>
              <p className="text-xs text-slate-400">Mimari ve statik mühendislik</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-200">
            <div className="w-11 h-11 rounded-xl bg-anthracite-800 flex items-center justify-center text-brand-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Türkiye Geneli Hizmet</p>
              <p className="text-xs text-slate-400">81 ilde mobil şantiye</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-200">
            <div className="w-11 h-11 rounded-xl bg-anthracite-800 flex items-center justify-center text-brand-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Şeffaf Fiyat</p>
              <p className="text-xs text-slate-400">Sözleşmeli net maliyet</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
