"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle2, MessageSquare, Sparkles, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { calculateEstimatedCost, PRICING_CONFIG } from "@/config/pricing";

const PRESETS = {
  "besi-25": {
    name: "25 Başlık Standart Çiftlik (Model A-E)",
    type: "Besi / Süt Çiftliği",
    capacity: "25 Baş Büyükbaş",
    areaNum: 150,
    area: "150 m²",
    dimensions: "15m × 10m",
    landNeed: "En az 1.500 m²",
    duration: "4 - 5 Hafta",
    highlight: "Merkezi yemleme koridoru + Doğal havalandırma + Donmaz suluklar",
    slug: "25-baslik-c-modeli-celik",
  },
  "besi-50": {
    name: "50 Başlık Modern Çiftlik (Model A-E)",
    type: "Besi / Süt Çiftliği",
    capacity: "50 Baş Büyükbaş",
    areaNum: 300,
    area: "300 m²",
    dimensions: "25m × 12m",
    landNeed: "En az 2.500 m²",
    duration: "5 - 6 Hafta",
    highlight: "Traktör yemleme yolu + Doğal baca havalandırma + Galvaniz kilitler",
    slug: "50-baslik-c-modeli-celik",
  },
  "besi-75": {
    name: "75 Başlık Profesyonel Çiftlik (Model A-E)",
    type: "Besi / Süt Çiftliği",
    capacity: "75 Baş Büyükbaş",
    areaNum: 420,
    area: "420 m²",
    dimensions: "35m × 12m",
    landNeed: "En az 4.000 m²",
    duration: "6 - 7 Hafta",
    highlight: "Geniş padok gruplaması + Otomatik sıyırıcı kanalı + Revir bölmesi",
    slug: "75-baslik-c-modeli-celik",
  },
  "besi-100": {
    name: "100 Başlık Endüstriyel Çiftlik (Model A-E)",
    type: "Besi / Süt Çiftliği",
    capacity: "100 Baş Büyükbaş",
    areaNum: 600,
    area: "600 m²",
    dimensions: "50m × 12m",
    landNeed: "En az 6.000 m²",
    duration: "7 - 8 Hafta",
    highlight: "Çift taraflı yemleme + 16 Bağımsız Padok + Ağır çelik karkas",
    slug: "100-baslik-c-modeli-celik",
  },
  "ev-110": {
    name: "110 m² 2+1 Anahtar Teslim Ev",
    type: "Konut / Müstakil Ev",
    capacity: "2+1 Plan",
    areaNum: 110,
    area: "110 m²",
    dimensions: "11m × 10m",
    landNeed: "İmar durumuna uygun arsa",
    duration: "6 - 8 Hafta",
    highlight: "A Sınıfı Taş Yünü Mantolama + 3 Camlı Isıcam + Mutfak & Banyo Hazır",
    slug: "110-m2-anahtar-teslim-ev",
  },
  "ev-160": {
    name: "160 m² 3+1 Çiftlik Konutu / Villa",
    type: "Konut / Villa",
    capacity: "3+1 Plan + Ebeveyn Banyosu",
    areaNum: 160,
    area: "160 m²",
    dimensions: "14m × 12m",
    landNeed: "İmar durumuna uygun arsa",
    duration: "8 - 10 Hafta",
    highlight: "Geniş Veranda + Şömine Altyapısı + Kiler + Lüks İnce İşçilik",
    slug: "160-m2-ciftlik-evi-villa",
  },
};

type PresetKey = keyof typeof PRESETS;

