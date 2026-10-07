import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  Warehouse, 
  Building2, 
  Home, 
  Hammer, 
  Tractor, 
  Compass, 
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldCheck 
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Hizmetler | Çiftlik, Ahır ve Anahtar Teslim İnşaat | Gökçe İnşaat",
  description: "Türkiye genelinde anahtar teslim ahır, besi ve süt çiftlikleri, koyun ağılı, yem deposu, gübre çukuru ve çelik yapı çözümleri. Gökçe İnşaat ve Yapı.",
  alternates: {
    canonical: `${siteConfig.url}/hizmetler`,
  },
};

export default function ServicesPage() {
  const iconMap: Record<string, React.ElementType> = {
    Warehouse,
    Building2,
    Home,
    Hammer,
    Tractor,
    Compass,
    Layers,
  };

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Hizmetlerimiz" }]} />

        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
            <span>Hizmet Yelpazemiz</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Anahtar Teslim <span className="text-brand-600">Yapı Hizmetlerimiz</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Planlamadan resmi ruhsata, kaba inşaattan ince işçiliğe kadar tüm projelerinizi baştan sona tek elden yürütüyoruz.
          </p>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName] || Building2;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-lg font-bold text-white drop-shadow-md">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                        Öne Çıkan Özellikler:
                      </p>
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-100">
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="text-xs font-bold text-slate-900 group-hover:text-brand-600 flex items-center transition-colors"
                  >
                    <span>Hizmet Detayları</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>

                  <Link
                    href={`/teklif-al?hizmet=${service.slug}`}
                    className="py-2 px-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Teklif Al
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
