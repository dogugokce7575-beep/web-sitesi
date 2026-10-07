import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  Users, 
  Award, 
  ArrowRight, 
  MapPin, 
  Truck,
  Sparkles
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";
import AboutReferenceGallery from "@/components/about/AboutReferenceGallery";

export const metadata: Metadata = {
  title: "Hakkımızda | Gökçe İnşaat ve Yapı",
  description: "Hayvancılıkta 100 yıllık köklü tecrübe, inşaatta 40 yıllık mühendislik deneyimi ile Türkiye'nin her yerinde anahtar teslim çiftlik ve yapı çözümleri.",
  alternates: {
    canonical: `${siteConfig.url}/hakkimizda`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Hakkımızda" }]} />

        {/* Hero Banner */}
        <div className="bg-anthracite-950 text-white rounded-3xl p-8 sm:p-14 mb-10 relative overflow-hidden shadow-premium border border-anthracite-800">
          <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <span>Kurumsal Profil</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Hayvancılıkta 100 Yıllık Tecrübe, <br />
              <span className="text-gradient-orange">
                İnşaatta 40 Yıllık Deneyim.
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Gökçe İnşaat ve Yapı olarak hayvancılık alanındaki köklü tecrübemizi, 40 yıllık inşaat deneyimimizle birleştiriyoruz. Çiftlikten ahıra, yem deposundan gübre çukuruna kadar ihtiyaçları doğru planlayarak, işlevsel ve uzun ömürlü yapılar oluşturuyoruz.
            </p>
          </div>
        </div>

        {/* Köklü Tecrübe Vurgu Kartı (Sade & Premium) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* 100 Yıl */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 pr-0 md:pr-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200/80 flex flex-col items-center justify-center shrink-0 shadow-sm">
                <span className="font-heading font-black text-xl text-brand-600 leading-none">100</span>
                <span className="text-[10px] font-black uppercase text-brand-800 tracking-wider">YIL</span>
              </div>
              <div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                  Hayvancılık Tecrübesi
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                  Kuşaktan kuşağa aktarılan saha bilgisiyle hayvan refahı, sürü dinamiği ve işletme rasyonunu en ince ayrıntısına kadar biliyoruz.
                </p>
              </div>
            </div>

            {/* 40 Yıl */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 pt-6 md:pt-0 pl-0 md:pl-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center shrink-0 shadow-sm text-white">
                <span className="font-heading font-black text-xl text-brand-400 leading-none">40</span>
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider">YIL</span>
              </div>
              <div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                  İnşaat Deneyimi
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                  Zemin betonundan ağır çelik karkasa, statik mühendislikten anahtar teslim teslime kadar 40 yıllık saha ve uygulama uzmanlığı.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tecrübemiz Bölümü */}
        <div className="bg-gradient-to-br from-slate-900 to-anthracite-950 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-premium border border-anthracite-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-600/30 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
              <span>Uzmanlık & Yaklaşım</span>
            </div>
            
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Tecrübemiz
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Hayvancılığın ihtiyaçlarını sahadan gelen tecrübeyle biliyor, bu deneyimi 40 yıllık inşaat uygulama tecrübemizle birleştiriyoruz. Amacımız yalnızca yapı yapmak değil; ihtiyaca uygun, doğru planlanmış ve uzun vadede kullanılabilecek çözümler sunmaktır.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80 mt-4">
              <div className="flex items-center space-x-2 text-brand-400 text-xs sm:text-sm font-bold">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Türkiye’nin her yerinde hizmet veriyoruz.</span>
              </div>

              <Link
                href="/teklif-al"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-600/25 transition-all self-start sm:self-auto"
              >
                <span>Projenizi Konuşalım</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">
              Müşterinin İnşaat Yükünü Hafifleten Mühendislik Anlayışı
            </h2>
            
            <p>
              İnşaat yaptırmak çoğu zaman karmaşık, usta yönetiminin yorucu olduğu ve maliyetlerin kontrol edilemediği stresli bir süreç olarak görülür. <strong>Gökçe İnşaat ve Yapı</strong>, bu ezberi bozmak ve Türkiye genelinde güvenilir bir anahtar teslim yapı merkezi olmak amacıyla faaliyet göstermektedir.
            </p>

            <p>
              Müstakil konutlardan büyükbaş hayvancılık tesislerine (25-200 Baş A, B, C, D, E Modelleri), modern besi çiftliklerinden endüstriyel çelik hangarlara kadar farklı ölçeklerdeki projeleri baştan sona planlıyor, statik hesaplarını her bölgenin iklim ve kar yükü koşullarına göre hazırlıyor ve anahtar teslim olarak tamamlıyoruz.
            </p>

            <div className="p-6 bg-white rounded-2xl border-l-4 border-brand-500 shadow-card space-y-2">
              <h3 className="font-bold text-slate-900 text-base">
                Temel Hedefimiz: Optimum Fiyat / Performans Dengesi
              </h3>
              <p className="text-sm text-slate-600">
                Gereksiz maliyetleri ortadan kaldırarak, doğru malzemeyle en sağlam ve en verimli yapıyı bütçenize uygun şekilde inşa etmek.
              </p>
            </div>

            <p>
              Merkez ofisimiz ve operasyon üssümüz Ardahan'da bulunmakla birlikte; mobil şantiye filomuz, fabrikasyon çelik karkas üretimimiz ve tecrübeli montaj kadromuzla Marmara'dan Ege'ye, İç Anadolu'dan Karadeniz'e Türkiye'nin 81 ilinde anahtar teslim inşaat gerçekleştiriyoruz.
            </p>
          </div>

          {/* Right Core Pillars Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <h3 className="font-heading font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
                Çalışma İlkelerimiz
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Tek Muhatap Güvencesi</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Projelendirmeden anahtar teslimine kadar tüm süreç tek elden koordine edilir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Şeffaf Sözleşmeli Bütçe</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      İşin ortasında ek maliyet çıkarılmaz, net malzeme kalitesi sözleşmeyle garanti altına alınır.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">81 İlde Mobil Şantiye</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Türkiye'nin her bölgesine doğrudan lojistik ve hızlı yerinde montaj.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    04
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Zamanında Teslimat</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Planlanan iş takvimine sadık kalınarak kullanım hazır tesis teslimatı.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/teklif-al"
                  className="w-full py-4 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-sm text-center shadow-md shadow-brand-600/20 flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Projeniz İçin Teklif Alın</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-anthracite-950 text-brand-400 flex items-center justify-center mb-2">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900">Misyonumuz</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Müşterilerimizin inşaat ve tesis yatırımlarını gereksiz karmaşadan arındırarak, modern teknoloji ve doğru mühendislikle Türkiye genelinde en hızlı, en dayanıklı ve en ekonomik şekilde anahtar teslim tamamlamak.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-anthracite-950 text-brand-400 flex items-center justify-center mb-2">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900">Vizyonumuz</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Büyükbaş hayvancılık barınakları, besi tesisleri ve modern müstakil konut projelerinde güvenilirliği, mühendislik kalitesi ve anahtar teslim disiplini ile Türkiye'nin lider yapı kuruluşu olmak.
            </p>
          </div>
        </div>

        {/* Şantiye & Montaj Referansları (Gerçek Fotoğraf ve 45 Video Slider) */}
        <AboutReferenceGallery />

      </div>
    </div>
  );
}