export default function QuickEstimator() {
  const [selectedKey, setSelectedKey] = useState<PresetKey>("besi-100");
  const current = PRESETS[selectedKey];

  const whatsappMessage = `Merhaba, ${current.name} (${current.dimensions} - ${current.area}) projeniz için arsam/şehrim hakkında bilgi ve anahtar teslim maliyet teklifi almak istiyorum.`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-anthracite-950 to-anthracite-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Hızlı Proje & Kapasite Planlayıcı</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            İhtiyacınıza Uygun Standart Modeli Seçin
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Hayvan kapasitenize göre standart mimari yapı ölçülerini (15m×10m, 25m×12m, 35m×12m, 50m×12m) ve Türkiye geneli teslim süresini inceleyin.
          </p>
        </div>

        {/* Interactive Selector Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <button
            onClick={() => setSelectedKey("besi-25")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedKey === "besi-25"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-105"
                : "bg-anthracite-800/80 text-slate-300 hover:bg-anthracite-700 hover:text-white"
            }`}
          >
            25 Baş (150 m²)
          </button>

          <button
            onClick={() => setSelectedKey("besi-50")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedKey === "besi-50"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-105"
                : "bg-anthracite-800/80 text-slate-300 hover:bg-anthracite-700 hover:text-white"
            }`}
          >
            50 Baş (300 m²)
          </button>

          <button
            onClick={() => setSelectedKey("besi-75")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedKey === "besi-75"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-105"
                : "bg-anthracite-800/80 text-slate-300 hover:bg-anthracite-700 hover:text-white"
            }`}
          >
            75 Baş (420 m²)
          </button>

          <button
            onClick={() => setSelectedKey("besi-100")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedKey === "besi-100"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-105"
                : "bg-anthracite-800/80 text-slate-300 hover:bg-anthracite-700 hover:text-white"
            }`}
          >
            100 Baş (600 m²)
          </button>

          <button
            onClick={() => setSelectedKey("ev-110")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedKey === "ev-110"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-105"
                : "bg-anthracite-800/80 text-slate-300 hover:bg-anthracite-700 hover:text-white"
            }`}
          >
            110 m² 2+1 Ev
          </button>

          <button
            onClick={() => setSelectedKey("ev-160")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedKey === "ev-160"
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-105"
                : "bg-anthracite-800/80 text-slate-300 hover:bg-anthracite-700 hover:text-white"
            }`}
          >
            160 m² 3+1 Villa
          </button>
        </div>

        {/* Calculation Result Card */}
        <div className="bg-anthracite-900/95 border border-anthracite-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Left: Main Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-md bg-brand-600/20 text-brand-400 text-xs font-bold uppercase">
                  {current.type}
                </span>
                <span className="text-slate-400 text-xs flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-brand-400" />
                  Türkiye Geneli 81 İl
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                {current.name}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-anthracite-950/90 border border-anthracite-800">
                  <p className="text-[11px] text-slate-400 font-medium">Toplam Kapalı Alan</p>
                  <p className="text-base sm:text-lg font-bold text-brand-400">{current.area}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-anthracite-950/90 border border-anthracite-800">
                  <p className="text-[11px] text-slate-400 font-medium">Yapı Ölçüleri</p>
                  <p className="text-base sm:text-lg font-bold text-white">{current.dimensions}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-anthracite-950/90 border border-anthracite-800 col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-slate-400 font-medium">Tahmini Teslim Süresi</p>
                  <p className="text-base sm:text-lg font-bold text-white">{current.duration}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-anthracite-950/60 border border-anthracite-800/60 flex items-start space-x-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Standart Donatılar:</strong> {current.highlight}
                </span>
              </div>
            </div>

            {/* Right: Quick Action CTAs */}
            <div className="flex flex-col space-y-3 bg-anthracite-950/90 p-5 rounded-2xl border border-anthracite-800">
              {(() => {
                const quickCalc = calculateEstimatedCost(current.areaNum, "Çelik");
                return (
                  <div className="p-3.5 bg-brand-950/60 rounded-xl border border-brand-500/30 text-center space-y-1">
                    <span className="text-[10px] text-brand-300 font-extrabold uppercase tracking-wider block">
                      Tahmini Yapım Maliyeti
                    </span>
                    <span className="text-xl font-black text-white block">
                      {quickCalc.totalCostFormatted}
                    </span>
                    <span className="text-[10px] text-brand-400 font-semibold block">
                      {quickCalc.calculationText}
                    </span>
                  </div>
                );
              })()}

              <p className="text-[11px] text-slate-300 font-medium text-center">
                Şehriniz ve arsanız için net maliyet tablosu isteyin:
              </p>

              <Link
                href={`/teklif-al?proje=${current.slug}&kapasite=${encodeURIComponent(current.capacity)}`}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-sm text-center shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Fiyat Teklifi İste</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs text-center transition-all flex items-center justify-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp’tan Bilgi Al</span>
              </a>

              <Link
                href={`/projeler`}
                className="text-xs text-brand-400 hover:text-brand-300 text-center underline transition-colors pt-1"
              >
                Model Kataloğunu İncele →
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
