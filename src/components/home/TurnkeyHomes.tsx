import React from "react";
import Link from "next/link";
import { Home, ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { projectsData } from "@/data/projects";

export default function TurnkeyHomes() {
  const homeProjects = projectsData.filter((p) => p.category === "ev");

  return (
    <section className="py-16 sm:py-28 bg-surface-soft relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
              <Home className="w-3.5 h-3.5 text-brand-600" />
              <span>Anahtar Teslim Müstakil Konutlar</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Türkiye Geneli, <span className="text-brand-600">Modern Müstakil Evler</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Kışın sıcacık, yazın ferah. A sınıfı taş yünü yalıtımlı, 3 camlı ısıcamlı, mutfak dolabından seramiğine kadar kullanıma hazır anahtar teslim konutlar.
            </p>
          </div>

          <Link
            href="/projeler?kategori=ev"
            className="inline-flex items-center px-5 py-3 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition-colors self-start lg:self-auto shadow-sm"
          >
            <span>Tüm Konut Modelleri</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Homes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {homeProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-500 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Large Image Frame */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.mainImage}
                  alt={`${project.title} - Gökçe İnşaat ve Yapı`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Plan Badge */}
                <div className="absolute top-4 left-4 bg-brand-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{project.capacity}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white drop-shadow-md">
                  <span className="font-heading font-extrabold text-lg sm:text-xl">
                    {project.title}
                  </span>
                  <span className="text-xs font-bold bg-brand-600 px-3 py-1.5 rounded-xl">
                    {project.dimensions?.totalArea} m² Net Alan
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-4">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Features Check grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
                  {project.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/projeler/${project.slug}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-surface-soft hover:bg-slate-900 text-slate-900 hover:text-white font-bold text-xs text-center transition-colors flex items-center justify-center space-x-1.5 border border-slate-200 hover:border-slate-900"
                  >
                    <span>Kat Planı & Detaylar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/teklif-al?proje=${project.slug}`}
                    className="py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs text-center transition-colors shadow-md shadow-brand-600/20"
                  >
                    Teklif Al
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
