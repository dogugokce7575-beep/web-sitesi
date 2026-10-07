import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Building2, 
  Warehouse, 
  Home, 
  Layers, 
  ShieldCheck, 
  Hammer, 
  Tractor, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Key,
  HelpCircle,
  MapPin
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { servicesData, getServiceBySlug } from "@/data/services";
import { siteConfig } from "@/config/site";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const url = `${siteConfig.url}/hizmetler/${service.slug}`;
  return {
    title: `${service.title} | Gökçe İnşaat ve Yapı`,
    description: service.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} | Gökçe İnşaat ve Yapı`,
      description: service.shortDescription,
      url,
      images: [{ url: service.image }],
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const iconMap: Record<string, React.ElementType> = {
    Warehouse,
    Building2,
    Home,
    Hammer,
    Tractor,
    Compass,
    Layers,
  };
  const Icon = iconMap[service.iconName] || Building2;

  const whatsappMessage = `Merhaba, web sitenizdeki "${service.title}" hizmetiniz hakkında bilgi ve anahtar teslim teklif almak istiyorum.`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs
          items={[
            { label: "Hizmetlerimiz", href: "/hizmetler" },
            { label: service.title },
          ]}
        />

        {/* Hero Header */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-premium">
          <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                Anahtar Teslim Hizmet
              </span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {service.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Details & Scope */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Visual Frame */}
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-card border border-slate-200 bg-slate-900">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900">
                Hizmet Kapsamı ve Mühendislik Yaklaşımımız
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {service.fullDescription}
              </p>
            </div>

            {/* What's included (Scope) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center space-x-2">
                <Key className="w-5 h-5 text-brand-600" />
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Anahtar Teslim Pakette Neler Var?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.scope.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-2xl bg-surface-soft border border-slate-100 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <h3 className="font-heading font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
                Size Sağladığı Avantajlar
              </h3>

              <div className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-2xl bg-brand-50/70 border border-brand-100 text-xs sm:text-sm text-brand-950 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            {service.faq && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <HelpCircle className="w-5 h-5 text-brand-600" />
                  <h3 className="font-heading font-bold text-xl text-slate-900">
                    Sıkça Sorulan Sorular
                  </h3>
                </div>

                <div className="space-y-4">
                  {service.faq.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-surface-soft border border-slate-100 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm">{item.question}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Conversion Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-brand-600 tracking-wider">
                  Ücretsiz Keşif & Danışmanlık
                </span>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  Bu Hizmet İçin Teklif Alın
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Arazinizin konumunu ve hedeflerinizi paylaşın; mühendislerimiz size özel mimari plan ve maliyet cetveli hazırlasın.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/teklif-al?hizmet=${service.slug}`}
                  className="w-full py-4 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-sm text-center shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Ücretsiz Teklif Formu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center space-x-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Bilgi Al</span>
                </a>

                <a
                  href={`tel:${siteConfig.contact.phoneClean}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center flex items-center justify-center space-x-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Türkiye'nin 81 İlinde Anahtar Teslim</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sözleşmeli Net Fiyat Garantisi</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
