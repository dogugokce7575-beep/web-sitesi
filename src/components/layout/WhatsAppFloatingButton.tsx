"use client";

import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.defaultWhatsappMessage
  )}`;

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-40 flex items-center space-x-2.5">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center bg-anthracite-950 text-white text-xs font-semibold py-2.5 px-3.5 rounded-2xl shadow-xl border border-brand-500/40 animate-fadeIn relative">
          <span>WhatsApp'tan Hızlı Fiyat ve Bilgi Alın</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="ml-2 text-slate-400 hover:text-white p-0.5 rounded-full"
            aria-label="Kapat"
          >
            <X className="w-3 h-3" />
          </button>
          {/* Arrow */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-anthracite-950 border-t border-r border-brand-500/40 rotate-45" />
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-900/30 transition-all duration-200 hover:scale-105 active:scale-95 group relative"
        aria-label="WhatsApp Destek Hattı"
      >
        <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-500 border-2 border-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-500 border-2 border-white rounded-full" />
      </a>
    </div>
  );
}
