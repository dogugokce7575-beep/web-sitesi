import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RehberClient from "@/components/rehber/RehberClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Çiftlik ve Hayvancılık Rehberi | Gökçe İnşaat ve Yapı",
  description: "Büyükbaş ve küçükbaş çiftlik planlama, model seçimi, yapı sistemleri, maliyet analizleri ve çiftlik destek modelleri teknik rehberi.",
  alternates: {
    canonical: `${siteConfig.url}/rehber`,
  },
};

export default function RehberPage() {
  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs items={[{ label: "Rehber" }]} />

        {/* Page Header */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-premium border border-anthracite-800">
          <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Gökçe İnşaat ve Yapı Teknik Bilgi Merkezi</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Çiftlik ve Ahır <br />
              <span className="text-gradient-orange">Yatırım Rehberi</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Büyükbaş çiftlik yatırımınızı planlarken arsa seçiminden çelik karkas mukavemetine, hayvan refahından metrekare maliyet analizlerine kadar bilmeniz gereken mühendislik kılavuzları.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/ciftlik-fiyatlari"
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-brand-600/30 transition-all"
              >
                <span>Fiyat Hesaplama Aracını Aç</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projeler"
                className="px-6 py-3 rounded-xl bg-anthracite-900 hover:bg-anthracite-800 border border-anthracite-700 text-white font-bold text-xs transition-all"
              >
                <span>Model Kataloğunu İncele</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter & Articles Grid */}
        <RehberClient />

        {/* Rehber CTA Box */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl max-w-4xl mx-auto border border-anthracite-800">
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Projenizi Doğru Planlamaya Hazır mısınız?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Arazinize ve bütçenize en uygun çiftlik modelini belirlemek için model kataloğumuzu inceleyebilir veya kendi ölçülerinize göre anında maliyet hesabı yapabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/projeler"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all border border-slate-700"
            >
              <span>Model Kataloğunu İncele</span>
            </Link>
            <Link
              href="/ciftlik-fiyatlari"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
            >
              <span>Kademeli & Özel Fiyat Hesapla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
