"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Calculator, 
  Ruler, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Info, 
  ShieldCheck, 
  Sparkles,
  Building2
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { PRICING_CONFIG, formatPrice, formatUnitCost } from "@/config/pricing";

export type CustomBuildingSystem = "prefabrik" | "celik" | "betonarme";

interface SystemChoice {
  id: CustomBuildingSystem;
  title: string;
  badge: string;
  unitCost: number;
  desc: string;
}

const SYSTEMS: SystemChoice[] = [
  {
    id: "prefabrik",
    title: "Prefabrik Yapı",
    badge: "Hızlı Kurulum",
    unitCost: PRICING_CONFIG.prefabrikUnitCost, // 10.000 TL/m²
    desc: "Fabrikasyon prekast kolon ve kiriş elemanları ile hızlı ve ekonomik kurulum.",
  },
  {
    id: "celik",
    title: "Ağır Çelik Konstrüksiyon",
    badge: "En Çok Tercih Edilen",
    unitCost: PRICING_CONFIG.celikUnitCost, // 11.000 TL/m²
    desc: "Geniş kolonsuz açıklık, yüksek tavan ve deprem/kar yüküne maksimum mukavemet.",
  },
  {
    id: "betonarme",
    title: "Betonarme Yapı",
    badge: "Maksimum Ömür",
    unitCost: PRICING_CONFIG.betonarmeUnitCost, // 12.000 TL/m²
    desc: "Yerinde döküm C25/30 donatılı betonarme karkas, yüksek kütlesel dayanım.",
  },
];

