"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Building2, 
  Search, 
  ArrowRight, 
  Ruler, 
  Layers, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  X,
  Calculator,
  ShieldCheck,
  HardHat,
  Video
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { 
  projectsData, 
  FIVE_CORE_MODELS, 
  FARM_MODEL_TYPES, 
  BUILDING_SYSTEMS, 
  FARM_CAPACITIES 
} from "@/data/projects";
import { ModelTypeCode, BuildingSystemType } from "@/types";
import ModelCardSlider from "@/components/models/ModelCardSlider";
import ProjectCardSlider from "@/components/projects/ProjectCardSlider";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("all");
  const [selectedCapacity, setSelectedCapacity] = useState<number | "all">("all");
  const [selectedModelType, setSelectedModelType] = useState<ModelTypeCode | "all">("all");
  const [selectedBuildingSystem, setSelectedBuildingSystem] = useState<BuildingSystemType | "all">("all");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(query);
        const matchDesc = project.shortDescription.toLowerCase().includes(query);
        const matchCap = project.capacity?.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchCap) return false;
      }

      // Main category filter
      if (selectedMainCategory !== "all") {
        if (selectedMainCategory === "ciftlik") {
          if (project.category === "ev" || project.category === "tarimsal-yapi") return false;
        } else if (project.category !== selectedMainCategory) {
          return false;
        }
      }

      // Capacity filter
      if (selectedCapacity !== "all" && project.capacityValue !== selectedCapacity) {
        return false;
      }

      // Model type filter (A, B, C, D, E)
      if (selectedModelType !== "all" && project.modelType !== selectedModelType) {
        return false;
      }

      // Building system filter (Çelik, Prefabrik, Betonarme)
      if (selectedBuildingSystem !== "all" && project.buildingSystem !== selectedBuildingSystem) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedMainCategory, selectedCapacity, selectedModelType, selectedBuildingSystem]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedMainCategory("all");
    setSelectedCapacity("all");
    setSelectedModelType("all");
    setSelectedBuildingSystem("all");
  };

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs items={[{ label: "Model Kataloğu" }]} />

        {/* Page Hero */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-premium border border-anthracite-800">
          <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Gökçe İnşaat ve Yapı Standart Çiftlik Modelleri</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Profesyonel Çiftlik <br />
              <span className="text-gradient-orange">Model Kataloğu</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              25 Baş'tan 250 Baş'a kadar et ve süt hayvancılığı için özel geliştirilmiş 5 ana çiftlik modelimizi inceleyin. Projenize uygun modelin yapım maliyetini kademeli hesaplayıcı ile anında hesaplayabilirsiniz.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/ciftlik-fiyatlari"
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-brand-600/30 transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Kademeli Fiyat Hesaplama</span>
              </Link>
              <Link
                href="/referanslar"
                className="px-6 py-3 rounded-xl bg-anthracite-900 hover:bg-anthracite-800 border border-anthracite-700 text-white font-bold text-xs flex items-center space-x-2 transition-all"
              >
                <Video className="w-4 h-4 text-brand-400" />
                <span>Referans Videoları İncele</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. BÖLÜM: 5 ANA MODEL KATALOĞU (FİYATSIZ, GERÇEK GÖRSELLERLE) */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">
                Standart Sistemler
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                5 Temel Çiftlik Modeli
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Her model işletme hedeflerinize ve hayvan refahına göre özel projelendirilmiş taşıyıcı aks planına sahiptir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FIVE_CORE_MODELS.map((model) => (
              <ModelCardSlider key={model.code} model={model} />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REFERANS VİDEOLAR & GERÇEK SAHA İŞLERİ VURGU BANNERI */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-anthracite-950 via-anthracite-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-anthracite-800 shadow-premium flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-400 uppercase tracking-wider">
              <Video className="w-4 h-4" />
              <span>Gökçe İnşaat ve Yapı Saha Portföyü</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
              36 Gerçek Şantiye ve Montaj Videosunu İnceleyin
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Türkiye genelinde tamamladığımız karkas montajları, çatı kaplamaları ve çiftlik inşaatlarının gerçek video kayıtlarını sessiz ve yüksek kalitede izleyin.
            </p>
          </div>

          <Link
            href="/referanslar"
            className="shrink-0 px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center space-x-2 transition-all"
          >
            <span>Referans Portföyünü Aç</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 2. BÖLÜM: KAPASİTE VE TÜM DETAYLI PROJELER LİSTESİ */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Kapasite ve Sistem Filtresi
            </span>
            <h2 className="font-heading font-black text-2xl text-slate-900">
              Tüm Proje ve Kapasite Seçenekleri
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Kapasite veya model ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setSelectedMainCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedMainCategory === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setSelectedMainCategory("ciftlik")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedMainCategory === "ciftlik" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Çiftlikler
                </button>
                <button
                  onClick={() => setSelectedMainCategory("ev")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedMainCategory === "ev" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Ev Projeleri
                </button>
                <button
                  onClick={() => setSelectedMainCategory("celik-yapi")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedMainCategory === "celik-yapi" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Çelik Depolar
                </button>
              </div>
            </div>

            {/* Kapasite Seçici */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-700 uppercase mr-1">Kapasite:</span>
              <button
                onClick={() => setSelectedCapacity("all")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                  selectedCapacity === "all" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Tümü
              </button>
              {FARM_CAPACITIES.map((cap) => (
                <button
                  key={cap.value}
                  onClick={() => setSelectedCapacity(cap.value)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    selectedCapacity === cap.value ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cap.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Grid (Strictly NO PRICES - Slider Enabled) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.slice(0, 24).map((project) => (
              <ProjectCardSlider key={project.id} project={project} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
