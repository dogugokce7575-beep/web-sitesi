"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function MobileBottomBar() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.defaultWhatsappMessage
  )}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-anthracite-950/95 border-t border-anthracite-800 backdrop-blur-lg px-3 py-2.5 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Call Button */}
        <a
          href={`tel:${siteConfig.contact.phoneClean}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-anthracite-900 active:bg-anthracite-800 text-slate-200 border border-anthracite-700/60 transition-colors"
          aria-label="Telefon ile Ara"
        >
          <Phone className="w-4 h-4 text-brand-500 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Hemen Ara</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-700 active:bg-emerald-800 text-white shadow-sm transition-colors"
          aria-label="WhatsApp Mesaj Gönder"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-200" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Quote Button */}
        <Link
          href="/teklif-al"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brand-600 active:bg-brand-700 text-white shadow-md shadow-brand-600/30 transition-colors"
          aria-label="Teklif Formu"
        >
          <FileText className="w-4 h-4 mb-0.5 text-brand-200" />
          <span className="text-[11px] font-extrabold tracking-tight">Teklif Al</span>
        </Link>

      </div>
    </div>
  );
}
