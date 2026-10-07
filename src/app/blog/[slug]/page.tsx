import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  BookOpen, 
  MessageSquare,
  ShieldCheck,
  MapPin
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { siteConfig } from "@/config/site";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Gökçe İnşaat Rehber`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/blog/${params.slug}`,
    },
  };
}

export default function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const otherPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Merhaba, "${post.title}" başlıklı rehber yazınızı okudum. Çiftlik projem için teklif ve bilgi almak istiyorum.`
  )}`;

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs
          items={[
            { label: "Bilgi Merkezi", href: "/blog" },
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

              {/* Author / Trust Quote */}
              <div className="p-6 rounded-2xl bg-brand-50 border-l-4 border-brand-600 space-y-2 my-8">
                <p className="font-bold text-slate-900 text-sm">
                  Gökçe İnşaat ve Yapı Mühendislik Notu:
                </p>
                <p className="text-xs sm:text-sm text-slate-700">
                  Her bölgenin ve arsanın şartları kendine özgüdür. Ezbere çizimler yerine hayvan refahı, traktör dönüş yarıçapı ve doğal hava akışını esas alan projeler tercih edilmelidir.
                </p>
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

          {/* Sidebar CTA & Other Guides */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Project Proposal Widget */}
            <div className="bg-anthracite-950 text-white rounded-3xl p-6 sm:p-8 border border-anthracite-800 shadow-card space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
              
              <div className="relative z-10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Ücretsiz Projelendirme
                </span>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Çiftliğinizi Birlikte Planlayalım
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  25 Baş'tan 200 Baş'a kadar standart çiftlik modellerimiz için ücretsiz keşif ve maliyet cetveli talep edin.
                </p>
              </div>

              <div className="relative z-10 space-y-3">
                <Link
                  href="/teklif-al"
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs text-center shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Ücretsiz Teklif Al</span>
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
                    href={`/blog/${p.slug}`}
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
