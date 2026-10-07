"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Calculator, 
  Layers, 
  Maximize2 
} from "lucide-react";
import { CoreCatalogModel } from "@/data/projects";

interface ModelCardSliderProps {
  model: CoreCatalogModel;
}

export default function ModelCardSlider({ model }: ModelCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const images = model.gallery && model.gallery.length > 0 ? model.gallery : [model.mainImage];
  const total = images.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay (4.5s) when not hovered
  useEffect(() => {
    if (isHovered || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, total, nextSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide(); // swipe left
    } else if (diff < -45) {
      prevSlide(); // swipe right
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-premium hover:border-brand-500 transition-all duration-300 flex flex-col justify-between group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Slider Media Container */}
        <div 
          className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images Stack */}
          {images.map((imgSrc, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={imgSrc}
                alt={`${model.name} - Görsel ${idx + 1}`}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}

          {/* Gradient Overlay for badges & text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30 z-20 pointer-events-none" />

          {/* Model Badge */}
          <div className="absolute top-4 left-4 z-30 bg-brand-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5">
            <span>{model.badge}</span>
          </div>

          {/* Width / Dimension Tag */}
          <div className="absolute top-4 right-4 z-30 bg-anthracite-950/90 text-slate-200 border border-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm shadow-sm">
            {model.widthText}
          </div>

          {/* Navigation Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-brand-600 text-white flex items-center justify-center backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-90"
                aria-label="Önceki Görsel"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-brand-600 text-white flex items-center justify-center backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-90"
                aria-label="Sonraki Görsel"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Bottom Info Bar: Capacity & Image Counter */}
          <div className="absolute bottom-3 left-4 right-4 z-30 flex items-center justify-between text-white text-xs">
            <span className="font-bold text-slate-200 drop-shadow-sm">{model.capacityRange}</span>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-brand-300 bg-black/60 px-2 py-0.5 rounded border border-brand-800/40 backdrop-blur-sm">
                {currentIndex + 1} / {total} Gerçek Çizim
              </span>
            </div>
          </div>

          {/* Dots Pagination */}
          {total > 1 && (
            <div className="absolute bottom-1 left-0 right-0 z-30 flex items-center justify-center space-x-1 pb-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "w-5 bg-brand-500" 
                      : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Görsel ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <h3 className="font-heading font-black text-xl text-slate-900 group-hover:text-brand-600 transition-colors">
            {model.name}
          </h3>
          
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[3rem]">
            {model.shortDescription}
          </p>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Yapı Seçenekleri:</span>
            <span className="font-bold text-slate-800">Ağır Çelik / Prefabrik / Beton</span>
          </div>
        </div>
      </div>

      {/* Card Actions (Projeyi İncele + Fiyat Hesapla) */}
      <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5">
        <Link
          href={`/projeler/${model.slug}`}
          className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
        >
          <span>Projeyi İncele</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href={`/ciftlik-fiyatlari?model=${model.code}`}
          className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs text-center transition-colors shadow-sm flex items-center justify-center space-x-1.5"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Fiyat Hesapla</span>
        </Link>
      </div>
    </div>
  );
}
