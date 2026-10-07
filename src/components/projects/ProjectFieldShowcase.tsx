"use client";

import React from "react";
import { 
  Building2, 
  CheckCircle2, 
  Play, 
  Ruler, 
  ShieldCheck 
} from "lucide-react";
import { getPublishedInstagramPosts } from "@/lib/instagram-store";

interface ProjectFieldShowcaseProps {
  modelSlug?: string;
  capacity?: number;
  modelType?: string;
}

export default function ProjectFieldShowcase({ modelSlug, capacity, modelType }: ProjectFieldShowcaseProps) {
  const allPublished = getPublishedInstagramPosts();
  
  // Model veya kapasiteye göre eşleşen onaylı saha projeleri
  const matchingPosts = allPublished.filter((p) => {
    if (capacity && p.capacity === capacity) return true;
    if (modelType && p.modelType === modelType) return true;
    return false;
  });

  const displayPosts = matchingPosts.length > 0 ? matchingPosts : allPublished.slice(0, 2);

  if (displayPosts.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-700 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Saha Uygulamaları & Referans İmalatlar</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl text-slate-900">
            Sahada Uygulanan ve Teslim Edilen Gerçek Projelerimiz
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
            <span>Doğrulanmış Şantiye Kaydı</span>
          </span>
        </div>
      </div>

      {/* Verified Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayPosts.map((post) => (
          <div
            key={post.id}
            className="bg-surface-soft rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between group hover:border-brand-500 transition-all duration-300"
          >
            <div>
              {/* Media Frame (Local media from /images) */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={post.localMediaUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                {post.mediaType === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/40 backdrop-blur-md text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-600 transition-all">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                )}

                {/* Capacity & System Tag */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  {post.capacity && (
                    <span className="bg-brand-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg shadow">
                      {post.capacity} Baş
                    </span>
                  )}
                  {post.modelType && (
                    <span className="bg-slate-900/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 backdrop-blur-sm">
                      Model {post.modelType}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="text-slate-300">{post.buildingSystem || "Çelik"} Taşıyıcı Karkas</span>
                  {post.length && post.width && (
                    <span className="text-brand-400 font-bold">{post.length}×{post.width} m ({post.totalArea} m²)</span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2.5">
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                  {post.title}
                </h4>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {post.fullDescription}
                </p>

                {/* Scope Specs */}
                {post.features && post.features.length > 0 && (
                  <div className="space-y-1 pt-2 border-t border-slate-200/60 text-[11px] text-slate-700">
                    {post.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-bold text-brand-600">
                {post.estimatedPrice || "Fiyat: Teklif Usulü"}
              </span>

              <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Anahtar Teslim Teslimat</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
