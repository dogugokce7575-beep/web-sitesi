import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Bilgi Merkezi & Rehber | Ahır ve Çiftlik Yapımında Püf Noktalar",
  description: "Büyükbaş çiftlik planlama, modern ahır havalandırması, besi alanı hesabı ve anahtar teslim inşaat süreçleri rehber makaleleri.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Bilgi Merkezi & Rehber" }]} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
            <BookOpen className="w-3.5 h-3.5 text-brand-600" />
            <span>Mühendislik & Çiftlik Rehberi</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Ahır & Çiftlik <span className="text-brand-600">Bilgi Merkezi</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Yatırımınızı planlarken bilmeniz gereken havalandırma standartları, kapasite metraj hesapları ve anahtar teslim süreç ipuçları.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-brand-600 text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-slate-900 group-hover:text-brand-600 flex items-center transition-colors"
                >
                  <span>Rehberi Oku</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-surface-soft text-slate-500 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
