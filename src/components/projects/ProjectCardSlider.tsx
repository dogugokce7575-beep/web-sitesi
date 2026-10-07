"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Calculator, 
  ImageOff 
} from "lucide-react";
import { Project } from "@/types";

interface ProjectCardSliderProps {
  project: Project;
}

export default function ProjectCardSlider({ project }: ProjectCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const images = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : (project.mainImage ? [project.mainImage] : []);

  const total = images.length;

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const hasImages = total > 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover hover:border-brand-500 transition-all flex flex-col justify-between group">
      <div>
        {/* Slider Media Area */}
        <div 
          className="relative h-48 w-full overflow-hidden bg-slate-950 select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {hasImages ? (
            <>
              {/* Image Stack */}
              {images.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title} - Görsel ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? "lazy" : "lazy"}
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-20 pointer-events-none" />

              {/* Navigation Arrows */}
              {total > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/60 hover:bg-brand-600 text-white flex items-center justify-center backdrop-blur-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-90"
                    aria-label="Önceki Görsel"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/60 hover:bg-brand-600 text-white flex items-center justify-center backdrop-blur-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-90"
                    aria-label="Sonraki Görsel"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Badges */}
              {project.capacity && (
                <div className="absolute top-2.5 left-2.5 z-30 bg-brand-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                  {project.capacity}
                </div>
              )}

              {project.buildingSystem && (
                <div className="absolute top-2.5 right-2.5 z-30 bg-slate-900/90 text-slate-200 border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  {project.buildingSystem}
                </div>
              )}

              {/* Bottom Counter & Total Area */}
              <div className="absolute bottom-2 left-3 right-3 z-30 flex items-center justify-between text-white text-xs">
                <span className="text-brand-400 font-extrabold text-[11px]">
                  {project.totalArea || project.dimensions?.totalArea} m²
                </span>
                {total > 1 && (
                  <span className="text-[10px] font-semibold text-slate-200 bg-black/60 px-1.5 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                    {currentIndex + 1} / {total}
                  </span>
                )}
              </div>

              {/* Dot Indicators */}
              {total > 1 && (
                <div className="absolute bottom-1 left-0 right-0 z-30 flex items-center justify-center space-x-1">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentIndex(idx);
                      }}
                      className={`h-1 rounded-full transition-all ${
                        idx === currentIndex ? "w-3 bg-brand-500" : "w-1 bg-white/40"
                      }`}
                      aria-label={`Görsel ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center text-center p-4 text-slate-400 space-y-2 bg-slate-900">
              <ImageOff className="w-8 h-8 text-slate-600" />
              <p className="text-[11px] leading-tight font-medium text-slate-400 max-w-[200px]">
                Bu kapasite için henüz proje görseli bulunmamaktadır.
              </p>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
            {project.title}
          </h3>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1 border-t border-slate-100">
            <div>
              <span className="text-slate-400 block text-[10px]">Ölçü:</span>
              <span className="font-bold text-slate-800">
                {project.length && project.width ? `${project.length} × ${project.width} m` : "Standart"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Alan:</span>
              <span className="font-bold text-brand-600">
                {project.totalArea || project.dimensions?.totalArea} m²
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions: NO PRICES SHOWN */}
      <div className="p-4 pt-0 flex items-center space-x-2">
        <Link
          href={`/projeler/${project.slug}`}
          className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-800 hover:text-white text-xs font-bold text-center transition-colors"
        >
          İncele
        </Link>

        <Link
          href={`/ciftlik-fiyatlari?model=${project.modelType || 'A'}&kapasite=${project.capacityValue || 50}`}
          className="flex-1 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold text-center transition-colors shadow-sm flex items-center justify-center space-x-1"
        >
          <Calculator className="w-3 h-3" />
          <span>Fiyat Hesapla</span>
        </Link>
      </div>
    </div>
  );
}
