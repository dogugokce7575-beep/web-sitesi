import React from "react";
import Link from "next/link";
import { Home, ArrowRight, Warehouse, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface-soft px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-card animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 mx-auto flex items-center justify-center font-heading font-black text-2xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-extrabold text-2xl text-slate-900">
            Sayfa Bulunamadı
          </h1>
          <p className="text-sm text-slate-500">
            Aradığınız sayfa taşınmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
          </p>
        </div>

        <div className="flex flex-col space-y-2.5 pt-2">
          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <Link
            href="/hizmetler"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2"
          >
            <Warehouse className="w-4 h-4" />
            <span>Hizmetleri İncele</span>
          </Link>

          <Link
            href="/projeler"
            className="w-full py-3 px-4 rounded-xl bg-surface-soft hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center space-x-2 border border-slate-200"
          >
            <Layers className="w-4 h-4" />
            <span>Model Kataloğunu İncele</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
