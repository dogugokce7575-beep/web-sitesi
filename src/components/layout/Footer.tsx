import React from "react";
import Link from "next/link";
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-anthracite-950 text-slate-300 border-t border-anthracite-900">
      {/* Pre-Footer Highlight Bar */}
      <div className="bg-anthracite-900/80 border-b border-anthracite-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">
                Doğru Proje. Şeffaf Fiyat. Anahtar Teslim Çözüm.
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                81 ilde modern ahır, besi ve süt çiftliği, müstakil ev ve endüstriyel çelik yapılar için tek elden çözüm.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Link
              href="/teklif-al"
              className="w-full md:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 active:scale-95 transition-all shadow-lg shadow-brand-600/20"
            >
              <span>Ücretsiz Teklif Al</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.defaultWhatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 transition-all"
            >
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-auto bg-white rounded-xl p-2 flex items-center justify-center shadow-md">
                <img
                  src="/images/logo.png"
                  alt="Gökçe İnşaat ve Yapı Logo"
                  className="h-8 w-auto object-contain"
                  width={96}
                  height={32}
                />
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Gökçe İnşaat ve Yapı; Türkiye genelinde anahtar teslim ahır, çiftlik modelleri (A, B, C, D, E), müstakil konut ve çelik konstrüksiyon yapıları modern mühendislik ve şeffaf maliyet ilkeleriyle hayata geçirir.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Bizi Takip Edin</span>
              <div className="flex items-center space-x-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-anthracite-900 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-anthracite-900 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Hızlı Menü */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-brand-500 pl-2">
              Hızlı Menü
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-500" />
                  <span>Ana Sayfa</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-500" />
                  <span>Hizmetler</span>
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-500" />
                  <span>Model Kataloğu</span>
                </Link>
              </li>
              <li>
                <Link href="/ciftlik-fiyatlari" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center font-semibold">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-500" />
                  <span>Fiyat Listesi</span>
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-500" />
                  <span>Hakkımızda</span>
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-500" />
                  <span>İletişim</span>
                </Link>
              </li>
              <li>
                <Link href="/rehber" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 text-brand-500" />
                  <span>Rehber</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hizmetler & Modeller */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-brand-500 pl-2">
              Çiftlik Modelleri
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/projeler?model=C" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-brand-500" />
                  <span>C — Besi Modeli</span>
                </Link>
              </li>
              <li>
                <Link href="/projeler?model=D" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-brand-500" />
                  <span>D — Süt Modeli</span>
                </Link>
              </li>
              <li>
                <Link href="/projeler?model=B" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-brand-500" />
                  <span>B — Besi + Süt Karma</span>
                </Link>
              </li>
              <li>
                <Link href="/projeler?model=A" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-brand-500" />
                  <span>A — Bağlı Sistem</span>
                </Link>
              </li>
              <li>
                <Link href="/projeler?model=E" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-brand-500" />
                  <span>E — Açık Besi Modeli</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/anahtar-teslim-ev" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-brand-500" />
                  <span>Anahtar Teslim Müstakil Ev</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: İletişim Bilgileri */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-brand-500 pl-2">
              İletişim & Hizmet Ağı
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">{siteConfig.contact.region}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-400 shrink-0" />
                <a 
                  href={`tel:${siteConfig.contact.phoneClean}`} 
                  className="text-slate-300 hover:text-white font-semibold transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                <a 
                  href={`mailto:${siteConfig.contact.email}`} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-xs">
                  {siteConfig.contact.workingHours}<br />
                  {siteConfig.contact.sunday}
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="border-t border-anthracite-900 bg-anthracite-950 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} {siteConfig.name}. Tüm hakları saklıdır. Türkiye Geneli Anahtar Teslim Yapı Hizmeti.
          </p>
          <div className="flex flex-wrap items-center space-x-6">
            <Link href="/kvkk" className="hover:text-slate-300 transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/gizlilik-politikasi" className="hover:text-slate-300 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/cerez-politikasi" className="hover:text-slate-300 transition-colors">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
