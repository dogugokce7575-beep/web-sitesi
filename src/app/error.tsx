"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-surface-soft px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-card">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-heading font-bold text-xl text-slate-900">
            Bir Hata Oluştu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Sayfa yüklenirken beklenmeyen bir durum meydana geldi. Lütfen tekrar deneyiniz.
          </p>
        </div>

        <div className="flex flex-col space-y-2 pt-2">
          <button
            onClick={() => reset()}
            className="w-full py-3 px-4 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeniden Dene</span>
          </button>

          <Link
            href="/"
            className="w-full py-2.5 px-4 rounded-xl bg-surface-soft hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center space-x-1"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Anasayfaya Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