export default function CustomPriceCalculator() {
  const [lengthInput, setLengthInput] = useState<string>("40");
  const [widthInput, setWidthInput] = useState<string>("20");
  const [selectedSystem, setSelectedSystem] = useState<CustomBuildingSystem>("celik");

  // Parse length & width (support decimals, validate > 0)
  const length = useMemo(() => {
    const val = parseFloat(lengthInput.replace(",", "."));
    return !isNaN(val) && val > 0 ? val : 0;
  }, [lengthInput]);

  const width = useMemo(() => {
    const val = parseFloat(widthInput.replace(",", "."));
    return !isNaN(val) && val > 0 ? val : 0;
  }, [widthInput]);

  // Total Area (m²)
  const totalArea = useMemo(() => {
    if (length <= 0 || width <= 0) return 0;
    return Math.round(length * width * 100) / 100;
  }, [length, width]);

  // Current System Info
  const activeSystem = useMemo(() => {
    return SYSTEMS.find((s) => s.id === selectedSystem) || SYSTEMS[1];
  }, [selectedSystem]);

  // Estimated Cost
  const estimatedCost = useMemo(() => {
    if (totalArea <= 0) return 0;
    return Math.round(totalArea * activeSystem.unitCost);
  }, [totalArea, activeSystem]);

  // URLs
  const quoteUrl = useMemo(() => {
    const params = new URLSearchParams({
      proje: "Özel Ölçü Proje",
      kapasite: `Özel Ölçü (${length}m × ${width}m)`,
      model: "Özel Planlama",
      sistem: activeSystem.title,
      olcu: `${length} × ${width} m`,
      alan: `${totalArea} m²`,
      fiyat: `${formatPrice(estimatedCost)} TL`,
    });
    return `/teklif-al?${params.toString()}`;
  }, [length, width, totalArea, activeSystem, estimatedCost]);

  const whatsappMessage = `Merhaba, ${length} m × ${width} m ölçülerinde toplam ${totalArea} m² ${activeSystem.title} yapı için bilgi ve teklif almak istiyorum.`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10 space-y-8">
      
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200 mb-2">
            <Ruler className="w-3.5 h-3.5 text-brand-600" />
            <span>Serbest Metraj Hesabı</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Özel Ölçü ile <span className="text-brand-600">Fiyat Hesaplama</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Hazır model seçmeden, kendi arsanızın uzunluk ve genişlik ölçülerini girerek yaklaşık anahtar teslim maliyetinizi anında hesaplayın.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 bg-surface-soft px-3 py-2 rounded-xl border border-slate-200 shrink-0">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Anlık Otomatik Hesaplama</span>
        </div>
      </div>

      {/* Input Grid: Length + Width + Instant Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Uzunluk */}
        <div className="space-y-2 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
          <label className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>UZUNLUK (Metre)</span>
            <span className="text-[11px] text-brand-600 font-semibold">Örn: 40</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="0.5"
              value={lengthInput}
              onChange={(e) => setLengthInput(e.target.value)}
              placeholder="40"
              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-300 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              Metre
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Yapının parsel üzerindeki boylamasına toplam aks mesafesi.
          </p>
        </div>

        {/* Genişlik */}
        <div className="space-y-2 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
          <label className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>GENİŞLİK (Metre)</span>
            <span className="text-[11px] text-brand-600 font-semibold">Örn: 20</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="0.5"
              value={widthInput}
              onChange={(e) => setWidthInput(e.target.value)}
              placeholder="20"
              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-300 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              Metre
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Yapının makas ve çatı yönündeki enlemesine dıştan dışa genişliği.
          </p>
        </div>

        {/* Toplam Alan Göstergesi */}
        <div className="space-y-2 bg-gradient-to-br from-brand-50 to-orange-50/50 p-5 rounded-2xl border border-brand-200/80 flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-800 block">
              TOPLAM ALAN (m²)
            </span>
            <p className="text-[11px] text-brand-700 mt-0.5">
              Uzunluk × Genişlik Formülü
            </p>
          </div>

          <div className="my-1">
            <div className="flex items-baseline space-x-2">
              <span className="font-heading font-black text-3xl sm:text-4xl text-brand-600">
                {totalArea > 0 ? totalArea.toLocaleString("tr-TR") : "0"}
              </span>
              <span className="font-bold text-base text-brand-900">m²</span>
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              {length > 0 && width > 0 ? `${length} m × ${width} m = ${totalArea} m²` : "Ölçüleri girin"}
            </p>
          </div>

          <div className="text-[11px] text-brand-700 flex items-center space-x-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span>Net Taban Oturumu</span>
          </div>
        </div>

      </div>

      {/* Yapı Sistemi Seçimi */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-600" />
            <span>Yapı Sistemi Seçin</span>
          </label>
          <span className="text-xs text-slate-500">Merkezi m² birim maliyeti uygulanır</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SYSTEMS.map((sys) => {
            const isSelected = selectedSystem === sys.id;
            return (
              <button
                key={sys.id}
                type="button"
                onClick={() => setSelectedSystem(sys.id)}
                className={`p-5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? "border-brand-600 bg-brand-50/40 shadow-md ring-2 ring-brand-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shadow">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}

                <div className="space-y-1.5 pr-6">
                  <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider bg-brand-100/70 px-2 py-0.5 rounded">
                    {sys.badge}
                  </span>
                  <h3 className="font-heading font-bold text-base text-slate-900 mt-1">
                    {sys.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {sys.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-baseline justify-between">
                  <span className="text-xs text-slate-500 font-medium">Birim Fiyat:</span>
                  <span className="font-heading font-bold text-sm text-slate-900">
                    {formatUnitCost(sys.unitCost)} / m²
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sonuç Kartı */}
      <div className="bg-anthracite-950 text-white rounded-3xl p-6 sm:p-8 border border-anthracite-800 shadow-premium space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-anthracite-800/80 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              ÖZEL ÖLÇÜ HESAPLAMA ÖZETİ
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
              Tahmini Anahtar Teslim Yapım Maliyeti
            </h3>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-xs text-slate-400 block">Tahmini Bütçe</span>
            <span className="font-heading font-black text-3xl sm:text-4xl text-gradient-orange">
              {estimatedCost > 0 ? `${formatPrice(estimatedCost)} TL` : "0 TL"}
            </span>
          </div>
        </div>

        {/* 6 Parametreli Tablo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-anthracite-900/90 rounded-xl border border-anthracite-800">
            <span className="text-slate-400 block text-[11px]">UZUNLUK</span>
            <span className="font-bold text-sm text-white">{length} m</span>
          </div>

          <div className="p-3 bg-anthracite-900/90 rounded-xl border border-anthracite-800">
            <span className="text-slate-400 block text-[11px]">GENİŞLİK</span>
            <span className="font-bold text-sm text-white">{width} m</span>
          </div>

          <div className="p-3 bg-anthracite-900/90 rounded-xl border border-anthracite-800">
            <span className="text-slate-400 block text-[11px]">TOPLAM ALAN</span>
            <span className="font-bold text-sm text-brand-400">{totalArea} m²</span>
          </div>

          <div className="p-3 bg-anthracite-900/90 rounded-xl border border-anthracite-800">
            <span className="text-slate-400 block text-[11px]">YAPI SİSTEMİ</span>
            <span className="font-bold text-sm text-white truncate block">{activeSystem.title}</span>
          </div>

          <div className="p-3 bg-anthracite-900/90 rounded-xl border border-anthracite-800">
            <span className="text-slate-400 block text-[11px]">BİRİM FİYAT</span>
            <span className="font-bold text-sm text-slate-200">{formatUnitCost(activeSystem.unitCost)} / m²</span>
          </div>

          <div className="p-3 bg-brand-950/80 rounded-xl border border-brand-800/60">
            <span className="text-brand-300 block text-[11px]">TAHMİNİ MALİYET</span>
            <span className="font-bold text-sm text-brand-400 truncate block">
              {estimatedCost > 0 ? `${formatPrice(estimatedCost)} TL` : "0 TL"}
            </span>
          </div>
        </div>

        {/* Fiyat Uyarı Metni */}
        <div className="p-4 rounded-2xl bg-anthracite-900/70 border border-anthracite-800/80 flex items-start space-x-3 text-xs text-slate-400 leading-relaxed">
          <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <p>
            Bu hesaplama tahmini yapım maliyetini gösterir. Nihai fiyat; proje detayları, zemin koşulları, malzeme tercihleri, lokasyon, altyapı ve uygulama kapsamına göre kesinleştirilir.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href={quoteUrl}
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-sm text-center shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <span>BU PROJE İÇİN TEKLİF AL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-bold text-sm text-center shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WHATSAPP'TAN BİLGİ AL</span>
          </a>
        </div>

      </div>

    </div>
  );
}
