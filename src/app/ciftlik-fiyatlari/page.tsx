"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  RotateCcw,
  Check,
  Key,
  Layers,
  Sparkles,
  Info,
  Ruler
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";
import CustomPriceCalculator from "@/components/pricing/CustomPriceCalculator";
import { 
  STEP_CAPACITY_OPTIONS,
  STEP_MODEL_OPTIONS,
  STEP_SYSTEM_OPTIONS,
  CAPACITY_CONFIG,
  calculateStepPrice,
  TURNKEY_PRICE_INCLUSIONS,
  StepModelOption,
  StepSystemOption
} from "@/config/pricing";

function FarmPricingContent() {
  const searchParams = useSearchParams();

  // 1. AŞAMA: Kapasite (25 - 250 Baş)
  const [capacity, setCapacity] = useState<number | null>(50);

  // 2. AŞAMA: Model (A, B, C, D, E)
  const [modelCode, setModelCode] = useState<"A" | "B" | "C" | "D" | "E" | null>("B");

  // 3. AŞAMA: Yapı Sistemi (Prefabrik, Ağır Çelik, Betonarme)
  const [systemId, setSystemId] = useState<"prefabrik" | "celik" | "betonarme" | null>("celik");

  // Aktif Adım: 1 (Kapasite) -> 2 (Model) -> 3 (Yapı Sistemi) -> 4 (Fiyat / Sonuç)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Hesaplama Modu: "step" (Standart Çiftlik Modelleri) | "custom" (Özel Ölçü ile Fiyat Hesaplama)
  const [calculatorMode, setCalculatorMode] = useState<"step" | "custom">("step");

  // URL'den gelen model, kapasite ve mod parametrelerini algıla
  useEffect(() => {
    if (!searchParams) return;
    const qMod = searchParams.get("mod");
    if (qMod === "ozel") {
      setCalculatorMode("custom");
    } else if (qMod === "standart") {
      setCalculatorMode("step");
    }

    const qModel = searchParams.get("model");
    const qKapasite = searchParams.get("kapasite");

    if (qModel) {
      const upper = qModel.toUpperCase();
      if (["A", "B", "C", "D", "E"].includes(upper)) {
        setModelCode(upper as "A" | "B" | "C" | "D" | "E");
      }
    }

    if (qKapasite) {
      const parsed = parseInt(qKapasite, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setCapacity(parsed);
      }
    }
  }, [searchParams]);

  // Dinamik Fiyat ve Ölçü Hesaplama Sonucu
  const calculation = useMemo(() => {
    return calculateStepPrice(capacity, modelCode, systemId);
  }, [capacity, modelCode, systemId]);

  // WhatsApp Yönlendirme Linki
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    calculation.whatsappMessage || "Merhaba, çiftlik projesi ve anahtar teslim yapım maliyeti hakkında bilgi almak istiyorum."
  )}`;

  // Adım geçiş kontrolleri
  const handleSelectCapacity = (cap: number) => {
    setCapacity(cap);
    setCurrentStep(2);
  };

  const handleSelectModel = (code: "A" | "B" | "C" | "D" | "E") => {
    setModelCode(code);
    setCurrentStep(3);
  };

  const handleSelectSystem = (sysId: "prefabrik" | "celik" | "betonarme") => {
    setSystemId(sysId);
    setCurrentStep(4);
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Kademeli Fiyat Hesaplama" }]} />

        {/* Hero Header */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-12 mb-8 relative overflow-hidden shadow-premium border border-anthracite-800">
          <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>3 Aşamalı Kademeli Fiyat Sistemi</span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              Çiftlik Modelleri ve <br />
              <span className="text-gradient-orange">Kademeli Fiyat Hesaplama</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Kapasite, model ve yapı sisteminizi adım adım belirleyin; projenizin net ölçülerini ve tahmini anahtar teslim yapım maliyetini anında görün.
            </p>
          </div>
        </div>

        {/* Hesaplama Modu Seçici (Kademeli Model Hesaplama vs Özel Ölçü Hesaplama) */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setCalculatorMode("step")}
            className={`w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
              calculatorMode === "step"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-500" />
            <span>1. Standart Çiftlik Modelleri (Kademeli)</span>
          </button>

          <button
            type="button"
            onClick={() => setCalculatorMode("custom")}
            className={`w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
              calculatorMode === "custom"
                ? "bg-brand-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Ruler className="w-4 h-4 text-white sm:text-brand-600" />
            <span>2. Özel Ölçü ile Fiyat Hesaplama (Serbest Metraj)</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* MOD 2: ÖZEL ÖLÇÜ HESAPLAMA (UZUNLUK x GENİŞLİK x m² BİRİM FİYAT) */}
        {/* ========================================================================= */}
        {calculatorMode === "custom" && (
          <div className="space-y-8 mb-12">
            <CustomPriceCalculator />

            {/* Switch to Step Prompt */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <strong className="text-slate-900">Standart modelleri mi incelemek istiyorsunuz?</strong>
                <p className="mt-0.5">25 Baş'tan 250 Baş'a A, B, C, D, E modellerimizin hazır aks ölçüleriyle adım adım hesaplama yapabilirsiniz.</p>
              </div>
              <button
                type="button"
                onClick={() => setCalculatorMode("step")}
                className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-brand-600 transition-colors flex items-center space-x-1"
              >
                <span>Kademeli Hesaplayıcıya Geç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MOD 1: STANDART KADEMELİ HESAPLAYICI (01 Kapasite -> 02 Model -> 03 Sistem) */}
        {/* ========================================================================= */}
        {calculatorMode === "step" && (
          <>
            {/* Stepper Progress Header */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-card mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Step 1 Tab */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`p-3 rounded-xl text-left transition-all border ${
                currentStep === 1
                  ? "bg-brand-50 border-brand-500 text-brand-700 shadow-sm"
                  : currentStep > 1
                  ? "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                  : "bg-slate-50/50 border-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-black uppercase tracking-wider">01 Kapasite</span>
                {capacity && currentStep > 1 && (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">
                {capacity ? `${capacity} Baş` : "Kapasite Seçin"}
              </div>
            </button>

            {/* Step 2 Tab */}
            <button
              onClick={() => capacity && setCurrentStep(2)}
              disabled={!capacity}
              className={`p-3 rounded-xl text-left transition-all border ${
                currentStep === 2
                  ? "bg-brand-50 border-brand-500 text-brand-700 shadow-sm"
                  : currentStep > 2
                  ? "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                  : "bg-slate-50/50 border-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-black uppercase tracking-wider">02 Model</span>
                {modelCode && currentStep > 2 && (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">
                {modelCode ? `Model ${modelCode}` : "Model Seçin"}
              </div>
            </button>

            {/* Step 3 Tab */}
            <button
              onClick={() => capacity && modelCode && setCurrentStep(3)}
              disabled={!capacity || !modelCode}
              className={`p-3 rounded-xl text-left transition-all border ${
                currentStep === 3
                  ? "bg-brand-50 border-brand-500 text-brand-700 shadow-sm"
                  : currentStep > 3
                  ? "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                  : "bg-slate-50/50 border-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-black uppercase tracking-wider">03 Yapı Sistemi</span>
                {systemId && currentStep > 3 && (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">
                {systemId === "celik" ? "Ağır Çelik" : systemId === "prefabrik" ? "Prefabrik" : systemId === "betonarme" ? "Betonarme" : "Sistem Seçin"}
              </div>
            </button>

            {/* Step 4 Tab */}
            <button
              onClick={() => capacity && modelCode && systemId && setCurrentStep(4)}
              disabled={!capacity || !modelCode || !systemId}
              className={`p-3 rounded-xl text-left transition-all border ${
                currentStep === 4
                  ? "bg-brand-50 border-brand-500 text-brand-700 shadow-sm"
                  : "bg-slate-50/50 border-slate-100 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-black uppercase tracking-wider">04 Fiyat</span>
                {currentStep === 4 && (
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                )}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">
                {currentStep === 4 ? "Hesaplandı" : "Maliyet Gör"}
              </div>
            </button>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. AŞAMA — HAYVAN KAPASİTESİ */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card mb-8">
            <div className="mb-6 space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">
                1. Aşama — Hayvan Kapasitesi
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                Kaç Başlık Bir Proje Planlıyorsunuz?
              </h2>
              <p className="text-slate-600 text-sm">
                25 baştan 250 başa kadar işletme büyüklüğünüze en uygun kapasiteyi seçin.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 mb-8">
              {STEP_CAPACITY_OPTIONS.map((cap) => {
                const isSelected = capacity === cap;
                const lengthVal = CAPACITY_CONFIG[cap];
                
                return (
                  <button
                    key={cap}
                    onClick={() => handleSelectCapacity(cap)}
                    className={`relative p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-lg sm:text-xl font-black ${isSelected ? "text-brand-700" : "text-slate-900"}`}>
                          {cap} Baş
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <div className="text-[11px] font-medium text-slate-500">
                        {lengthVal !== null ? (
                          <span className="text-slate-700 font-semibold">{lengthVal} metre uzunluk</span>
                        ) : (
                          <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">Özel Ölçü</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                      <span className={isSelected ? "text-brand-600" : "text-slate-400"}>
                        {isSelected ? "Seçildi" : "Seç"}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-brand-600" : "text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Seçim yaptığınızda otomatik olarak Model Seçimi aşamasına geçilir.
              </span>
              {capacity && (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-sm flex items-center space-x-2"
                >
                  <span>Model Seçimine İlerle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. AŞAMA — MODEL SEÇİMİ */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card mb-8">
            <div className="mb-6 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-brand-600">
                  2. Aşama — Model Seçimi
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">
                  Seçilen Kapasite: <strong className="text-slate-900">{capacity} Baş</strong>
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                Nasıl Bir Sistem İstiyorsunuz?
              </h2>
              <p className="text-slate-600 text-sm">
                İşletme modelinize uygun mimari yaklaşımı seçin. Bina genişliği seçilen modele göre otomatik belirlenir.
              </p>
            </div>

            <div className="space-y-3.5 mb-8">
              {STEP_MODEL_OPTIONS.map((model) => {
                const isSelected = modelCode === model.code;

                return (
                  <button
                    key={model.code}
                    onClick={() => handleSelectModel(model.code)}
                    className={`w-full p-5 rounded-2xl border text-left transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-3">
                        <span className={`w-8 h-8 rounded-xl font-heading font-black text-sm flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-800"
                        }`}>
                          {model.code}
                        </span>
                        <div>
                          <h3 className="font-bold text-base text-slate-900">
                            {model.title}
                          </h3>
                        </div>
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          Genişlik: {model.width} m
                        </span>
                        {model.code === "E" && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            Özel Fiyat: 7.000 TL/m²
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 pl-11">
                        {model.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span className={`text-xs font-bold ${isSelected ? "text-brand-600" : "text-slate-400"}`}>
                        {isSelected ? "Seçildi" : "Seç"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kapasite Değiştir</span>
              </button>

              {modelCode && (
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-sm flex items-center space-x-2"
                >
                  <span>Yapı Sistemi Seçimine İlerle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. AŞAMA — YAPI SİSTEMİ SEÇİMİ */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card mb-8">
            <div className="mb-6 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-brand-600">
                  3. Aşama — Taşıyıcı Yapı Sistemi
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">
                  {capacity} Baş — Model {modelCode}
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                Yapı Sistemini Seçin
              </h2>
              <p className="text-slate-600 text-sm">
                Arazi yapınıza ve yatırım bütçenize uygun ana taşıyıcı konstrüksiyonu belirleyin.
              </p>
            </div>

            {/* Model E Özel Bilgilendirme Notu */}
            {modelCode === "E" && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3 text-emerald-900 text-xs sm:text-sm">
                <Info className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Model E (Açık Besi Modeli) Avantajı:</strong> Hangi yapı sistemi seçilirse seçilsin, açık besi mimarisine özel birim maliyet <strong>7.000 TL / m²</strong> olarak uygulanır.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {STEP_SYSTEM_OPTIONS.map((system) => {
                const isSelected = systemId === system.id;
                const effectiveCost = modelCode === "E" ? "7.000 TL / m²" : system.unitCostFormatted;

                return (
                  <button
                    key={system.id}
                    onClick={() => handleSelectSystem(system.id)}
                    className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-heading font-black text-lg text-slate-900">
                          {system.title}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <div className="inline-block px-3 py-1 rounded-lg bg-slate-900 text-white font-black text-xs mb-3">
                        {effectiveCost}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {system.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      <span className={isSelected ? "text-brand-600" : "text-slate-400"}>
                        {isSelected ? "Seçildi" : "Bu Sistemi Seç"}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${isSelected ? "text-brand-600" : "text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Model Değiştir</span>
              </button>

              {systemId && (
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-sm flex items-center space-x-2"
                >
                  <span>Hesapla ve Fiyatı Gör</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. AŞAMA — SONUÇ EKRANI & PROJE ÖZETİ */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-premium overflow-hidden mb-8">
            
            {/* Sonuç Kartı Üst Başlık */}
            <div className="bg-anthracite-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-anthracite-900">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-brand-600/30 border border-brand-500/40 text-brand-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-xl text-white">
                    Proje Özeti & Fiyat Bilgisi
                  </h2>
                  <p className="text-xs text-slate-400">
                    Seçtiğiniz parametreler doğrultusunda hesaplanan tahmini maliyet
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-anthracite-900 hover:bg-anthracite-800 border border-anthracite-800 text-xs font-semibold text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Seçimi Değiştir</span>
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-8">
              
              {/* PROJE ÖZETİ GRID */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">
                  PROJE ÖZETİ
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-surface-soft border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Seçilen Kapasite</span>
                    <span className="font-heading font-black text-lg text-slate-900">
                      {calculation.capacityText}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Seçilen Model</span>
                    <span className="font-heading font-bold text-base text-slate-900">
                      {calculation.modelOption?.title}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Seçilen Yapı Sistemi</span>
                    <span className="font-heading font-bold text-base text-slate-900">
                      {calculation.systemOption?.title}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Proje Ölçüsü</span>
                    <span className="font-bold text-base text-slate-900">
                      {calculation.dimensionsText}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Toplam Taban Alanı</span>
                    <span className="font-bold text-base text-brand-600">
                      {calculation.areaText}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">m² Birim Maliyeti</span>
                    <span className="font-bold text-base text-slate-900">
                      {calculation.unitCostFormatted}
                    </span>
                  </div>

                </div>
              </div>

              {/* TAHMİNİ YAPIM MALİYETİ KUTUSU */}
              <div className="p-6 sm:p-8 rounded-3xl bg-brand-50/70 border border-brand-200 text-center space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-brand-800">
                  TAHMİNİ YAPIM MALİYETİ
                </span>

                <div className="font-heading font-black text-3xl sm:text-5xl text-brand-700 tracking-tight">
                  {calculation.priceDisplay}
                </div>

                {calculation.hasExactPrice ? (
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    {calculation.breakdownText}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                    {calculation.breakdownText}
                  </p>
                )}
              </div>

              {/* BUTONLAR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* 1. Buton: Bu Proje İçin Teklif Al */}
                <Link
                  href={calculation.offerUrl}
                  className="px-6 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Bu Proje İçin Teklif Al</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* 2. Buton: WhatsApp'tan Bilgi Al */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp’tan Bilgi Al</span>
                </a>

              </div>

              {/* Seçimi Değiştir Linki */}
              <div className="text-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline underline-offset-4"
                >
                  Farklı bir kapasite veya modelle yeniden hesaplamak için tıklayın
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Switch to Custom Prompt */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="text-xs text-slate-600">
                <strong className="text-slate-900">Kendi arazinize özel ölçülerle mi hesaplamak istiyorsunuz?</strong>
                <p className="mt-0.5">Hazır model seçmeden serbest uzunluk ve genişlik değerleri girerek anlık maliyet çıkarabilirsiniz.</p>
              </div>
              <button
                type="button"
                onClick={() => setCalculatorMode("custom")}
                className="shrink-0 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-500 transition-colors flex items-center space-x-1"
              >
                <span>Özel Fiyat Hesaplayıcıya Geç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}

        {/* Yasal Fiyat Uyarı Metni */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-sm text-slate-900">
              Yasal Fiyatlandırma Esasları
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Belirtilen fiyat, seçilen modelin toplam m² alanı üzerinden hesaplanan tahmini yapım maliyetidir. Nihai fiyat; zemin koşulları, malzeme tercihleri, lokasyon ve uygulama detaylarına göre kesinleştirilir.
            </p>
          </div>
        </div>

        {/* Anahtar Teslim Fiyat Kapsamına Neler Dahildir? */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card mb-12 space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <Key className="w-5 h-5 text-brand-600" />
            <h3 className="font-heading font-bold text-xl text-slate-900">
              Anahtar Teslim Fiyat Kapsamına Neler Dahildir?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TURNKEY_PRICE_INCLUSIONS.map((inc, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 rounded-2xl bg-surface-soft border border-slate-100 text-xs sm:text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust CTA */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-anthracite-800">
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Size uygun modeli birlikte belirleyelim.
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Arazinizin bulunduğu ili ve hedef hayvan sayınızı bize iletin; teknik ekibimiz en uygun modeli ve net metraj teklifini çıkarsın.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2"
            >
              <span>Ücretsiz Teklif Al</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Merhaba, arazim için çiftlik projesi teklifi almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp’tan Bilgi Al</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function FarmPricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface-soft flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-600">Fiyat hesaplama aracı yükleniyor...</p>
        </div>
      </div>
    }>
      <FarmPricingContent />
    </Suspense>
  );
}
