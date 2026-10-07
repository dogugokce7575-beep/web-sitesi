"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  UploadCloud, 
  Sparkles, 
  X,
  Building2,
  MapPin,
  Ruler,
  Calculator,
  RotateCcw
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

function QuoteFormContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "Ankara",
    district: "",
    projectType: "Besi Çiftliği",
    animalCapacity: "50 Baş",
    modelType: "C — Besi Modeli",
    buildingSystem: "Ağır Çelik Konstrüksiyon",
    dimensions: "",
    landArea: "",
    estimatedPrice: "",
    message: "",
  });

  const [hasPresetCalculation, setHasPresetCalculation] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<typeof formData | null>(null);

  useEffect(() => {
    if (!searchParams) return;

    const queryKapasite = searchParams.get("kapasite");
    const queryModel = searchParams.get("model");
    const querySistem = searchParams.get("sistem");
    const queryProje = searchParams.get("proje");
    const queryOlcu = searchParams.get("olcu");
    const queryAlan = searchParams.get("alan");
    const queryFiyat = searchParams.get("fiyat");

    if (queryFiyat || queryOlcu || queryAlan || queryKapasite) {
      setHasPresetCalculation(true);
    }

    setFormData((prev) => ({
      ...prev,
      animalCapacity: queryKapasite || prev.animalCapacity,
      modelType: queryModel || prev.modelType,
      buildingSystem: querySistem ? (querySistem.includes("Çelik") ? "Ağır Çelik Konstrüksiyon" : querySistem) : prev.buildingSystem,
      dimensions: queryOlcu || prev.dimensions,
      landArea: queryAlan || prev.landArea,
      estimatedPrice: queryFiyat || prev.estimatedPrice,
      projectType: queryProje || prev.projectType,
    }));
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Bilgileri sakla
    setLastSubmittedData({ ...formData });
    setIsSubmitted(true);

    // 2. Eksiksiz WhatsApp formatlı mesaj metni oluştur
    const msgLines = [
      "*GÖKÇE İNŞAAT VE YAPI — PROJE & FİYAT TEKLİFİ TALEBİ*",
      "----------------------------------------",
      "*1. MÜŞTERİ & İLETİŞİM BİLGİLERİ*",
      `• *Ad Soyad:* ${formData.fullName}`,
      `• *Telefon:* ${formData.phone}`,
      `• *Şehir / İlçe:* ${formData.city} / ${formData.district || "Merkez"}`,
      "",
      "*2. PROJE & YAPI DETAYLARI*",
      `• *Yapı Türü:* ${formData.projectType}`,
      `• *Hayvan Kapasitesi:* ${formData.animalCapacity || "Belirtilmedi"}`,
      `• *Model Tipi:* ${formData.modelType || "Belirtilmedi"}`,
      `• *Taşıyıcı Sistem:* ${formData.buildingSystem || "Ağır Çelik"}`,
      `• *Ölçüler (Uzunluk × Genişlik):* ${formData.dimensions || "Teklif aşamasında belirlenecek"}`,
      `• *Toplam Taban Alanı:* ${formData.landArea || "Hesaplanacak"}`,
      `• *Hesaplanan Tahmini Fiyat:* ${formData.estimatedPrice || "Özel teklif çalışılacak"}`,
      "",
      "*3. MÜŞTERİ NOTU & MESAJI*",
      `• ${formData.message ? formData.message : "Özel not belirtilmedi."}`,
      fileName ? `• *Ekli Dosya:* ${fileName}` : "",
      "----------------------------------------",
      "📍 _Türkiye Geneli (81 İl) Anahtar Teslim Uygulama_",
    ].filter(Boolean);

    const fullMessage = msgLines.join("\n");

    // 3. Arka planda API'ye kaydet (Bilgi asla kaybolmasın)
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fileName,
          createdAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn("API log error:", err);
    }

    // 4. WhatsApp'a yönlendir
    setTimeout(() => {
      window.open(
        `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`,
        "_blank"
      );
    }, 600);
  };

  const getWhatsAppDirectUrl = () => {
    if (!lastSubmittedData) return `https://wa.me/${siteConfig.contact.whatsappNumber}`;
    const msg = [
      "*GÖKÇE İNŞAAT VE YAPI — PROJE & FİYAT TEKLİFİ TALEBİ*",
      `• Ad Soyad: ${lastSubmittedData.fullName}`,
      `• Telefon: ${lastSubmittedData.phone}`,
      `• Şehir: ${lastSubmittedData.city}`,
      `• Yapı Türü: ${lastSubmittedData.projectType}`,
      `• Kapasite: ${lastSubmittedData.animalCapacity}`,
      `• Ölçüler: ${lastSubmittedData.dimensions || "Standart"}`,
      `• Alan: ${lastSubmittedData.landArea}`,
      `• Tahmini Fiyat: ${lastSubmittedData.estimatedPrice}`,
      `• Not: ${lastSubmittedData.message || "Yok"}`,
    ].join("\n");
    return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-premium overflow-hidden">
      
      {/* Top Banner Ribbon */}
      <div className="bg-anthracite-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-anthracite-900">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600/30 border border-brand-500/40 text-brand-400 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-white">
              Proje Bilgilerinizi Doldurun
            </h2>
            <p className="text-xs text-slate-400">
              Türkiye'nin 81 iline mobil şantiye ve anahtar teslim montaj güvencesi
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-anthracite-900 px-3 py-1.5 rounded-lg border border-anthracite-800">
          <ShieldCheck className="w-4 h-4" />
          <span>%100 Ücretsiz & Taahhütsüz</span>
        </div>
      </div>

      {/* Hesaplayıcıdan Aktarılan Fiyat & Ölçü Özeti Kartı */}
      {hasPresetCalculation && (formData.estimatedPrice || formData.dimensions || formData.landArea) && (
        <div className="bg-gradient-to-r from-brand-50 via-orange-50/60 to-amber-50/40 border-b border-brand-200/80 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100/70 px-2.5 py-0.5 rounded-md">
                <Calculator className="w-3.5 h-3.5 text-brand-600" />
                <span>Hesaplanan Proje Özeti</span>
              </span>
              <p className="text-xs text-slate-600">
                Fiyat listesinde yaptığınız hesaplama otomatik olarak bu forma aktarılmıştır.
              </p>
            </div>

            <div className="flex items-baseline space-x-3 sm:text-right">
              {formData.estimatedPrice && (
                <div>
                  <span className="text-[11px] text-slate-500 block">Hesaplanan Tahmini Tutar</span>
                  <span className="font-heading font-black text-xl sm:text-2xl text-brand-600">
                    {formData.estimatedPrice}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {formData.animalCapacity && (
              <div className="bg-white/80 rounded-lg p-2 border border-brand-100">
                <span className="text-slate-500 block text-[10px]">Kapasite:</span>
                <span className="font-bold text-slate-800">{formData.animalCapacity}</span>
              </div>
            )}
            {formData.dimensions && (
              <div className="bg-white/80 rounded-lg p-2 border border-brand-100">
                <span className="text-slate-500 block text-[10px]">Ölçüler:</span>
                <span className="font-bold text-slate-800">{formData.dimensions}</span>
              </div>
            )}
            {formData.landArea && (
              <div className="bg-white/80 rounded-lg p-2 border border-brand-100">
                <span className="text-slate-500 block text-[10px]">Toplam Alan:</span>
                <span className="font-bold text-brand-700">{formData.landArea}</span>
              </div>
            )}
            {formData.buildingSystem && (
              <div className="bg-white/80 rounded-lg p-2 border border-brand-100">
                <span className="text-slate-500 block text-[10px]">Yapı Sistemi:</span>
                <span className="font-bold text-slate-800 truncate block">{formData.buildingSystem}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form Body */}
      <div className="p-6 sm:p-10">
        {isSubmitted && lastSubmittedData ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                Talebiniz Başarıyla Alındı!
              </h3>
              <p className="text-slate-600 text-sm max-w-lg mx-auto">
                Bilgileriniz kaydedildi ve teknik ekibimizin WhatsApp hattına yönlendirildi. Bilgilerinizin özeti aşağıdadır:
              </p>
            </div>

            {/* Gönderilen Bilgilerin Teyit Tablosu (Bilgi Asla Kaybolmaz) */}
            <div className="w-full max-w-xl bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left text-xs sm:text-sm space-y-3">
              <div className="flex justify-between border-b border-slate-200/70 pb-2">
                <span className="text-slate-500">Ad Soyad:</span>
                <span className="font-bold text-slate-900">{lastSubmittedData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/70 pb-2">
                <span className="text-slate-500">Telefon:</span>
                <span className="font-bold text-slate-900">{lastSubmittedData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/70 pb-2">
                <span className="text-slate-500">Şehir / İlçe:</span>
                <span className="font-bold text-slate-900">{lastSubmittedData.city} / {lastSubmittedData.district || "Merkez"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/70 pb-2">
                <span className="text-slate-500">Yapı Türü:</span>
                <span className="font-bold text-slate-900">{lastSubmittedData.projectType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/70 pb-2">
                <span className="text-slate-500">Hayvan Kapasitesi:</span>
                <span className="font-bold text-slate-900">{lastSubmittedData.animalCapacity}</span>
              </div>
              {lastSubmittedData.dimensions && (
                <div className="flex justify-between border-b border-slate-200/70 pb-2">
                  <span className="text-slate-500">Ölçüler (Uzunluk × Genişlik):</span>
                  <span className="font-bold text-slate-900">{lastSubmittedData.dimensions}</span>
                </div>
              )}
              {lastSubmittedData.landArea && (
                <div className="flex justify-between border-b border-slate-200/70 pb-2">
                  <span className="text-slate-500">Toplam Taban Alanı:</span>
                  <span className="font-bold text-brand-600">{lastSubmittedData.landArea}</span>
                </div>
              )}
              {lastSubmittedData.estimatedPrice && (
                <div className="flex justify-between border-b border-slate-200/70 pb-2">
                  <span className="text-slate-500">Hesaplanan Tahmini Fiyat:</span>
                  <span className="font-bold text-brand-600">{lastSubmittedData.estimatedPrice}</span>
                </div>
              )}
              {lastSubmittedData.message && (
                <div className="flex flex-col space-y-1 pt-1">
                  <span className="text-slate-500">Mesaj / Özel Not:</span>
                  <span className="italic text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                    {lastSubmittedData.message}
                  </span>
                </div>
              )}
            </div>

            {/* Hızlı İletişim Butonları */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2">
              <a
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp ile Hemen İlet</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phoneClean}`}
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Telefonla Ara</span>
              </a>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-slate-500 hover:text-slate-800 underline pt-2 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Yeni Form Doldur</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Kişisel & İletişim Bilgileri */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 border-b border-slate-100 pb-2">
                1. İletişim & Konum Bilgileri
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Adınız Soyadınız *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Mehmet Yılmaz"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Telefon Numaranız *</label>
                  <input
                    type="tel"
                    required
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Projenin Yapılacağı Şehir *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ankara, Konya, Balıkesir, Kars, Erzurum, Sivas..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">İlçe / Mevki / Köy</label>
                  <input
                    type="text"
                    placeholder="Örn: Merkez / Çubuk / Sarıkamış..."
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>
            </div>

            {/* 2. Proje, Kapasite, Model & Yapı Sistemi */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 border-b border-slate-100 pb-2">
                2. Yapı Türü, Kapasite & Ölçüler
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Yapı Türü *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    <option value="Besi Çiftliği">Besi Çiftliği</option>
                    <option value="Süt Çiftliği">Süt Çiftliği</option>
                    <option value="Koyun Çiftliği">Koyun Çiftliği (Küçükbaş Ağılı)</option>
                    <option value="Bağlı Sistem Ahır">Bağlı Sistem Ahır</option>
                    <option value="Besi + Süt Karma">Besi + Süt Karma</option>
                    <option value="Açık Besi Modeli">Açık Besi Modeli</option>
                    <option value="Gübre Çukuru">Gübre Çukuru / Lagün</option>
                    <option value="Yem Deposu">Yem Deposu / Hangar</option>
                    <option value="Anahtar Teslim Ev">Anahtar Teslim Müstakil Ev</option>
                    <option value="Çelik Konstrüksiyon Yapı">Endüstriyel Çelik Yapı</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Hayvan Kapasitesi</label>
                  <input
                    type="text"
                    placeholder="Örn: 50 Baş, 100 Baş, 300 Baş..."
                    value={formData.animalCapacity}
                    onChange={(e) => setFormData({ ...formData, animalCapacity: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Model Tipi</label>
                  <select
                    value={formData.modelType}
                    onChange={(e) => setFormData({ ...formData, modelType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    <option value="A — Bağlı Sistem">Model A — Bağlı Sistem</option>
                    <option value="B — Besi + Süt Karma Sistem">Model B — Besi + Süt Karma</option>
                    <option value="C — Besi Modeli">Model C — Besi Modeli</option>
                    <option value="D — Süt Modeli">Model D — Süt Modeli</option>
                    <option value="E — Açık Besi Modeli">Model E — Açık Besi Modeli</option>
                    <option value="Özel Planlama">Özel Mimari Planlama</option>
                  </select>
                </div>
              </div>

              {/* Ölçüler & Hesaplanan Fiyat Alanları */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Proje Ölçüleri (Uzunluk × Genişlik)</label>
                  <input
                    type="text"
                    placeholder="Örn: 40 × 20 m veya 25 × 12 m"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Toplam Taban Alanı (m²)</label>
                  <input
                    type="text"
                    placeholder="Örn: 800 m²"
                    value={formData.landArea}
                    onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Hesaplanan / Hedeflenen Bütçe</label>
                  <input
                    type="text"
                    placeholder="Örn: 8.800.000 TL"
                    value={formData.estimatedPrice}
                    onChange={(e) => setFormData({ ...formData, estimatedPrice: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Taşıyıcı Yapı Sistemi</label>
                  <select
                    value={formData.buildingSystem}
                    onChange={(e) => setFormData({ ...formData, buildingSystem: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    <option value="Ağır Çelik Konstrüksiyon">Ağır Çelik Konstrüksiyon (11.000 TL/m²)</option>
                    <option value="Prefabrik Modüler">Prefabrik Modüler Sistem (10.000 TL/m²)</option>
                    <option value="Betonarme Karkas">Betonarme Karkas Yapı (12.000 TL/m²)</option>
                  </select>
                </div>

                {/* Dosya Yükleme */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kroki / İmar Çapı / Belge (Opsiyonel)</label>
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-brand-600 bg-surface-soft text-slate-600 text-xs font-medium flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="truncate">
                        {fileName ? fileName : "PDF, JPG, PNG seçin..."}
                      </span>
                      <UploadCloud className="w-4 h-4 text-brand-600 shrink-0 ml-2" />
                    </label>
                    {fileName && (
                      <button
                        type="button"
                        onClick={() => setFileName(null)}
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Mesaj */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Mesaj / Proje Notlarınız</label>
                <textarea
                  rows={4}
                  placeholder="Arsanızın yol/su durumu, hedef başlangıç tarihiniz veya projeyle ilgili belirtmek istediğiniz özel detaylar..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Bilgileriniz doğrudan teknik ekibimize iletilir ve gizli tutulur.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Ücretsiz Proje & Fiyat Teklifi Al</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}
      </div>

    </div>
  );
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Ücretsiz Teklif Al" }]} />

        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Türkiye Geneli Hızlı & Şeffaf Bütçe Hesabı</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Ücretsiz Proje ve <span className="text-brand-600">Maliyet Teklifi Alın</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Arazinizi, hayvan sayınızı veya konut hedefinizi iletin; mühendislerimiz 24 saat içinde bulunduğunuz ile özel yaklaşık maliyet cetveli ve 3D yerleşim önerisi hazırlasın.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12 text-slate-500 text-sm">Yükleniyor...</div>}>
          <QuoteFormContent />
        </Suspense>

      </div>
    </div>
  );
}
