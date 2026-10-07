"use client";

import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  ShieldCheck, 
  Truck,
  PhoneCall,
  Compass,
  FileCheck2,
  HardHat,
  Key,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    subject: "Genel Bilgi & Keşif Talebi",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*İLETİŞİM FORMU MESAJI*\n------------------------------\n*Ad Soyad:* ${formData.name}\n*Telefon:* ${formData.phone}\n*Şehir:* ${formData.city || "Belirtilmedi"}\n*E-posta:* ${formData.email || "Yok"}\n*Konu:* ${formData.subject}\n*Mesaj:* ${formData.message}`;

    setIsSubmitted(true);

    setTimeout(() => {
      window.open(
        `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }, 700);
  };

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "İletişim" }]} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
            <span>Bize Ulaşın</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
            İletişim & <span className="text-brand-600">Keşif Talebi</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Projeniz, araziniz veya anahtar teslim maliyet hesapları hakkında merak ettiğiniz her şeyi teknik ekibimize danışabilirsiniz.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* NASIL ÇALIŞIYORUZ? (5 AŞAMALI ANAHTAR TESLİM SÜREÇ) */}
        {/* ========================================================================= */}
        <div className="mb-16 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Nasıl Çalışıyoruz?</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
              5 Aşamalı Şeffaf <span className="text-brand-600">İnşaat Süreci</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Türkiye'nin neresinde olursanız olun inşaat sürecindeki tüm zorlukları ve usta stresini ortadan kaldırıyoruz. Tek sözleşme ve tek muhatapla anahtar teslim güvencesi.
            </p>
          </div>

          {/* 5 Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card flex flex-col justify-between space-y-4 hover:border-brand-500 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-anthracite-950 text-brand-400 flex items-center justify-center">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-black text-2xl text-brand-600/30">01</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  1. İhtiyaç Analizi & Ön Keşif
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Arazinizin konumu, toprak yapısı, eğim ve iklim şartları incelenir; hedeflenen hayvan kapasitesine göre taban alanı ve bütçe projeksiyonu çıkarılır.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-700">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-brand-600 shrink-0" />
                <span>Arazi ve kapasite fizibilitesi</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card flex flex-col justify-between space-y-4 hover:border-brand-500 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-anthracite-950 text-brand-400 flex items-center justify-center">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-black text-2xl text-brand-600/30">02</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  2. Mimari & Statik Çizim
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bölgenin kar ve rüzgar parametrelerine uygun çelik karkas mukavemeti, baca etkili mahya havalandırması ve padok ölçüleri 3D olarak tasarlanır.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-700">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-brand-600 shrink-0" />
                <span>3D mimari & statik hesap</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card flex flex-col justify-between space-y-4 hover:border-brand-500 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-anthracite-950 text-brand-400 flex items-center justify-center">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-black text-2xl text-brand-600/30">03</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  3. Şeffaf Bütçe & Sözleşme
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tüm malzeme markaları, beton sınıfları ve teslim takvimi şeffaf metraj cetveliyle sözleşmeye bağlanır. Sürpriz ek maliyet çıkarılmaz.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-700">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-brand-600 shrink-0" />
                <span>Sabit fiyat sözleşme garantisi</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card flex flex-col justify-between space-y-4 hover:border-brand-500 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-anthracite-950 text-brand-400 flex items-center justify-center">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-black text-2xl text-brand-600/30">04</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  4. Saha İmalatı & Montaj
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kendi deneyimli montaj ekibimizle zemin hafriyatını yapıyor, donatılı temel betonu döküyor, fabrikasyon çeliği kuruyor ve çatıyı kapatıyoruz.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-700">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-brand-600 shrink-0" />
                <span>81 ilde anahtar teslim inşaat</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card flex flex-col justify-between space-y-4 hover:border-brand-500 transition-all md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-anthracite-950 text-brand-400 flex items-center justify-center">
                    <Key className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-black text-2xl text-brand-600/30">05</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  5. Eksiksiz Anahtar Teslimat
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  İç padok ayırıcıları, donmaz suluk hatları, aydınlatma ve tesisat tek tek test edilir. Yapınız sıfır eksikle ve temizlenmiş olarak hemen hayvan kabulüne hazır teslim edilir.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center text-xs font-semibold text-brand-700">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-brand-600 shrink-0" />
                  <span>Kullanıma hazır, test edilmiş tesis</span>
                </div>
                <Link
                  href="/ciftlik-fiyatlari"
                  className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-brand-600 transition-colors"
                >
                  <span>Maliyetleri İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* İLETİŞİM BİLGİLERİ VE FORMU */}
        {/* ========================================================================= */}


        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: Phone */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Doğrudan Arayın</p>
              <a 
                href={`tel:${siteConfig.contact.phoneClean}`}
                className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <p className="text-xs text-slate-400 mt-1">{siteConfig.contact.workingHours}</p>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">WhatsApp Hattı</p>
              <a 
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.defaultWhatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-emerald-700 hover:underline"
              >
                {siteConfig.contact.whatsappDisplay}
              </a>
              <p className="text-xs text-slate-400 mt-1">7/24 Mesaj Gönderebilirsiniz</p>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">E-posta</p>
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm font-bold text-slate-900 hover:text-brand-600 transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              <p className="text-xs text-slate-400 mt-1">Kurumsal ve Resmi İletişim</p>
            </div>
          </div>

          {/* Card 4: Location */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Merkez & Hizmet Alanı</p>
              <p className="text-sm font-bold text-slate-900">{siteConfig.contact.address}</p>
              <p className="text-xs text-slate-400 mt-1">81 İlde Mobil Şantiye & Montaj</p>
            </div>
          </div>

        </div>

        {/* Main Grid: Form & Map Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                  Mesajınız Alındı!
                </h3>
                <p className="text-slate-600 text-sm max-w-md">
                  Mesajınız doğrudan WhatsApp hattımıza aktarılıyor. En kısa sürede geri dönüş sağlayacağız.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-brand-600"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900">
                    Bize Mesaj Gönderin
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sorularınızı iletin, teknik uzmanlarımız en kısa sürede yanıtlasın.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Adınız Soyadınız *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ali Kaya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Telefon Numaranız *</label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Şehir</label>
                    <input
                      type="text"
                      placeholder="Örn: Konya, Erzurum, İzmir..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Konu</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                    >
                      <option value="Çiftlik Modeli Teklifi">Çiftlik Modeli Teklifi (Model A-E)</option>
                      <option value="Besi Çiftliği Teklifi">Besi Çiftliği Teklifi</option>
                      <option value="Süt Çiftliği Bilgisi">Süt Çiftliği Bilgisi</option>
                      <option value="Anahtar Teslim Ev">Anahtar Teslim Ev</option>
                      <option value="Çelik Konstrüksiyon">Çelik Konstrüksiyon</option>
                      <option value="Genel Soru / Keşif">Genel Soru / Keşif</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Mesajınız *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Projenizle ilgili detaylar veya sormak istediğiniz sorular..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Mesajı Gönder</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Location & Social Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Location Map Card */}
            <div className="bg-anthracite-950 text-white rounded-3xl p-6 sm:p-8 border border-anthracite-800 shadow-card space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-blueprint-pattern opacity-15 pointer-events-none" />
              
              <div className="relative z-10 space-y-3">
                <div className="flex items-center space-x-2 text-brand-400">
                  <Truck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Hizmet Lokasyonu</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Türkiye Geneli Saha Operasyonu
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Şantiye filomuz ve mobil montaj ekiplerimizle Marmara'dan Ege'ye, İç Anadolu'dan Karadeniz ve Doğu Anadolu'ya tüm Türkiye'de anahtar teslim hizmet veriyoruz.
                </p>
                <div className="p-4 rounded-2xl bg-anthracite-900/90 border border-anthracite-800 text-xs text-slate-300 space-y-1">
                  <p><strong className="text-white">Merkez:</strong> {siteConfig.contact.address}</p>
                  <p><strong className="text-white">Çalışma Saatleri:</strong> {siteConfig.contact.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
              <h4 className="font-heading font-bold text-base text-slate-900">
                Sosyal Medyadan Takip Edin
              </h4>
              <p className="text-xs text-slate-500">
                Şantiye teslimlerimiz, mimari çizimlerimiz ve güncel projelerimizi paylaşıyoruz.
              </p>

              <div className="flex items-center space-x-3 pt-2">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center space-x-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center space-x-2"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

          </div>

        </div>

              </div>
    </div>
  );
}
