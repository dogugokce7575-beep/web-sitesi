"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  Building2, 
  Home, 
  Warehouse, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Calculator
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const serviceLinks = [
    { title: "Ahır Projeleri", href: "/hizmetler/ahir-projeleri", icon: Warehouse, desc: "Modern büyükbaş ahır çözümleri" },
    { title: "Besi Çiftlikleri", href: "/hizmetler/besi-ciftligi", icon: Building2, desc: "25-200 başlık standart çiftlik modelleri" },
    { title: "Koyun Çiftliği", href: "/hizmetler/koyun-ciftligi", icon: Building2, desc: "Küçükbaş yetiştiriciliğine özel yapılar" },
    { title: "Gübre Çukuru", href: "/hizmetler/gubre-cukuru", icon: Layers, desc: "Yasal mevzuata uygun sızdırmaz lagünler" },
    { title: "Yem Deposu", href: "/hizmetler/yem-deposu", icon: Warehouse, desc: "Kuru ve havadar modern depolama hangarları" },
    { title: "Anahtar Teslim Ev", href: "/hizmetler/anahtar-teslim-ev", icon: Home, desc: "110m² ve 160m² müstakil konutlar" },
    { title: "Çelik Yapılar", href: "/hizmetler/celik-yapilar", icon: Layers, desc: "Geniş açıklıklı endüstriyel yapılar" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Bar (Desktop) */}
      <div className="hidden lg:block bg-anthracite-950 text-slate-300 text-xs py-2 px-4 border-b border-anthracite-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-brand-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>Türkiye Geneli Anahtar Teslim Proje, İmalat ve Montaj</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{siteConfig.contact.workingHours}</span>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <span className="flex items-center space-x-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sözleşmeli Fiyat Garantisi</span>
            </span>
            <a 
              href={`tel:${siteConfig.contact.phoneClean}`}
              className="flex items-center space-x-1.5 text-white hover:text-brand-400 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-brand-500" />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? "glass-header shadow-md py-3 border-b border-slate-200/80" 
          : "bg-white/95 backdrop-blur-md py-4 border-b border-slate-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo with Orange House Icon */}
          <Link href="/" className="flex items-center space-x-3 group py-0.5">
            <div className="relative h-11 sm:h-12 w-auto flex items-center shrink-0">
              <img
                src="/images/logo.png"
                alt="Gökçe İnşaat ve Yapı Logo"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                width={120}
                height={44}
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/" ? "text-brand-600 font-bold bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
              }`}
            >
              Ana Sayfa
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <Link
                href="/hizmetler"
                className={`px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center space-x-1 transition-colors ${
                  pathname.startsWith("/hizmetler") ? "text-brand-600 font-bold bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
                }`}
              >
                <span>Hizmetler</span>
                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              <div className="absolute left-0 top-full pt-2 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 space-y-1">
                  {serviceLinks.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-start p-2.5 rounded-xl hover:bg-brand-50 text-slate-800 hover:text-brand-600 transition-colors group/item"
                      >
                        <div className="p-2 rounded-lg bg-brand-50 text-brand-600 group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors mt-0.5 mr-3">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover/item:text-brand-600">
                            {service.title}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {service.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-2 mt-1 border-t border-slate-100">
                    <Link
                      href="/hizmetler"
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-brand-600 hover:text-brand-700 rounded-lg hover:bg-brand-50"
                    >
                      <span>Tüm Hizmetleri İncele</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              href="/projeler" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/projeler") ? "text-brand-600 font-bold bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
              }`}
            >
              Model Kataloğu
            </Link>

            {/* Fiyat Listesi Tab */}
            <Link 
              href="/ciftlik-fiyatlari" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1 ${
                pathname === "/ciftlik-fiyatlari" ? "text-brand-600 font-bold bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-brand-600" />
              <span>Fiyat Listesi</span>
            </Link>

            <Link 
              href="/hakkimizda" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/hakkimizda" ? "text-brand-600 font-bold bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
              }`}
            >
              Hakkımızda
            </Link>

            <Link 
              href="/iletisim" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/iletisim" ? "text-brand-600 font-bold bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
              }`}
            >
              İletişim
            </Link>

            <Link 
              href="/rehber" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/rehber") || pathname.startsWith("/blog") ? "text-brand-600 font-bold bg-brand-50" : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
              }`}
            >
              Rehber
            </Link>
          </nav>

          {/* Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/teklif-al"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 active:scale-95 shadow-md shadow-brand-600/20 transition-all duration-150"
            >
              <span>Ücretsiz Teklif Al</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              href="/teklif-al"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 transition-colors"
            >
              Teklif Al
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-brand-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="p-3 bg-brand-50 rounded-xl flex items-center justify-between border border-brand-200/60">
            <div className="flex items-center space-x-2 text-brand-700 font-bold text-xs">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Türkiye Geneli Hizmet</span>
            </div>
            <a 
              href={`tel:${siteConfig.contact.phoneClean}`}
              className="text-xs font-bold text-brand-600 flex items-center space-x-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex flex-col space-y-1">
            <Link 
              href="/"
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${pathname === "/" ? "bg-brand-600 text-white" : "text-slate-800 hover:bg-slate-100"}`}
            >
              Ana Sayfa
            </Link>

            <div>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                <span>Hizmetler</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesDropdownOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mt-1">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-3 py-2 rounded-md text-xs font-medium text-slate-700 hover:text-brand-600 hover:bg-white"
                    >
                      {service.title}
                    </Link>
                  ))}
                  <Link
                    href="/hizmetler"
                    className="block px-3 py-2 rounded-md text-xs font-bold text-brand-600 hover:bg-white"
                  >
                    Tüm Hizmetleri Gör →
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/projeler"
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${pathname.startsWith("/projeler") ? "bg-brand-600 text-white" : "text-slate-800 hover:bg-slate-100"}`}
            >
              Model Kataloğu
            </Link>

            <Link 
              href="/ciftlik-fiyatlari"
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${pathname === "/ciftlik-fiyatlari" ? "bg-brand-600 text-white" : "text-slate-800 hover:bg-slate-100"}`}
            >
              Fiyat Listesi
            </Link>

            <Link 
              href="/hakkimizda"
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${pathname === "/hakkimizda" ? "bg-brand-600 text-white" : "text-slate-800 hover:bg-slate-100"}`}
            >
              Hakkımızda
            </Link>

            <Link 
              href="/iletisim"
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${pathname === "/iletisim" ? "bg-brand-600 text-white" : "text-slate-800 hover:bg-slate-100"}`}
            >
              İletişim
            </Link>

            <Link 
              href="/rehber"
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${pathname.startsWith("/rehber") || pathname.startsWith("/blog") ? "bg-brand-600 text-white" : "text-slate-800 hover:bg-slate-100"}`}
            >
              Rehber
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <Link
              href="/teklif-al"
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-md"
            >
              <span>Ücretsiz Proje Teklifi Al</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.defaultWhatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-700 text-white font-bold text-sm"
            >
              <span>WhatsApp ile Hızlı İletişim</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
