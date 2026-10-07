"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Video, 
  ChevronLeft, 
  ChevronRight, 
  HardHat, 
  Sparkles, 
  Camera, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Play
} from "lucide-react";
import { REFERENCE_VIDEOS, REFERENCE_PHOTOS } from "@/data/media";

function VideoThumbnailPreview({
  src,
  alt,
  isActive,
  index,
  onClick,
}: {
  src: string;
  alt: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0.001;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all bg-slate-950 ${
        isActive
          ? "border-brand-500 scale-105 shadow-md shadow-brand-500/30 ring-2 ring-brand-500/50"
          : "border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600"
      }`}
      aria-label={alt}
    >
      <video
        ref={videoRef}
        src={`${src}#t=0.001`}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute bottom-1 right-1 text-[10px] font-bold bg-black/80 text-white px-1.5 py-0.5 rounded shadow">
        #{index + 1}
      </span>
    </button>
  );
}

export default function AboutReferenceGallery() {
  const [activeTab, setActiveTab] = useState<"slider" | "grid" | "photo">("slider");
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const featuredVideos = REFERENCE_VIDEOS.slice(0, 12);
  const totalSlides = featuredVideos.length;

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setSliderIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setSliderIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay for slider
  useEffect(() => {
    if (isHovered || activeTab !== "slider" || totalSlides <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, activeTab, totalSlides, nextSlide]);

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
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="space-y-8 my-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200 mb-2">
            <HardHat className="w-3.5 h-3.5 text-brand-600" />
            <span>Saha Portföyümüz</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Şantiye & Montaj <span className="text-brand-600">Referanslarımız</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Türkiye genelinde tamamladığımız çelik konstrüksiyon, çatı sandviç panel ve çiftlik karkas saha montajlarından {REFERENCE_VIDEOS.length} gerçek video ve saha kaydı.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          <button
            onClick={() => setActiveTab("slider")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "slider"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Öne Çıkan Slider</span>
          </button>

          <button
            onClick={() => setActiveTab("grid")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "grid"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Tüm Videolar ({REFERENCE_VIDEOS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("photo")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "photo"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Saha Fotoğrafları ({REFERENCE_PHOTOS.length})</span>
          </button>
        </div>
      </div>

      {/* 1. SLIDER VIEW (Featured Videos) */}
      {activeTab === "slider" && totalSlides > 0 && (
        <div 
          className="relative bg-anthracite-950 rounded-3xl overflow-hidden border border-anthracite-800 shadow-premium group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Video Display */}
          <div className="relative h-80 sm:h-[480px] w-full overflow-hidden flex items-center justify-center bg-black">
            {featuredVideos.map((video, idx) => (
              <div
                key={video.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${
                  idx === sliderIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <video
                  src={Math.abs(idx - sliderIndex) <= 1 ? video.path : undefined}
                  autoPlay={idx === sliderIndex}
                  muted
                  loop
                  playsInline
                  preload={idx === sliderIndex ? "auto" : "none"}
                  className="w-full h-full object-contain sm:object-cover"
                />
              </div>
            ))}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 z-20 pointer-events-none" />

            {/* Badge & Info Overlay */}
            <div className="absolute top-6 left-6 z-30 flex items-center space-x-2">
              <span className="bg-brand-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>{featuredVideos[sliderIndex]?.title || "Şantiye Kaydı"}</span>
              </span>
              <span className="bg-black/60 backdrop-blur-sm text-slate-300 border border-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                81 İlde Saha Montajı
              </span>
            </div>

            {/* Arrow Navigation */}
            <button
              onClick={(e) => {
                e.preventDefault();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-600 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
              aria-label="Önceki Video"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-600 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
              aria-label="Sonraki Video"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Title Bar */}
            <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <h3 className="font-heading font-black text-lg sm:text-2xl text-white drop-shadow-md">
                  {featuredVideos[sliderIndex]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 drop-shadow">
                  {featuredVideos[sliderIndex]?.altText}
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-xs font-bold shrink-0 self-start sm:self-auto">
                <span>{sliderIndex + 1} / {totalSlides}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Bar: Gerçek video önizlemesi (1–12) */}
          <div className="p-4 bg-anthracite-900 border-t border-anthracite-800 flex items-center space-x-3 overflow-x-auto scrollbar-none">
            {featuredVideos.map((video, idx) => (
              <VideoThumbnailPreview
                key={video.id}
                src={video.path}
                alt={video.title}
                isActive={idx === sliderIndex}
                index={idx}
                onClick={() => setSliderIndex(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. GRID VIEW (All Active Videos) */}
      {activeTab === "grid" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {REFERENCE_VIDEOS.map((video, idx) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-card hover:border-brand-500 transition-all flex flex-col justify-between group"
              >
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                  <video
                    src={`${video.path}#t=0.001`}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0.001; }}
                    onClick={(e) => {
                      if (e.currentTarget.paused) {
                        e.currentTarget.play().catch(() => {});
                      } else {
                        e.currentTarget.pause();
                      }
                    }}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    Kayıt #{idx + 1}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-brand-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
                    Şantiye
                  </div>
                </div>

                <div className="p-3 bg-white">
                  <h4 className="font-heading font-bold text-xs text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {video.altText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PHOTO VIEW */}
      {activeTab === "photo" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {REFERENCE_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-premium hover:border-brand-500 transition-all"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={photo.path}
                  alt={photo.altText}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-900">{photo.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{photo.altText}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA Strip */}
      <div className="p-6 bg-gradient-to-r from-brand-600 to-orange-600 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-brand-600/20">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-heading font-black text-lg sm:text-xl">
            Sizin Arsanıza da Anahtar Teslim Çiftlik İnşa Edelim
          </h4>
          <p className="text-xs sm:text-sm text-brand-100">
            81 ilde anahtar teslim çelik konstrüksiyon, mimari ve statik projelendirme güvencesi.
          </p>
        </div>

        <Link
          href="/teklif-al"
          className="px-6 py-3 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-bold text-xs sm:text-sm flex items-center space-x-2 shrink-0 shadow-md transition-all active:scale-95"
        >
          <span>Ücretsiz Keşif & Teklif İste</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
