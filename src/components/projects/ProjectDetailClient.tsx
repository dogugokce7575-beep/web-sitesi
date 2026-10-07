"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Ruler, 
  CheckCircle2, 
  Key, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  Maximize2, 
  Calendar, 
  Compass, 
  Tractor, 
  MapPin, 
  HelpCircle, 
  Calculator, 
  FileCode2, 
  Image as ImageIcon, 
  HeartHandshake, 
  Workflow, 
  CheckCircle, 
  Wind, 
  Sun, 
  Droplets, 
  Flame, 
  ChevronRight,
  Video,
  Info
} from "lucide-react";
import { Project, BuildingSystemType } from "@/types";
import { siteConfig } from "@/config/site";
import { CAPACITY_CONFIG } from "@/config/pricing";
import { BUILDING_SYSTEMS } from "@/data/projects";
import BlueprintIllustration from "@/components/common/BlueprintIllustration";

interface ProjectDetailClientProps {
  project: Project;
  similarProjects: Project[];
}

const ALL_CAPACITY_OPTIONS = [25, 50, 75, 100, 125, 150, 175, 200, 225, 250];

export default function ProjectDetailClient({ project, similarProjects }: ProjectDetailClientProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<"photo" | "section" | "plan">("photo");
  const [activeImage, setActiveImage] = useState(project.mainImage);
  const [selectedSystem, setSelectedSystem] = useState<BuildingSystemType>(project.buildingSystem || "Çelik");
  const [selectedCapacity, setSelectedCapacity] = useState<number>(project.capacityValue || 50);

  // Kapasiteye göre dinamik uzunluk ve alan hesabı
  const activeLength = CAPACITY_CONFIG[selectedCapacity] ?? null;
  const activeWidth = project.width || 12;
  const activeArea = activeLength ? activeLength * activeWidth : null;

  // Selected system option details
  const activeSystemInfo = project.systemOptions?.find((s) => s.system === selectedSystem) || project.systemOptions?.[0];

  const whatsappMessage = `Merhaba, web sitenizdeki "${project.title}" (${selectedCapacity} Baş ${selectedSystem} Taşıyıcı) modeliniz hakkında bilgi ve anahtar teslim güncel maliyet teklifi almak istiyorum.`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const quoteUrl = `/teklif-al?proje=${encodeURIComponent(project.slug)}&kapasite=${selectedCapacity}%20Ba%C5%9F&model=${encodeURIComponent(project.modelName || project.title)}&sistem=${encodeURIComponent(selectedSystem)}`;
  const calcUrl = `/ciftlik-fiyatlari?model=${project.modelType || 'A'}&kapasite=${selectedCapacity}`;

  return (
    <div className="space-y-12">
      
      {/* ========================================================================= */}
      {/* 1. ÜST BÖLÜM (HERO & PROJE KİMLİĞİ) */}
      {/* ========================================================================= */}
      <div className="bg-anthracite-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-premium border border-anthracite-800">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl space-y-5">
          
          {/* Badge List */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-brand-600 text-white text-xs font-extrabold shadow">
              {project.categoryLabel}
            </span>
            {project.modelType && (
              <span className="px-3.5 py-1 rounded-full bg-anthracite-800 text-brand-400 border border-brand-500/40 text-xs font-bold">
                Model {project.modelType}
              </span>
            )}
            <span className="px-3.5 py-1 rounded-full bg-anthracite-800 text-slate-200 border border-anthracite-700 text-xs font-bold">
              Genişlik: {activeWidth} Metre
            </span>
            <span className="text-slate-300 text-xs flex items-center bg-anthracite-900/80 px-3.5 py-1 rounded-full border border-anthracite-800">
              <MapPin className="w-3.5 h-3.5 mr-1 text-brand-500" />
              Türkiye Geneli Anahtar Teslim
            </span>
          </div>

          {/* Project Title */}
          <h1 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          {/* Short Lead */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>

          {/* Key Metrics Quick Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-anthracite-800/80">
            <div className="p-3.5 bg-anthracite-900/90 rounded-2xl border border-anthracite-800">
              <p className="text-[11px] text-slate-400 font-medium">Standart Genişlik</p>
              <p className="text-lg sm:text-xl font-bold text-brand-400">{activeWidth} Metre</p>
            </div>

            <div className="p-3.5 bg-anthracite-900/90 rounded-2xl border border-anthracite-800">
              <p className="text-[11px] text-slate-400 font-medium">Ölçeklenebilir Kapasite</p>
              <p className="text-lg sm:text-xl font-bold text-white">25 — 250 Baş</p>
            </div>

            <div className="p-3.5 bg-anthracite-900/90 rounded-2xl border border-anthracite-800">
              <p className="text-[11px] text-slate-400 font-medium">Taşıyıcı Sistem</p>
              <p className="text-sm sm:text-base font-bold text-slate-200 truncate">{selectedSystem} Karkas</p>
            </div>

            <div className="p-3.5 bg-anthracite-900/90 rounded-2xl border border-anthracite-800">
              <p className="text-[11px] text-slate-400 font-medium">Teslim Süresi</p>
              <p className="text-lg sm:text-xl font-bold text-white">
                {activeSystemInfo?.estimatedDurationWeeks || 6} — 8 Hafta
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ANA GÖRSEL, TEKNİK ÇİZİM VE SAĞ CTA SÜTUNU */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sol Kolon: Görsel Galeri & Çizim Sekmeleri */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Görsel / Çizim Değiştirici Sekmeler */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-2">
            <button
              onClick={() => setActiveMediaTab("photo")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                activeMediaTab === "photo"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-surface-soft text-slate-700 hover:bg-slate-200"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Mimari Çizimler & Renderlar ({project.gallery?.length || 1})</span>
            </button>

            <button
              onClick={() => setActiveMediaTab("section")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                activeMediaTab === "section"
                  ? "bg-brand-600 text-white shadow-md"
                  : "bg-surface-soft text-slate-700 hover:bg-slate-200"
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>Havalandırma Kesiti</span>
            </button>

            <button
              onClick={() => setActiveMediaTab("plan")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                activeMediaTab === "plan"
                  ? "bg-brand-600 text-white shadow-md"
                  : "bg-surface-soft text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Padok Aks Planı</span>
            </button>
          </div>

          {/* Aktif Görünüm Çerçevesi */}
          {activeMediaTab === "photo" && (
            <div className="space-y-4">
              <div className="relative h-80 sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-card border border-slate-200 bg-slate-900">
                <img
                  src={activeImage}
                  alt={`${project.title} - Gerçek Proje Görseli`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-4 right-4 bg-anthracite-950/80 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl backdrop-blur-sm border border-anthracite-800">
                  Gerçek Model Çizimi
                </div>
              </div>

              {/* Thumbnails (Tüm gerçek görseller) */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <span>Model Galerisi ({project.gallery.length} Görsel)</span>
                    <span className="text-[11px]">Büyütmek için görsele tıklayın</span>
                  </div>
                  <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                    {project.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-28 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                          activeImage === img ? "border-brand-600 ring-2 ring-brand-600/30 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${project.title} çizim ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMediaTab === "section" && (
            <div className="rounded-3xl overflow-hidden shadow-card">
              <BlueprintIllustration
                type="section"
                capacity={selectedCapacity}
                modelCode={project.modelType || "C"}
                dimensions={`${activeLength || 25}m × ${activeWidth}m`}
              />
            </div>
          )}

          {activeMediaTab === "plan" && (
            <div className="rounded-3xl overflow-hidden shadow-card">
              <BlueprintIllustration
                type="plan"
                capacity={selectedCapacity}
                modelCode={project.modelType || "C"}
                dimensions={`${activeLength || 25}m × ${activeWidth}m`}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* KAPASİTE VE METRAJ SEÇİCİ TABLO (FİYATSIZ, GERÇEK ÖLÇÜLERLE) */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-black text-lg text-slate-900">
                  Kapasite ve Proje Ölçüleri
                </h3>
                <p className="text-xs text-slate-500">
                  Hayvan sayınızı seçerek modelin net oturum ölçülerini inceleyin.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                Genişlik: {activeWidth} m
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
              {ALL_CAPACITY_OPTIONS.map((cap) => {
                const isSelected = selectedCapacity === cap;
                const len = CAPACITY_CONFIG[cap];

                return (
                  <button
                    key={cap}
                    onClick={() => setSelectedCapacity(cap)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? "bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-500/20 shadow-sm"
                        : "bg-surface-soft border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-sm font-black block">{cap} Baş</span>
                    <span className="text-[10px] text-slate-500 block">
                      {len ? `${len}m × ${activeWidth}m` : "Özel Ölçü"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Kapasite Bilgi Özeti */}
            <div className="p-4 rounded-2xl bg-surface-soft border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500">Seçilen Kapasite Detayı:</span>
                <p className="font-bold text-slate-900">
                  {selectedCapacity} Baş — {activeLength ? `${activeLength}m Uzunluk × ${activeWidth}m Genişlik = ${activeArea} m² Taban Alanı` : "Proje ölçüsü arsa durumuna ve teklif aşamasına göre belirlenir."}
                </p>
              </div>

              <Link
                href={calcUrl}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center space-x-1.5 shrink-0 shadow-sm"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Bu Kapasite İçin Fiyat Hesapla</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Sağ Kolon: FİYATSIZ Bilgilendirme ve Aksiyon Kutusu */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card space-y-6">
            
            {/* Model Kimliği ve Parametre Kutusu */}
            <div className="p-5 bg-surface-soft rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-brand-700">
                  MODEL PARAMETRELERİ
                </span>
                <span className="text-xs font-extrabold text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                  Model {project.modelType || 'A'}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Model Adı:</span>
                  <span className="font-bold text-slate-900">{project.modelName || project.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Aks Genişliği:</span>
                  <span className="font-bold text-slate-900">{activeWidth} Metre</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Seçilen Kapasite:</span>
                  <span className="font-bold text-brand-600">{selectedCapacity} Baş</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Proje Oturumu:</span>
                  <span className="font-bold text-slate-900">
                    {activeLength ? `${activeLength} × ${activeWidth} m` : "Teklif aşamasında"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Taban Alanı:</span>
                  <span className="font-bold text-brand-600">
                    {activeArea ? `${activeArea} m²` : "Teklif aşamasında"}
                  </span>
                </div>
              </div>
            </div>

            {/* Taşıyıcı Yapı Sistemi Seçici */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Taşıyıcı Yapı Sistemi:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {BUILDING_SYSTEMS.map((sys) => (
                  <button
                    key={sys}
                    type="button"
                    onClick={() => setSelectedSystem(sys)}
                    className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all border text-center ${
                      selectedSystem === sys
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-surface-soft border-slate-200 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>{sys}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 1. ÖNCELİKLİ CTA: FİYAT HESAPLA */}
            <div className="space-y-3 pt-2">
              <Link
                href={calcUrl}
                className="w-full py-4 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-black text-sm text-center shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Bu Model İçin Fiyat Hesapla</span>
              </Link>
              <p className="text-[11px] text-slate-500 text-center">
                Kapasite ve yapı sisteminizi seçerek tahmini metraj ve anahtar teslim yapım maliyetini anında hesaplayın.
              </p>

              {/* 2. CTA: ÜCRETSİZ TEKLİF AL */}
              <Link
                href={quoteUrl}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center flex items-center justify-center space-x-2 transition-all"
              >
                <span>Proje İçin Teklif Al</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* 3. CTA: WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center space-x-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp ile Bilgi Al</span>
              </a>

              {/* 4. CTA: ŞANTİYE VİDEOLARI */}
              <Link
                href="/referanslar"
                className="w-full py-2.5 px-3 rounded-xl bg-surface-soft hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs text-center flex items-center justify-center space-x-1.5 transition-all"
              >
                <Video className="w-3.5 h-3.5 text-brand-600" />
                <span>Gerçek Şantiye Videoları</span>
              </Link>
            </div>

            {/* Güven Rozetleri */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Türkiye'nin 81 İlinde Mobil Şantiye</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sözleşmeli Sabit Fiyat Güvencesi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Eksiksiz Anahtar Teslim Montaj</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. BÖLÜM: 1. PROJE HAKKINDA & 2. SİSTEM HAKKINDA */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Proje Hakkında */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center space-x-2.5 text-brand-600">
            <Building2 className="w-5 h-5" />
            <h2 className="font-heading font-extrabold text-xl text-slate-900">
              1. Proje Hakkında
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {project.projectAbout || project.fullDescription}
          </p>
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            Tesis; arazi eğimi, rüzgar yönü ve traktör manevra koridorları dikkate alınarak modüler aks sisteminde planlanır. Böylece gelecekte kapasite artırımı gerektiğinde yapı kolaylıkla genişletilebilir.
          </p>
        </div>

        {/* 2. Sistem Hakkında */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center space-x-2.5 text-brand-600">
            <Workflow className="w-5 h-5" />
            <h2 className="font-heading font-extrabold text-xl text-slate-900">
              2. Sistem Hakkında ({project.modelName || "İşletme Modeli"})
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {project.systemDescription || `${project.modelName} işletme modelimiz; hayvan refahını ve yem verimliliğini maksimize eden endüstriyel barınak mimarisine sahiptir.`}
          </p>
          <div className="p-4 bg-surface-soft rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
            <strong>İşletme Mantığı:</strong> Yemleme, sulama, temizlik ve günlük veterinerlik kontrollerinin minimum insan gücüyle ve traktör mekanizasyonuyla kesintisiz yürütülmesini sağlar.
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. BÖLÜM: 3. HAYVAN REFAHI TASARIM İLKELERİ */}
      {/* ========================================================================= */}
      {project.animalWelfare && project.animalWelfare.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-700 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-brand-600" />
              <span>3. Hayvan Refahı ve Verim Odaklı Mimari</span>
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
              Hayvan Refahı Tasarım Standartlarımız
            </h3>
            <p className="text-xs text-slate-500">
              Yüksek et ve süt verimi için stressiz barınma, taze hava sirkülasyonu ve güvenli zemin prensipleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.animalWelfare.map((welfare, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-surface-soft border border-slate-100 space-y-2">
                <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center text-brand-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-brand-600 shrink-0" />
                  <span>{welfare.title}</span>
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {welfare.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. BÖLÜM: TAŞIYICI YAPI SİSTEMLERİ MİMARİSİ (FİYATSIZ) */}
      {/* ========================================================================= */}
      {project.systemOptions && project.systemOptions.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-700 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-brand-600" />
              <span>Taşıyıcı Yapım Sistemleri</span>
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
              Bu Model İçin Taşıyıcı Sistem Alternatifleri
            </h3>
            <p className="text-xs text-slate-500">
              İhtiyacınıza ve arsanızın zemin koşullarına en uygun taşıyıcı karkas sistemini belirleyebilirsiniz.
            </p>
          </div>

          {/* 3 Sistem Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.systemOptions.map((opt) => (
              <div
                key={opt.system}
                onClick={() => setSelectedSystem(opt.system)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  selectedSystem === opt.system
                    ? "bg-brand-50/50 border-brand-500 shadow-card ring-2 ring-brand-500/30"
                    : "bg-surface-soft border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-xl text-xs font-extrabold ${
                      selectedSystem === opt.system ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-700"
                    }`}>
                      {opt.system} Karkas
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {opt.estimatedDurationWeeks} Hafta
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-slate-900">
                    {opt.title}
                  </h4>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {opt.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs text-slate-700">
                    {opt.advantages.map((adv, aIdx) => (
                      <div key={aIdx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-brand-700">
                    {selectedSystem === opt.system ? "✓ Seçili Sistem" : "Bu Sistemi Seç"}
                  </span>
                  <Link
                    href={`/ciftlik-fiyatlari?model=${project.modelType || 'A'}`}
                    className="text-xs font-bold text-slate-700 hover:text-brand-600 flex items-center"
                  >
                    <span>Fiyatı Gör</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. BÖLÜM: 11 STANDART YAPIM AŞAMASI */}
      {/* ========================================================================= */}
      {project.constructionStages && project.constructionStages.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-700 uppercase tracking-wider">
              <Workflow className="w-4 h-4 text-brand-600" />
              <span>Süreç Güvencesi</span>
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
              11 Standart Anahtar Teslim Yapım Aşaması
            </h3>
            <p className="text-xs text-slate-500">
              Zemin etüdünden hayvan yerleşimine kadar tüm süreç sözleşmeli tek yüklenici güvencesindedir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.constructionStages.map((stage) => (
              <div key={stage.step} className="p-4 rounded-2xl bg-surface-soft border border-slate-100 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-brand-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {stage.step}
                  </span>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                    {stage.title}
                  </h4>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed pl-9">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALT CTA: FİYAT HESAPLAMA & TEKLİF ÇAĞRISI */}
      {/* ========================================================================= */}
      <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-anthracite-800">
        <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
          {project.modelName || project.title} İçin Maliyeti Hesaplayın
        </h3>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Arsanızın bulunduğu ili, istediğiniz hayvan kapasitesini ve taşıyıcı sistemi belirleyin; sistem tahmini yapım bütçesini anında hesaplasın.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={calcUrl}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <Calculator className="w-4 h-4" />
            <span>Kademeli Fiyat Hesaplayıcıyı Aç</span>
          </Link>
          <Link
            href={quoteUrl}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all"
          >
            <span>Doğrudan Teklif İste</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
