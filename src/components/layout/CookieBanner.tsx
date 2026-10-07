"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(true); // Default true to avoid SSR flicker

  useEffect(() => {
    const isConsentGiven = localStorage.getItem("gokce_cookie_consent");
    if (!isConsentGiven) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gokce_cookie_consent", "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-16 lg:bottom-4 left-4 right-4 lg:left-8 lg:max-w-md z-50 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-200 animate-fadeIn">
      <div className="flex items-start space-x-3">
        <Cookie className="w-6 h-6 text-brand-800 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-2">
          <p>
            Sitemizdeki kullanıcı deneyimini iyileştirmek ve performans analizi yapmak amacıyla çerezler (cookies) kullanmaktayız. Detaylı bilgi için{" "}
            <Link href="/cerez-politikasi" className="text-brand-900 font-semibold underline">
              Çerez Politikası
            </Link>{" "}
            ve{" "}
            <Link href="/kvkk" className="text-brand-900 font-semibold underline">
              KVKK Metni
            </Link>
            'ni inceleyebilirsiniz.
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 bg-brand-900 hover:bg-brand-950 text-white rounded-md font-semibold text-xs transition-colors"
            >
              Kabul Ediyorum
            </button>
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-xs transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
        <button
          onClick={handleAccept}
          className="text-slate-400 hover:text-slate-600"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
