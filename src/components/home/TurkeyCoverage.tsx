import React from "react";
import Link from "next/link";
import { MapPin, Truck, ShieldCheck, HardHat, ArrowRight, Building, CheckCircle2 } from "lucide-react";

export default function TurkeyCoverage() {
  const regions = [
    { name: "Doğu Anadolu", cities: "Ardahan, Kars, Erzurum, Ağrı, Van, Malatya, Elazığ..." },
    { name: "İç Anadolu", cities: "Ankara, Konya, Kayseri, Sivas, Aksaray, Yozgat, Çorum..." },
    { name: "Karadeniz", cities: "Samsun, Trabzon, Artvin, Tokat, Kastamonu, Ordu, Giresun..." },
    { name: "Marmara", cities: "İstanbul, Balıkesir, Bursa, Çanakkale, Tekirdağ, Sakarya..." },
    { name: "Ege & Akdeniz", cities: "İzmir, Manisa, Afyon, Antalya, Adana, Burdur, Denizli..." },
    { name: "Güneydoğu Anadolu", cities: "Gaziantep, Şanlıurfa, Diyarbakır, Batman, Mardin, Siirt..." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-anthracite-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span>Türkiye Geneli Proje & Montaj</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Türkiye’nin Her Yerinde <br />
            <span className="text-gradient-orange">
              Anahtar Teslim Yapı Çözümleri
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Araziniz hangi şehirde olursa olsun; mobil şantiye filomuz, fabrika ortamında üretilen yüksek mukavemetli çelik konstrüksiyonumuz ve deneyimli saha mühendislerimizle projenizi yerinde tamamlıyoruz.
          </p>
        </div>

        {/* 4 Logistics Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="p-6 rounded-2xl bg-anthracite-900/80 border border-anthracite-800 backdrop-blur-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-400 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">81 İlde Mobil Şantiye</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tüm hafriyat, beton ve çelik karkas montaj ekipmanlarımızla Türkiye'nin dört bir yanına doğrudan lojistik ve şantiye kurulumu sağlıyoruz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-anthracite-900/80 border border-anthracite-800 backdrop-blur-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">İklime Özel Statik Proje</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Her bölgenin kar yükü, rüzgar şiddeti ve deprem yönetmeliğine uygun özel çelik makas ve temel mühendisliği uyguluyoruz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-anthracite-900/80 border border-anthracite-800 backdrop-blur-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-400 flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">Fabrika İmalatı Kalite</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Çelik kolon ve makasları fabrika ortamında milimetrik hassasiyetle üreterek sahada hızlı, civatalı ve hatasız birleşim yapıyoruz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-anthracite-900/80 border border-anthracite-800 backdrop-blur-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-400 flex items-center justify-center">
              <HardHat className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">Tek Elden Teslimat</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Yerel usta arama derdine son. Zemin betonundan çatı kaplamasına, suluklardan yemliklere kadar çalışan tesisinizi teslim ediyoruz.
            </p>
          </div>

        </div>

        {/* Regional Coverage Grid */}
        <div className="bg-anthracite-900/60 border border-anthracite-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-anthracite-800/80">
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Bölgesel Hizmet ve Uygulama Alanlarımız
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Türkiye'nin tüm coğrafi bölgelerinde faal inşaat ve anahtar teslim montaj altyapısı
              </p>
            </div>

            <Link
              href="/teklif-al"
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center space-x-2 shrink-0 transition-all"
            >
              <span>Şehriniz İçin Teklif Alın</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {regions.map((reg, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-anthracite-950/70 border border-anthracite-800/60 space-y-1">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="font-bold text-sm text-white">{reg.name}</span>
                </div>
                <p className="text-xs text-slate-400 pl-6">{reg.cities}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
