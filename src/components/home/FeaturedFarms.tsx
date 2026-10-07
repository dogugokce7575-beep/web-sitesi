"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Ruler, 
  Maximize2, 
  MapPin,
  Filter,
  Sparkles,
  Calculator,
  HelpCircle,
  FileCode2,
  Image as ImageIcon
} from "lucide-react";
import { projectsData, FARM_MODEL_TYPES, BUILDING_SYSTEMS, FARM_CAPACITIES } from "@/data/projects";
import { ModelTypeCode, BuildingSystemType } from "@/types";
import { calculateEstimatedCost, PRICING_CONFIG } from "@/config/pricing";
import BlueprintIllustration from "@/components/common/BlueprintIllustration";

export default function FeaturedFarms() {
  const [selectedCapacity, setSelectedCapacity] = useState<number | "all">(50);
  const [selectedModelType, setSelectedModelType] = useState<ModelTypeCode | "all">("C");
  const [selectedBuildingSystem, setSelectedBuildingSystem] = useState<BuildingSystemType | "all">("Çelik");
  const [viewMode, setViewMode] = useState<"photo" | "blueprint">("photo");

  // Farm projects only
  const allFarmProjects = useMemo(() => {
    return projectsData.filter((p) => p.category !== "ev" && p.category !== "tarimsal-yapi");
  }, []);

  // Filtered farm projects
  const filteredProjects = useMemo(() => {
    return allFarmProjects.filter((p) => {
      if (selectedCapacity !== "all" && p.capacityValue !== selectedCapacity) return false;
      if (selectedModelType !== "all" && p.modelType !== selectedModelType) return false;
      if (selectedBuildingSystem !== "all" && p.buildingSystem !== selectedBuildingSystem) return false;
      return true;
    });
  }, [allFarmProjects, selectedCapacity, selectedModelType, selectedBuildingSystem]);

  return (
    <section className="py-16 sm:py-24 bg-surface-soft text-slate-900 relative" id="ciftlik-modelleri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
              <Building2 className="w-3.5 h-3.5 text-brand-600" />
              <span>Standart Çiftlik Modelleri</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Kapasite ve Modele Göre <span className="text-brand-600">Çiftlik Çözümleri</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              İhtiyacınıza uygun kapasiteyi, model tipini ve yapı sistemini seçin; standart mimari ölçüleri, teknik şemaları ve tahmini fiyat yaklaşımını inceleyin.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start lg:self-auto">
            {/* View Mode Toggle (Photo / Blueprint) */}
            <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-1">
              <button
                onClick={() => setViewMode("photo")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  viewMode === "photo"
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Fotoğraf</span>
              </button>
              <button
                onClick={() => setViewMode("blueprint")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  viewMode === "blueprint"
                    ? "bg-brand-600 text-white shadow"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Teknik Çizim / Kesit</span>
              </button>
            </div>

            <Link
              href="/ciftlik-fiyatlari"
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 active:scale-95 text-white text-xs font-bold transition-all shadow-sm space-x-1.5"
            >
              <Calculator className="w-4 h-4 text-brand-400" />
              <span>Fiyat Tablosu</span>
            </Link>
          </div>
        </div>

        {/* Simplified, Clean Multi-Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-card mb-10 space-y-5">
          
          {/* 1. Filter: Capacity (25, 50, 75, 100 Baş) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-600 mr-2" />
                1. Kapasite Seçimi
              </span>
              <span className="text-[11px] text-slate-500">Hayvan Kapasitesi</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCapacity("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCapacity === "all"
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-surface-soft text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                Tümü
              </button>

              {FARM_CAPACITIES.map((cap) => (
                <button
                  key={cap.value}
                  onClick={() => setSelectedCapacity(cap.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    selectedCapacity === cap.value
                      ? "bg-brand-600 text-white shadow-sm scale-105"
                      : "bg-surface-soft text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  <span>{cap.label}</span>
                  <span className="text-[10px] opacity-80 font-normal">({cap.length}m)</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Filter: Model Type (A, B, C, D, E) */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-600 mr-2" />
                2. Model Tipi
              </span>
              <span className="text-[11px] text-slate-500">İşletme Tipi</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedModelType("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedModelType === "all"
                    ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                    : "bg-surface-soft border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Tüm Modeller
              </button>

              {FARM_MODEL_TYPES.map((m) => (
                <button
                  key={m.code}
                  onClick={() => setSelectedModelType(m.code)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedModelType === m.code
                      ? "bg-brand-600 text-white border-brand-600 shadow-sm scale-105"
                      : "bg-surface-soft border-slate-200 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Filter: Building System (Prefabrik | Çelik | Betonarme) */}
          <div className="space-y-2 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-600 mr-2" />
                3. Yapı Sistemi
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBuildingSystem("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedBuildingSystem === "all"
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Tümü
              </button>
              {BUILDING_SYSTEMS.map((sys) => (
                <button
                  key={sys}
                  onClick={() => setSelectedBuildingSystem(sys)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedBuildingSystem === sys
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {sys}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.slice(0, 8).map((project) => (
            <div
              key={project.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Area (Photo or Blueprint) */}
                {viewMode === "blueprint" ? (
                  <div className="p-3 bg-slate-950">
                    <BlueprintIllustration
                      type="section"
                      capacity={project.capacityValue || 50}
                      modelCode={project.modelType || "C"}
                      dimensions={`${project.length}m × ${project.width}m`}
                    />
                  </div>
                ) : (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.mainImage}
                      alt={`${project.title} - Gökçe İnşaat ve Yapı`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Capacity Badge */}
                    <div className="absolute top-3 left-3 bg-brand-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow">
                      {project.capacity}
                    </div>

                    {/* Building System Badge */}
                    <div className="absolute top-3 right-3 bg-slate-900/90 text-slate-200 border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                      {project.buildingSystem}
                    </div>
                  </div>
                )}

                {/* Card Content Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                      {project.capacity} {project.modelType} Modeli
                    </h3>
                    <p className="text-xs text-brand-600 font-semibold mt-0.5">
                      {project.categoryLabel}
                    </p>
                  </div>

                  {/* Specification Table */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div className="bg-surface-soft p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-500 block">Ölçü:</span>
                      <span className="font-bold text-slate-900">{project.length} × {project.width} m</span>
                    </div>
                    <div className="bg-surface-soft p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-500 block">Alan:</span>
                      <span className="font-bold text-brand-600">{project.totalArea} m²</span>
                    </div>
                    <div className="bg-surface-soft p-2 rounded-lg border border-slate-100 col-span-2">
                      <span className="text-slate-500 block">Yapı Sistemi:</span>
                      <span className="font-bold text-slate-900">{project.buildingSystem}</span>
                    </div>
                  </div>

                  {/* Dynamic Calculated Price Box */}
                  {(() => {
                    const farmArea = project.totalArea || project.dimensions?.totalArea || 150;
                    const farmCalc = calculateEstimatedCost(farmArea, project.buildingSystem, project.modelType);
                    return (
                      <div className="bg-brand-50 p-3 rounded-2xl border border-brand-100 space-y-0.5">
                        <span className="text-[10px] text-brand-800 font-bold uppercase tracking-wider block">
                          Tahmini Maliyet ({farmCalc.unitCostFormatted}):
                        </span>
                        <p className="text-sm font-black text-brand-900">
                          {farmCalc.totalCostFormatted}
                        </p>
                        <p className="text-[10px] text-brand-700 font-medium">
                          {farmCalc.calculationText}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 mt-2 flex items-center space-x-2">
                <Link
                  href={`/projeler/${project.slug}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-surface-soft hover:bg-slate-900 text-slate-800 hover:text-white font-bold text-xs text-center border border-slate-200 hover:border-slate-900 transition-all flex items-center justify-center space-x-1"
                >
                  <span>Detayları İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/teklif-al?proje=${project.slug}`}
                  className="py-2.5 px-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs text-center transition-all shadow-sm"
                >
                  Teklif Al
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Small Pricing Disclaimer */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          <p>{PRICING_CONFIG.disclaimer}</p>
        </div>

      </div>
    </section>
  );
}
