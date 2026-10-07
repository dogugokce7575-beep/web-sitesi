"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Compass, 
  Building2, 
  Layers, 
  Calculator, 
  HardHat,
  Filter,
  Landmark
} from "lucide-react";
import { blogPosts, REHBER_CATEGORIES } from "@/data/blog";

export default function RehberClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (post.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchTags = post.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchExcerpt && !matchTags) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      
      {/* 6 Kategori Tanıtım Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {REHBER_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.title;
          const iconMap: Record<string, React.ElementType> = {
            Compass, Building2, Layers, Calculator, HardHat, Landmark,
          };
          const Icon = iconMap[cat.iconName] ?? BookOpen;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? "all" : cat.title)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-brand-50 border-brand-500 shadow-md ring-2 ring-brand-500/20"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                  isSelected ? "text-brand-600" : "text-slate-500"
                }`}>
                  {cat.title}
                </span>
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-brand-500" : "text-slate-400"}`} />
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rehberde makale veya konu ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-soft rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-surface-soft text-slate-700 hover:bg-slate-200"
            }`}
          >
            Tüm Makaleler ({blogPosts.length})
          </button>

          {REHBER_CATEGORIES.map((cat) => {
            const count = blogPosts.filter((p) => p.category === cat.title).length;
            const isSelected = selectedCategory === cat.title;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.title)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-surface-soft text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {selectedCategory === "all" ? "Tüm Makaleler" : selectedCategory} ({filteredPosts.length} Sonuç)
          </span>
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-premium hover:border-brand-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3.5 left-3.5 bg-brand-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-xl shadow-md">
                      {post.category}
                    </div>
                  </div>

                  {/* Card Content */}
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

                    <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/rehber/${post.slug}`}
                    className="text-xs font-bold text-slate-900 group-hover:text-brand-600 flex items-center space-x-1 transition-colors"
                  >
                    <span>Makaleyi İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-heading font-bold text-base text-slate-800">
              Aramanıza uygun makale bulunamadı
            </h4>
            <p className="text-xs text-slate-500">
              Farklı bir arama terimi deneyebilir veya kategorileri temizleyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-brand-600 transition-colors"
            >
              Tüm Makaleleri Göster
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
