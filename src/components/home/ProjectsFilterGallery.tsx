"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Building2, 
  ArrowRight, 
  Eye, 
  X, 
  Layers, 
  Ruler, 
  Sparkles,
  MapPin
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { Project } from "@/types";

const CATEGORIES = [
  { id: "all", label: "Tüm Projeler" },
  { id: "besi-ciftligi", label: "Besi Çiftliği" },
  { id: "sut-ciftligi", label: "Süt Çiftliği" },
  { id: "ev", label: "Ev Projeleri" },
  { id: "celik-yapi", label: "Çelik Yapılar" },
  { id: "tarimsal-yapi", label: "Tarımsal Depolar" },
];

export default function ProjectsFilterGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projectsData.slice(0, 8);
    return projectsData.filter((p) => p.category === selectedCategory).slice(0, 8);
  }, [selectedCategory]);

  return (
    <section className="py-16 sm:py-28 bg-surface-soft relative" id="projeler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Portföy & Proje Galerisi</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Örnek Proje <span className="text-brand-600">Modellerimiz</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Çiftlik barınaklarından müstakil evlere, çelik hangarlardan depolara kadar standart modellerimizi inceleyin.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/30 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Frame */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-700">
                    {project.capacity || project.categoryLabel}
                  </div>

                  {project.buildingSystem && (
                    <div className="absolute top-3 right-3 bg-brand-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                      {project.buildingSystem}
                    </div>
                  )}

                  {/* Lightbox Trigger */}
                  <button
                    onClick={() => setLightboxProject(project)}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-900 hover:bg-brand-600 hover:text-white flex items-center justify-center shadow transition-colors"
                    aria-label="Önizle"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                    <span className="text-brand-400 font-bold">{project.dimensions?.totalArea || project.totalArea} m²</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-2">
                  <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0 mt-2">
                <Link
                  href={`/projeler/${project.slug}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-surface-soft hover:bg-brand-600 text-slate-800 hover:text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all border border-slate-200 hover:border-brand-600"
                >
                  <span>Projeyi İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/projeler"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all space-x-2"
          >
            <span>Tüm Projeleri ve Model Kataloğunu Gör</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-brand-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-96 w-full bg-black">
              <img
                src={lightboxProject.mainImage}
                alt={lightboxProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-600 uppercase">
                  {lightboxProject.categoryLabel}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {lightboxProject.dimensions?.totalArea} m² Net Alan
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                {lightboxProject.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {lightboxProject.fullDescription}
              </p>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setLightboxProject(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Kapat
                </button>
                <Link
                  href={`/projeler/${lightboxProject.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow transition-colors"
                >
                  Detaylı Sayfaya Git →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
