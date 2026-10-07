"use client";

import React, { useState } from "react";
import { Calculator, Info, ShieldCheck, ArrowRight, HelpCircle, Ruler, Maximize2 } from "lucide-react";
import { 
  PRICING_CONFIG, 
  calculateEstimatedCost, 
  formatCurrency, 
  formatUnitCost,
  getModelDimensions 
} from "@/config/pricing";
import { BuildingSystemType, ModelTypeCode } from "@/types";
import { BUILDING_SYSTEMS } from "@/data/projects";

interface PriceCalculatorProps {
  initialArea?: number;
  capacityValue?: number;
  initialSystem?: BuildingSystemType;
  modelType?: ModelTypeCode | string;
  allowSystemChange?: boolean;
  showBreakdown?: boolean;
  className?: string;
  onSystemChange?: (system: BuildingSystemType) => void;
}

export default function PriceCalculator({
  initialArea,
  capacityValue,
  initialSystem = "Çelik",
  modelType,
  allowSystemChange = true,
  showBreakdown = true,
  className = "",
  onSystemChange,
}: PriceCalculatorProps) {
  const [selectedSystem, setSelectedSystem] = useState<BuildingSystemType>(initialSystem);

  // Kapasite ve model kodundan dinamik ölçü ve alan hesabı
  const dim = capacityValue ? getModelDimensions(capacityValue, modelType) : null;
  const currentArea = dim ? dim.totalArea : (initialArea || 300);
  
  const calc = calculateEstimatedCost(currentArea, selectedSystem, modelType);
  const isAcikBesi = modelType === "E" || (typeof modelType === "string" && (modelType.toLowerCase().includes("açık") || modelType.toLowerCase().includes("acik")));

  const handleSystemSelect = (sys: BuildingSystemType) => {
    setSelectedSystem(sys);
    if (onSystemChange) {
      onSystemChange(sys);
    }
  };

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card space-y-5 ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2 text-slate-900">
          <Calculator className="w-5 h-5 text-brand-600" />
          <h3 className="font-heading font-extrabold text-sm sm:text-base">
            Tahmini Yapım Maliyeti Hesabı
          </h3>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Dinamik m² Hesabı
        </span>
      </div>

      {/* Main Calculated Price Display */}
      <div className="p-4 sm:p-5 bg-brand-50 rounded-2xl border border-brand-100 space-y-1.5 text-center">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-800 block">
          TAHMİNİ ANAHTAR TESLİM YAPIM MALİYETİ
        </span>
        <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-brand-900 tracking-tight">
          {calc.totalCostFormatted}
        </div>
        {showBreakdown && (
          <p className="text-xs font-semibold text-brand-700 pt-0.5">
            {calc.calculationText}
          </p>
        )}
      </div>

      {/* Breakdown Details Grid (Ölçüler, Alan, Birim Maliyet, Yapı Sistemi) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        {dim && (
          <div className="bg-surface-soft p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Proje Ölçüleri:</span>
            <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{dim.dimensionsText}</span>
          </div>
        )}

        <div className="bg-surface-soft p-3 rounded-xl border border-slate-100">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Toplam Alan:</span>
          <span className="font-extrabold text-brand-600 text-xs sm:text-sm">{currentArea} m²</span>
        </div>

        <div className="bg-surface-soft p-3 rounded-xl border border-slate-100">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Birim Maliyet:</span>
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{calc.unitCostFormatted}</span>
        </div>

        <div className="bg-surface-soft p-3 rounded-xl border border-slate-100">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Yapı Sistemi:</span>
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
            {isAcikBesi ? "Açık Besi" : `${selectedSystem}`}
          </span>
        </div>
      </div>

      {/* Interactive Building System Switcher (if enabled and not Açık Besi special model) */}
      {allowSystemChange && !isAcikBesi && (
        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-slate-700 block">
            Taşıyıcı Yapı Sistemi Seçin (Fiyat Canlı Güncellenir):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {BUILDING_SYSTEMS.map((sys) => {
              const sysCost = PRICING_CONFIG.unitCosts[sys === "Prefabrik" ? "prefabrik" : (sys === "Betonarme" ? "betonarme" : "celik")];
              const isSelected = selectedSystem === sys;
              return (
                <button
                  key={sys}
                  type="button"
                  onClick={() => handleSystemSelect(sys)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-brand-500/20"
                      : "bg-surface-soft text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  <span className="block font-bold text-xs">{sys}</span>
                  <span className={`block text-[10px] mt-0.5 ${isSelected ? "text-brand-300 font-semibold" : "text-slate-500"}`}>
                    {formatUnitCost(sysCost)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pricing Disclaimer Note */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {PRICING_CONFIG.disclaimer}
        </p>
      </div>

    </div>
  );
}
