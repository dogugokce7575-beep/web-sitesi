import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Hero from "@/components/home/Hero";
import AboutSnippet from "@/components/home/AboutSnippet";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedFarms from "@/components/home/FeaturedFarms";
import TurnkeyHomes from "@/components/home/TurnkeyHomes";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import WhyUs from "@/components/home/WhyUs";
import QuickEstimator from "@/components/home/QuickEstimator";
import CustomerReviews from "@/components/home/CustomerReviews";
import HomeContactSection from "@/components/home/HomeContactSection";

export const metadata: Metadata = {
  title: "Gökçe İnşaat ve Yapı | Anahtar Teslim Çiftlik, Ahır ve İnşaat",
  description: "Türkiye’nin her yerinde anahtar teslim çiftlik, ahır, ağıl, yem deposu, gübre çukuru ve tarımsal yapı çözümleri. Gökçe İnşaat ve Yapı.",
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Exact Trust Slogan & Local Photography */}
      <Hero />

      {/* 2. Kısaca Gökçe İnşaat */}
      <AboutSnippet />

      {/* 3. Hizmetlerimiz (6 Faaliyet Alanı) */}
      <ServicesSection />

      {/* 4. Çiftlik Modelleri (Kapasite, Model A-E, Fiyat & Teknik Çizimler) */}
      <FeaturedFarms />

      {/* 5. Öne Çıkan Müstakil Konut Projeleri */}
      <TurnkeyHomes />

      {/* 6. Nasıl Çalışıyoruz? (5 Aşamalı Süreç) */}
      <ProcessTimeline />

      {/* 7. Güven ve Çalışma İlkelerimiz */}
      <WhyUs />

      {/* 8. Müşterilerimiz Ne Diyor? (Müşteri Yorumları & Referans Deneyimleri) */}
      <CustomerReviews />

      {/* 9. Hızlı Planlayıcı & Teklif CTA */}
      <QuickEstimator />

      {/* 10. İletişim ve Teklif Formu */}
      <HomeContactSection />
    </div>
  );
}
