"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Video, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Building2, 
  HardHat, 
  Layers, 
  Calculator,
  Film,
  Camera
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { REFERENCE_VIDEOS, REFERENCE_PHOTOS } from "@/data/media";
import { siteConfig } from "@/config/site";

export default function ReferencesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "photos">("all");

  const displayedVideos = activeTab === "featured" 
    ? REFERENCE_VIDEOS.slice(0, 12) 
    : REFERENCE_VIDEOS;

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, web sitenizdeki referans şantiye videolarını ve fotoğraflarını inceledim. Arsam için anahtar teslim çiftlik yapımı hakkında bilgi almak istiyorum."
  )}`;

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs items={[{ label: "Referans Projeler & Videolar" }]} />

        {/* Hero Header */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-premium border border-anthracite-800">
          <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <HardHat className="w-3.5 h-3.5" />
              <span>Gerçek Saha İmalatı ve Montaj Kayıtları</span>
            </div>
            
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Gerçek Şantiye <br />
              <span className="text-gradient-orange">Referans ve Yapım Kayıtları</span>
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Türkiye genelinde tamamladığımız çelik konstrüksiyon, prefabrik ve betonarme çiftlik projelerimizin şantiye montaj süreçlerini ve saha uygulamalarını inceleyin.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/ciftlik-fiyatlari"
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-brand-600/30 transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Kademeli Fiyat Hesapla</span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center space-x-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp ile Bilgi Al</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-surface-soft text-slate-700 hover:bg-slate-200"
            }`}
          >
            Tüm Şantiye Videoları ({REFERENCE_VIDEOS.length})
          </button>

          <button
            onClick={() => setActiveTab("featured")}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === "featured"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-surface-soft text-slate-700 hover:bg-slate-200"
            }`}
          >
            Öne Çıkan Kayıtlar (12)
          </button>

          <button
            onClick={() => setActiveTab("photos")}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === "photos"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-surface-soft text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Şantiye Fotoğrafları ({REFERENCE_PHOTOS.length})</span>
            </span>
          </button>
        </div>

        {/* Video Grid */}
        {activeTab !== "photos" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="font-semibold">
                Toplam <strong className="text-slate-900">{displayedVideos.length}</strong> adet şantiye kaydı gösteriliyor
              </span>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                Ses oynatılmaz • Otomatik döngü
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVideos.map((video, idx) => (
                <div
                  key={video.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-premium hover:border-brand-500 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-[9/16] max-h-[460px] w-full bg-slate-950 overflow-hidden">
                    <video
                      src={`${video.path}#t=0.001`}
                      autoPlay={idx < 2}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-3 left-3 bg-anthracite-950/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-anthracite-800 flex items-center space-x-1">
                      <Film className="w-3 h-3 text-brand-400" />
                      <span>{video.title}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3 pt-6 rounded-b-2xl">
                      <p className="text-xs font-bold text-white">
                        Gökçe İnşaat ve Yapı Saha Uygulaması
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {video.altText}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-slate-500">81 İlde Mobil Şantiye</span>
                    <Link
                      href="/teklif-al"
                      className="font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
                    >
                      <span>Teklif İste</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REFERENCE_PHOTOS.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card space-y-3 hover:border-brand-500 transition-all"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={photo.path}
                      alt={photo.altText}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 pt-0">
                    <h3 className="font-bold text-sm text-slate-900">{photo.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{photo.altText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Trust CTA */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-anthracite-800">
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Sizin Projenizi de Aynı Güvenle İnşa Edelim
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Türkiye'nin 81 ilinde mobil şantiyelerimizle anahtar teslim çiftlik, ahır ve endüstriyel depo projeleri üretiyoruz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/ciftlik-fiyatlari"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Fiyat Hesaplama Aracını Aç</span>
            </Link>
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all"
            >
              <span>Ücretsiz Keşif & Teklif Al</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
