import React from "react";
import { Users, Key, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";

export default function WhyUs() {
  const advantages = [
    {
      icon: Users,
      title: "Baştan Sona Tek Ekip",
      desc: "Proje çizimi, statik hesaplama, zemin hafriyatı, temel betonu, çelik karkas montajı ve çatı kaplamasını tek çatı altında eksiksiz yönetiyoruz.",
      badge: "Sıfır Taşeron Stresi",
    },
    {
      icon: Key,
      title: "Anahtar Teslim Çözüm",
      desc: "Demirci, betoncu, tesisatçı ve çatıcıyla ayrı ayrı uğraşma derdine son. Belirlenen takvimde kullanıma hazır yapınızı teslim alın.",
      badge: "Zaman Tasarrufu",
    },
    {
      icon: MapPin,
      title: "Türkiye Geneli Hizmet",
      desc: "Mobil şantiye filomuz ve montaj ekiplerimizle Türkiye'nin 81 ilinde, arsanız nerede olursa olsun yerinde anahtar teslim inşaat.",
      badge: "81 İlde Uygulama",
    },
    {
      icon: CheckCircle2,
      title: "Fiyat / Performans Dengesi",
      desc: "Gereksiz masrafları ortadan kaldırarak işletmeniz için en dayanıklı, en verimli malzemelerle net bütçe sözleşmesi sunuyoruz.",
      badge: "Şeffaf Maliyet",
    },
  ];

  return (
    <section className="py-16 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
            <span>Neden Gökçe İnşaat ve Yapı?</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            İnşaat Sürecini Sizin İçin <span className="text-brand-600">Kolaylaştırıyoruz.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Geleneksel inşaat süreçlerindeki belirsizlikleri, usta gecikmelerini ve kontrolsüz masrafları ortadan kaldırıyoruz.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-surface-soft rounded-3xl p-7 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center transition-colors duration-200 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-brand-700 bg-brand-100/70 px-2.5 py-1 rounded-lg">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-brand-700">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-brand-600" />
                  <span>Gökçe İnşaat Taahhüdü</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customer Reassurance Banner */}
        <div className="mt-12 bg-surface-soft rounded-2xl p-6 sm:p-7 border border-brand-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-slate-900">
                “Ben bu firmayla çalışırsam bütün süreçle tek tek uğraşmak zorunda kalmam.”
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Müşterilerimize verdiğimiz en temel taahhüt: Projenin başlangıcından anahtar teslimine kadar huzurlu bir inşaat deneyimi.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
