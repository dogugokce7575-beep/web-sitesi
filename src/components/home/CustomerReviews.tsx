"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, Quote, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

interface Review {
  id: number;
  text: string;
  author: string;
  initials: string;
  rating: number; // 5 or 4.5
  projectContext: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    text: "150 başlık modern çiftlik projemizi zamanında ve eksiksiz teslim ettiler. İşçilik ve sağlamlık konusunda çok başarılılar.",
    author: "Ahmet T.",
    initials: "AT",
    rating: 5,
    projectContext: "150 Başlık Modern Çiftlik Projesi",
  },
  {
    id: 2,
    text: "300 başlık koyun ağılı projemiz tam istediğimiz gibi fonksiyonel oldu. Modern ve uzun ömürlü bir yapı ortaya çıktı, teşekkürler.",
    author: "Mustafa E.",
    initials: "ME",
    rating: 5,
    projectContext: "300 Başlık Koyun Ağılı Projesi",
  },
  {
    id: 3,
    text: "Sandviç panel çatı ve otomatik sıyırıcı sistemleri çok kaliteli. Çiftlik inşaatında gözü kapalı güvenebileceğiniz bir firma.",
    author: "Yılmaz K.",
    initials: "YK",
    rating: 4.5,
    projectContext: "Sandviç Panel Çatı & Ahır İnşaatı",
  },
  {
    id: 4,
    text: "50 başlık ahır projemiz için anlaştık. Ortadan traktör geçişli tasarımı harika uyguladılar, işimizi inanılmaz kolaylaştırdı.",
    author: "Hasan C.",
    initials: "HC",
    rating: 5,
    projectContext: "50 Başlık Modern Ahır Projesi",
  },
  {
    id: 5,
    text: "Çiftlik inşaatında bölgenin en iyisi diyebilirim. Kullanılan malzeme kalitesi ve ekibin hızı gerçekten üst düzeyde.",
    author: "Serkan Y.",
    initials: "SY",
    rating: 5,
    projectContext: "Besi Çiftliği & Çelik Konstrüksiyon",
  },
  {
    id: 6,
    text: "Proje aşamasından teslimata kadar çok profesyonellerdi. Tarımsal yapımızın altyapısı ve konstrüksiyonu son derece sağlam oldu.",
    author: "Mehmet A.",
    initials: "MA",
    rating: 4.5,
    projectContext: "Tarımsal Tesis & Altyapı İmalatı",
  },
  {
    id: 7,
    text: "İhtiyacımıza en uygun, dayanıklı ve modern çiftliği kusursuz şekilde inşa ettiler. Emekleri için Gökçe İnşaat’a teşekkür ederiz.",
    author: "Ali Rıza B.",
    initials: "AB",
    rating: 5,
    projectContext: "Anahtar Teslim Çiftlik Projesi",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center space-x-1" aria-label={`${rating} / 5 yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return (
            <svg
              key={i}
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 fill-amber-500"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <span key={i} className="relative inline-block w-4 h-4 sm:w-4.5 sm:h-4.5">
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-200 fill-slate-200"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="absolute inset-0 overflow-hidden w-1/2">
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 fill-amber-500"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </span>
          );
        } else {
          return (
            <svg
              key={i}
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-200 fill-slate-200"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
      })}
      <span className="text-xs font-semibold text-slate-600 ml-1.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive items count determination
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet: 2 cards
      } else {
        setItemsPerPage(3); // Desktop: 3 cards
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay - 7.5 seconds (gives user plenty of time to comfortably read each review)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for mobile & touchscreens
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide(); // swipe left
    } else if (diff < -45) {
      prevSlide(); // swipe right
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const whatsappMessage = encodeURIComponent(
    "Merhaba, Gökçe İnşaat ve Yapı referanslarınızı ve projelerinizi inceledim. Kendi projem için bilgi ve teklif almak istiyorum."
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section
      className="py-16 sm:py-24 bg-surface-soft border-t border-slate-200/80 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Müşteri Deneyimleri</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Müşterilerimiz Ne Diyor?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Gerçek projeler, gerçek deneyimler ve memnuniyet.
          </p>
        </div>

        {/* Reviews Slider / Carousel Container */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between group">
                    <div className="space-y-4">
                      {/* Top Row: Rating & Quote Icon */}
                      <div className="flex items-center justify-between">
                        <StarRating rating={review.rating} />
                        <div className="w-9 h-9 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <Quote className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                        “{review.text}”
                      </p>
                    </div>

                    {/* Author & Project Info */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center space-x-3.5">
                      {/* Minimal Initials Avatar */}
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-50 to-orange-100/70 border border-brand-200/70 text-brand-700 font-bold text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                        {review.initials}
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base truncate">
                          {review.author}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">
                          {review.projectContext}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls: Left & Right Navigation Arrows */}
          <div className="flex items-center justify-between mt-8 sm:mt-10">
            {/* Pagination Dots */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? "w-8 h-2.5 bg-brand-600"
                      : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Yorum sayfası ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                aria-label="Önceki Yorum"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                aria-label="Sonraki Yorum"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-slate-200/90 text-center space-y-6">
          <p className="font-heading font-bold text-lg sm:text-xl text-slate-900">
            Siz de projenizi birlikte hayata geçirelim.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center space-x-2 active:scale-98"
            >
              <span>Ücretsiz Teklif Al</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center space-x-2 active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp’tan Bilgi Al</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
