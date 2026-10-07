import React from "react";

interface BlueprintProps {
  type: "section" | "plan" | "house" | "steel";
  capacity?: number;
  modelCode?: string;
  dimensions?: string;
  className?: string;
}

export default function BlueprintIllustration({
  type = "section",
  capacity = 50,
  modelCode = "C",
  dimensions = "25m × 12m",
  className = "",
}: BlueprintProps) {
  if (type === "section") {
    return (
      <div className={`relative bg-slate-950 text-white rounded-2xl p-4 overflow-hidden border border-slate-800 shadow-inner ${className}`}>
        {/* Technical Grid Background */}
        <div className="absolute inset-0 bg-blueprint-pattern opacity-20 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-400 font-bold">
              MİMARİ KESİT ŞEMASI — MODEL {modelCode}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">ÖLÇEK: 1/50 STATİK PROJE</span>
        </div>

        {/* SVG Architectural Cross-Section */}
        <svg
          viewBox="0 0 600 280"
          className="w-full h-auto text-slate-300 font-mono select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground Line */}
          <line x1="20" y1="230" x2="580" y2="230" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="20" y1="235" x2="580" y2="235" stroke="#334155" strokeWidth="1" />
          <text x="30" y="250" fill="#64748b" fontSize="10">±0.00 TABİİ ZEMİN KOTU</text>

          {/* Concrete Foundation / Subasman */}
          <rect x="50" y="215" width="500" height="15" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="230" y="226" fill="#38bdf8" fontSize="9" fontWeight="bold">C25/30 HASIR ÇELİKLİ SAHA BETONU</text>

          {/* Manure Channels (Sol & Sağ Sıyırıcı Yolu) */}
          <rect x="130" y="210" width="70" height="8" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
          <rect x="400" y="210" width="70" height="8" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
          <text x="135" y="205" fill="#f97316" fontSize="8">SIYIRICI YOLU</text>
          <text x="405" y="205" fill="#f97316" fontSize="8">SIYIRICI YOLU</text>

          {/* Central Tractor Feeding Alley (Orta Yemleme Yolu) */}
          <rect x="230" y="212" width="140" height="6" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="245" y="195" fill="#f8fafc" fontSize="10" fontWeight="bold">4.20m TRAKTÖR YEM YOLU</text>

          {/* Feed Barriers (Yemlik Kilitleri) */}
          <line x1="230" y1="212" x2="230" y2="160" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="370" y1="212" x2="370" y2="160" stroke="#94a3b8" strokeWidth="2.5" />
          <circle cx="230" cy="160" r="3" fill="#f97316" />
          <circle cx="370" cy="160" r="3" fill="#f97316" />
          <text x="210" y="150" fill="#94a3b8" fontSize="8">YEM KİLİDİ</text>
          <text x="350" y="150" fill="#94a3b8" fontSize="8">YEM KİLİDİ</text>

          {/* Cattle Stall Pens (Padoklar) */}
          <rect x="60" y="170" width="60" height="42" fill="#0f172a" stroke="#64748b" strokeDasharray="3 3" />
          <rect x="480" y="170" width="60" height="42" fill="#0f172a" stroke="#64748b" strokeDasharray="3 3" />
          <text x="68" y="195" fill="#cbd5e1" fontSize="9">PADOK A</text>
          <text x="488" y="195" fill="#cbd5e1" fontSize="9">PADOK B</text>

          {/* Structural Steel Columns (Çelik Taşıyıcı Kolonlar) */}
          <rect x="55" y="80" width="10" height="135" fill="#334155" stroke="#f97316" strokeWidth="1.5" />
          <rect x="535" y="80" width="10" height="135" fill="#334155" stroke="#f97316" strokeWidth="1.5" />

          {/* Steel Roof Trusses (Gabled Roof - Beşik Çatı Makasları) */}
          {/* Main Rafters */}
          <line x1="60" y1="80" x2="280" y2="25" stroke="#f97316" strokeWidth="3" />
          <line x1="540" y1="80" x2="320" y2="25" stroke="#f97316" strokeWidth="3" />
          
          {/* Bottom Chord */}
          <line x1="60" y1="80" x2="540" y2="80" stroke="#f97316" strokeWidth="2.5" />

          {/* Internal Web Truss Members */}
          <line x1="140" y1="80" x2="200" y2="47" stroke="#ea580c" strokeWidth="1.5" />
          <line x1="200" y1="80" x2="280" y2="25" stroke="#ea580c" strokeWidth="1.5" />
          <line x1="460" y1="80" x2="400" y2="47" stroke="#ea580c" strokeWidth="1.5" />
          <line x1="400" y1="80" x2="320" y2="25" stroke="#ea580c" strokeWidth="1.5" />
          <line x1="140" y1="80" x2="140" y2="60" stroke="#ea580c" strokeWidth="1" />
          <line x1="200" y1="80" x2="200" y2="47" stroke="#ea580c" strokeWidth="1" />
          <line x1="400" y1="80" x2="400" y2="47" stroke="#ea580c" strokeWidth="1" />
          <line x1="460" y1="80" x2="460" y2="60" stroke="#ea580c" strokeWidth="1" />

          {/* Ridge Ventilation Cupola (Mahya Doğal Havalandırma Bacası) */}
          <rect x="270" y="12" width="60" height="15" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 265 12 L 300 2 L 335 12 Z" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1" />
          <text x="245" y="4" fill="#38bdf8" fontSize="8" fontWeight="bold">MAHYA BACA ÇIKIŞI</text>

          {/* Airflow Circulation Arrows (Doğal Havalandırma Akışı) */}
          {/* Side inlet airflow */}
          <path d="M 30 110 Q 55 110 80 130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />
          <path d="M 570 110 Q 545 110 520 130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Upward thermal airflow to ridge */}
          <path d="M 270 140 Q 285 80 295 30" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 330 140 Q 315 80 305 30" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Dimension Lines (Yükseklik & Genişlik Ölçüleri) */}
          {/* Total Width Dimension */}
          <line x1="60" y1="265" x2="540" y2="265" stroke="#94a3b8" strokeWidth="1" />
          <line x1="60" y1="260" x2="60" y2="270" stroke="#94a3b8" strokeWidth="1" />
          <line x1="540" y1="260" x2="540" y2="270" stroke="#94a3b8" strokeWidth="1" />
          <text x="260" y="275" fill="#f8fafc" fontSize="10" fontWeight="bold">{dimensions.split("×")[1]?.trim() || "12.00m"} NET GENİŞLİK</text>

          {/* Eave Height Dimension */}
          <line x1="35" y1="80" x2="35" y2="215" stroke="#94a3b8" strokeWidth="1" />
          <line x1="30" y1="80" x2="40" y2="80" stroke="#94a3b8" strokeWidth="1" />
          <line x1="30" y1="215" x2="40" y2="215" stroke="#94a3b8" strokeWidth="1" />
          <text x="8" y="150" fill="#94a3b8" fontSize="8" transform="rotate(-90 8,150)">h=3.80m</text>

          {/* Ridge Height Dimension */}
          <line x1="565" y1="25" x2="565" y2="215" stroke="#94a3b8" strokeWidth="1" />
          <line x1="560" y1="25" x2="570" y2="25" stroke="#94a3b8" strokeWidth="1" />
          <line x1="560" y1="215" x2="570" y2="215" stroke="#94a3b8" strokeWidth="1" />
          <text x="585" y="125" fill="#94a3b8" fontSize="8" transform="rotate(90 585,125)">H=5.20m</text>
        </svg>

        {/* Legend Ribbon */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[10px] text-slate-400 gap-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-1 bg-brand-500 rounded" />
            <span>Çelik Taşıyıcı Karkas</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-1 bg-sky-400 rounded" />
            <span>Doğal Baca Havalandırması</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-1 bg-slate-400 rounded" />
            <span>C25/30 Zemin Betonu</span>
          </div>
        </div>
      </div>
    );
  }

  // Plan Type (Top-down architectural floor plan)
  return (
    <div className={`relative bg-slate-950 text-white rounded-2xl p-4 overflow-hidden border border-slate-800 shadow-inner ${className}`}>
      <div className="absolute inset-0 bg-blueprint-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-400 font-bold">
            KAT & YERLEŞİM PLANI — {capacity} BAŞ ({dimensions})
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">ÜSTTEN MİMARİ GÖRÜNÜŞ</span>
      </div>

      <svg
        viewBox="0 0 600 240"
        className="w-full h-auto text-slate-300 font-mono select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Barn Perimeter Walls */}
        <rect x="30" y="30" width="540" height="180" fill="#0f172a" stroke="#f97316" strokeWidth="2.5" rx="4" />

        {/* Central Tractor Feeding Corridor */}
        <rect x="30" y="90" width="540" height="60" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
        <text x="210" y="125" fill="#f8fafc" fontSize="12" fontWeight="bold">MERKEZİ TRAKTÖR YEM YOLU (4.20m)</text>

        {/* Feeding Troughs & Locks (Top & Bottom) */}
        <line x1="30" y1="90" x2="570" y2="90" stroke="#94a3b8" strokeWidth="2" />
        <line x1="30" y1="150" x2="570" y2="150" stroke="#94a3b8" strokeWidth="2" />

        {/* Top Pens (Padoklar Bölmesi) */}
        <line x1="120" y1="30" x2="120" y2="90" stroke="#64748b" strokeWidth="1.5" />
        <line x1="210" y1="30" x2="210" y2="90" stroke="#64748b" strokeWidth="1.5" />
        <line x1="300" y1="30" x2="300" y2="90" stroke="#64748b" strokeWidth="1.5" />
        <line x1="390" y1="30" x2="390" y2="90" stroke="#64748b" strokeWidth="1.5" />
        <line x1="480" y1="30" x2="480" y2="90" stroke="#64748b" strokeWidth="1.5" />

        <text x="55" y="65" fill="#cbd5e1" fontSize="9">PADOK 1</text>
        <text x="145" y="65" fill="#cbd5e1" fontSize="9">PADOK 2</text>
        <text x="235" y="65" fill="#cbd5e1" fontSize="9">PADOK 3</text>
        <text x="325" y="65" fill="#cbd5e1" fontSize="9">PADOK 4</text>
        <text x="415" y="65" fill="#cbd5e1" fontSize="9">PADOK 5</text>
        <text x="500" y="65" fill="#38bdf8" fontSize="8" fontWeight="bold">REVİR / DOĞUM</text>

        {/* Bottom Pens */}
        <line x1="120" y1="150" x2="120" y2="210" stroke="#64748b" strokeWidth="1.5" />
        <line x1="210" y1="150" x2="210" y2="210" stroke="#64748b" strokeWidth="1.5" />
        <line x1="300" y1="150" x2="300" y2="210" stroke="#64748b" strokeWidth="1.5" />
        <line x1="390" y1="150" x2="390" y2="210" stroke="#64748b" strokeWidth="1.5" />
        <line x1="480" y1="150" x2="480" y2="210" stroke="#64748b" strokeWidth="1.5" />

        <text x="55" y="185" fill="#cbd5e1" fontSize="9">PADOK 6</text>
        <text x="145" y="185" fill="#cbd5e1" fontSize="9">PADOK 7</text>
        <text x="235" y="185" fill="#cbd5e1" fontSize="9">PADOK 8</text>
        <text x="325" y="185" fill="#cbd5e1" fontSize="9">PADOK 9</text>
        <text x="415" y="185" fill="#cbd5e1" fontSize="9">PADOK 10</text>
        <text x="500" y="185" fill="#f97316" fontSize="8" fontWeight="bold">DEPO & SULUK</text>

        {/* Automatic Water Drinkers (Donmaz Suluk Noktaları) */}
        <circle cx="120" cy="70" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="300" cy="70" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="480" cy="70" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="120" cy="170" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="300" cy="170" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="480" cy="170" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />

        {/* External Doors (Traktör Giriş / Çıkış Kapıları) */}
        <rect x="25" y="100" width="10" height="40" fill="#f97316" />
        <rect x="565" y="100" width="10" height="40" fill="#f97316" />
        <text x="3" y="124" fill="#f97316" fontSize="7" transform="rotate(-90 3,124)">GİRİŞ</text>
        <text x="588" y="124" fill="#f97316" fontSize="7" transform="rotate(90 588,124)">ÇIKIŞ</text>

        {/* Overall Dimensions Callout */}
        <line x1="30" y1="225" x2="570" y2="225" stroke="#94a3b8" strokeWidth="1" />
        <text x="250" y="235" fill="#f8fafc" fontSize="9" fontWeight="bold">UZUNLUK: {dimensions.split("×")[0]?.trim() || "25.00m"}</text>
      </svg>

      <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[10px] text-slate-400 gap-2">
        <span className="text-emerald-400 font-bold">✓ TKDK & Bakanlık Hayvancılık Standartlarına %100 Uyumlu</span>
        <span className="text-slate-400">Tüm ölçüler araziye göre revize edilebilir.</span>
      </div>
    </div>
  );
}
