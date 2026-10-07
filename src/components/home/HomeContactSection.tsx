"use client";

import React, { useState } from "react";
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function HomeContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "İstanbul",
    projectType: "Besi Çiftliği",
    capacity: "100 Baş",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*GÖKÇE İNŞAAT - PROJE TALEBİ*\n*Ad Soyad:* ${formData.fullName}\n*Telefon:* ${formData.phone}\n*Şehir:* ${formData.city}\n*Proje Türü:* ${formData.projectType}\n*Kapasite / Model:* ${formData.capacity}\n*Not:* ${formData.message || "Yok"}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(
        `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }, 600);
  };

  return (
    <section className="py-16 sm:py-28 bg-surface-soft relative" id="hizli-teklif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-premium overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Info Column (Dark Anthracite Background) */}
            <div className="lg:col-span-5 bg-anthracite-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
                  <span>Hızlı İletişim & Keşif</span>
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                  Projeniz İçin <br />
                  <span className="text-gradient-orange">Ücretsiz Teklif</span> Alın
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  İhtiyacınızı ve arsanızın bulunduğu şehri bize iletin; mühendislik ekibimiz en uygun mimari modeli ve bütçe planını çıkarsın.
                </p>

                {/* Direct Contact List */}
                <div className="space-y-4 pt-4 text-sm">
                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Hizmet Bölgemiz</p>
                      <p className="text-slate-400 text-xs">{siteConfig.contact.region}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <Phone className="w-5 h-5 text-brand-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white">Doğrudan İletişim</p>
                      <a href={`tel:${siteConfig.contact.phoneClean}`} className="text-slate-300 hover:text-white text-xs font-semibold">
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white">WhatsApp Doğrudan Destek</p>
                      <a 
                        href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.defaultWhatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-300 hover:text-emerald-200 text-xs font-semibold underline"
                      >
                        {siteConfig.contact.whatsappDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Clock className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Çalışma Saatleri</p>
                      <p className="text-slate-400 text-xs">{siteConfig.contact.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-anthracite-800 flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>6698 sayılı KVKK kapsamında bilgileriniz gizli tutulur.</span>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-white">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading text-slate-900">
                    Talebiniz Alındı!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-md">
                    Proje detaylarınız WhatsApp hattımıza aktarılıyor. Mühendislerimiz en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-brand-600"
                  >
                    Yeni Talep Oluştur
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                      Hızlı Teklif Formu
                    </h4>
                    <p className="text-xs text-slate-500">
                      Formu doldurun, Türkiye'nin neresinde olursanız olun size özel maliyet cetveliyle dönüş yapalım.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Ad Soyad */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Adınız Soyadınız *</label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>

                    {/* Telefon */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Telefon Numaranız *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Örn: 05XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Şehir */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Şehir / Konum *</label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Ankara / Konya / Kars..."
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>

                    {/* Proje Türü */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Proje Türü *</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                      >
                        <option value="Besi Çiftliği">Besi Çiftliği (Model C/E)</option>
                        <option value="Süt Çiftliği">Süt Çiftliği (Model D)</option>
                        <option value="Bağlı Sistem Ahır">Bağlı Sistem Ahır (Model A)</option>
                        <option value="Karma Çiftlik">Besi + Süt Karma (Model B)</option>
                        <option value="Anahtar Teslim Ev">Anahtar Teslim Ev (110m²/160m²)</option>
                        <option value="Çelik Yapı">Çelik Yapı / Hangar</option>
                        <option value="Tarımsal Depo">Tarımsal Depo</option>
                      </select>
                    </div>

                    {/* Kapasite */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Kapasite / Model</label>
                      <select
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                      >
                        <option value="25 Baş (150 m²)">25 Baş (150 m²)</option>
                        <option value="50 Baş (300 m²)">50 Baş (300 m²)</option>
                        <option value="75 Baş (420 m²)">75 Baş (420 m²)</option>
                        <option value="100 Baş (600 m²)">100 Baş (600 m²)</option>
                        <option value="150 Baş (900 m²)">150 Baş (900 m²)</option>
                        <option value="200+ Baş">200+ Baş</option>
                        <option value="2+1 Ev (110 m²)">2+1 Ev (110 m²)</option>
                        <option value="3+1 Ev (160 m²)">3+1 Ev (160 m²)</option>
                      </select>
                    </div>
                  </div>

                  {/* Mesaj */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Ek Notlar / Arazi Bilgisi</label>
                    <textarea
                      rows={3}
                      placeholder="Arazinizin durumu, hedefiniz veya sormak istedikleriniz..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Ücretsiz Proje Talebi Oluştur</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
