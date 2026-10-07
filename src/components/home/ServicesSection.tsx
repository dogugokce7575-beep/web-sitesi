import React from "react";
import Link from "next/link";
import { 
  Building2, 
  Home, 
  Warehouse, 
  Layers, 
  ShieldCheck, 
  Hammer, 
  ArrowRight,
  CheckCircle2,
  Tractor,
  Compass
} from "lucide-react";
import { servicesData } from "@/data/services";

const iconMap: Record<string, any> = {
  Warehouse,
  Building2,
  Home,
  Layers,
  ShieldCheck,
  Hammer,
  Tractor,
  Compass
};

export default function ServicesSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
              <Building2 className="w-3.5 h-3.5 text-brand-600" />
              <span>Faaliyet Alanlarımız</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              A'dan Z'ye <span className="text-brand-600">Anahtar Teslim</span> Yapı Hizmetleri
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Türkiye'nin her bölgesinde ihtiyacınıza özel projelendirilmiş, zemin betonundan çatı izolasyonuna kadar tek elden eksiksiz teslim edilen yapılar.
            </p>
          </div>

          <Link
            href="/hizmetler"
            className="inline-flex items-center px-5 py-3 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition-colors self-start lg:self-auto shadow-md"
          >
            <span>Tüm Hizmet Detayları</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* 6 Services Grid with Rich Imagery and Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName] || Building2;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Visual Frame */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={`${service.title} - Gökçe İnşaat ve Yapı`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="absolute top-4 right-4 bg-slate-900/90 text-slate-200 border border-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      Anahtar Teslim
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-heading font-extrabold text-lg text-white drop-shadow-md">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Feature check items */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-100">
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors"
                  >
                    <span>Detayları İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/teklif-al?hizmet=${service.slug}`}
                    className="px-3.5 py-1.5 rounded-lg bg-surface-soft group-hover:bg-brand-600 group-hover:text-white text-slate-800 text-xs font-bold border border-slate-200 group-hover:border-brand-600 shadow-sm transition-all"
                  >
                    Teklif Al
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
