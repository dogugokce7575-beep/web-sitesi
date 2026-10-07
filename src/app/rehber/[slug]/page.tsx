import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  MessageSquare,
  ShieldCheck,
  HardHat,
  Landmark
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { siteConfig } from "@/config/site";

interface RehberPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: RehberPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  const url = `${siteConfig.url}/rehber/${post.slug}`;
  return {
    title: `${post.title} | Gökçe İnşaat Rehber`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Gökçe İnşaat Rehber`,
      description: post.excerpt,
      url,
      images: [{ url: post.image }],
    },
  };
}

export default function RehberPostDetailPage({ params }: RehberPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const otherPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Merhaba, "${post.title}" başlıklı rehberinizi okudum. Çiftlik projemiz için bilgi ve keşif almak istiyorum.`
  )}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image.startsWith("http") ? post.image : `${siteConfig.url}${post.image}`,
    "datePublished": "2026-07-01",
    "author": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/rehber/${post.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs
          items={[
            { label: "Rehber", href: "/rehber" },
            { label: post.category, href: "/rehber" },
            { label: post.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-8">
            
            {/* Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
                  {post.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {post.publishedAt}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                {post.title}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Featured Image */}
            <div className="relative h-72 sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-card border border-slate-200 bg-slate-900">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6 text-slate-700 leading-relaxed">
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}

              {/* Author / Engineering Note */}
              <div className="p-6 rounded-2xl bg-brand-50 border-l-4 border-brand-600 space-y-2 my-8">
                <p className="font-bold text-slate-900 text-sm">
                  Gökçe İnşaat ve Yapı Mühendislik Notu:
                </p>
                <p className="text-xs sm:text-sm text-slate-700">
                  Tüm projelerimizde bölgesel iklim ve kar yükü parametrelerine göre statik hesaplamalar yapılmakta, TSE belgeli malzeme ve sözleşmeli garanti ile inşa edilmektedir.
                </p>
              </div>

              {/* Related Interactive Navigation Box */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  Bu Makale ile İlgili Araçlar & Sayfalar
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/projeler"
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-500 transition-all flex items-center justify-between group/link"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 group-hover/link:text-brand-600 block">
                        Model Kataloğu (A - E)
                      </span>
                      <span className="text-[11px] text-slate-500">25-250 Baş hazır modelleri inceleyin</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:text-brand-600 transition-colors" />
                  </Link>

                  <Link
                    href="/ciftlik-fiyatlari"
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-500 transition-all flex items-center justify-between group/link"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 group-hover/link:text-brand-600 block">
                        Kademeli & Özel Fiyat Hesapla
                      </span>
                      <span className="text-[11px] text-slate-500">Hazır veya kendi ölçülerinizle anlık hesap</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:text-brand-600 transition-colors" />
                  </Link>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-2">Etiketler:</span>
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-surface-soft text-slate-600 text-xs font-medium border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </article>

          {/* === Çiftlik Destek Modelleri Kategorisine Özel: Biz Ne Yapıyoruz? === */}
          {post.category === "Çiftlik Destek Modelleri" && (
            <div className="lg:col-span-12 space-y-6">
              {/* "Biz Ne Yapıyoruz?" Info Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border-l-4 border-brand-600 border border-slate-200 shadow-card space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shrink-0">
                    <HardHat className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-slate-900">Biz Ne Yapıyoruz?</h3>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <strong>Gökçe İnşaat ve Yapı</strong> olarak temel uzmanlık alanımız; çiftlik, ahır, ağıl, yem deposu, gübre çukuru ve diğer tarımsal yapıların <strong>projelendirilmesi ve inşaat uygulamasıdır.</strong>
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Hibe ve teşvik başvurularında gerekli resmi süreçler ve başvuru şartları ilgili kurumların güncel mevzuat ve çağrılarına göre yürütülmektedir. Başvuru ve hibe danışmanlığı için çalıştığınız danışmanlık firmasıyla veya anlaşmalı olduğumuz danışmanlık firmalarıyla iletişime geçebilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/iletisim"
                    className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-brand-600/30 transition-all"
                  >
                    <HardHat className="w-4 h-4" />
                    <span>İnşaat Projenizi Konuşalım</span>
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Danışmanlık İçin Bilgi Al</span>
                  </a>
                </div>
              </div>

              {/* Danışmanlık Firmalarıyla İş Birliği */}
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-3 mb-1">
                  <Landmark className="w-5 h-5 text-slate-500" />
                  <h4 className="font-heading font-bold text-base text-slate-900">Danışmanlık Firmalarıyla İş Birliği</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Hibe ve teşvik başvurularını yürüten danışmanlık firmalarıyla koordineli şekilde çalışabiliriz. Projenizin inşaat ve uygulama tarafında gerekli yapı çözümleri için Gökçe İnşaat ve Yapı ile iletişime geçebilirsiniz.
                </p>
                <p className="text-xs text-slate-400 italic">
                  Not: Gökçe İnşaat ve Yapı hibe danışmanlığı yapmamaktadır. Danışmanlık firmaları hakkında bilgi almak için bize ulaşabilirsiniz.
                </p>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-brand-600 hover:underline mt-1"
                >
                  <span>Proje İçin İletişime Geç</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Sidebar CTA & Other Guides */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Project Proposal Widget */}
            <div className="bg-anthracite-950 text-white rounded-3xl p-6 sm:p-8 border border-anthracite-800 shadow-card space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
              
              <div className="relative z-10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Ücretsiz Keşif & Danışmanlık
                </span>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Çiftliğinizi Birlikte Planlayalım
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  25 Baş'tan 250 Baş'a kadar standart çiftlik modellerimiz için ücretsiz keşif ve bütçe planlaması talep edin.
                </p>
              </div>

              <div className="relative z-10 space-y-3">
                <Link
                  href="/ciftlik-fiyatlari"
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs text-center shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Fiyat Hesaplayıcıyı Aç</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center space-x-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Danışın</span>
                </a>
              </div>
            </div>

            {/* Other Guides */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
                Diğer Rehber Yazıları
              </h3>

              <div className="space-y-4">
                {otherPosts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/rehber/${p.slug}`}
                    className="block space-y-1 group"
                  >
                    <p className="text-xs text-brand-600 font-semibold">{p.category}</p>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                    <span className="text-[11px] text-slate-400">{p.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
