import React from "react";
import { Building2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-surface-soft">
      <div className="w-12 h-12 rounded-2xl bg-brand-900 text-accent-400 flex items-center justify-center animate-bounce shadow-lg">
        <Building2 className="w-6 h-6" />
      </div>
      <p className="text-xs font-bold text-brand-900 uppercase tracking-widest animate-pulse">
        Yükleniyor...
      </p>
    </div>
  );
}
