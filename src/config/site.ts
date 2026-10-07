/**
 * GÖKÇE İNŞAAT VE YAPI - Merkezi Yapılandırma ve Marka Bilgileri
 * 
 * Türkiye Geneli Hizmet Standardı ile Yapılandırılmıştır.
 */

export const siteConfig = {
  name: "Gökçe İnşaat ve Yapı",
  shortName: "Gökçe İnşaat",
  legalName: "Gökçe İnşaat ve Yapı Ltd. Şti.",
  slogan: "Doğru Proje. Şeffaf Fiyat. Anahtar Teslim Çözüm.",
  subSlogan: "Gökçe İnşaat ve Yapı; ev, ahır, besi çiftliği ve farklı yapı projelerini Türkiye genelinde planlar, uygular ve anahtar teslim olarak teslim eder.",
  description: "Türkiye’nin her yerinde anahtar teslim modern ahır, besi ve süt çiftliği, müstakil konut ve endüstriyel çelik yapı projelerini tek çatı altında hayata geçiriyoruz.",
  url: "https://gokceyapilar.com",

  // İletişim Değişkenleri
  contact: {
    phone: "+90 533 509 99 75",
    phoneClean: "+905335099975",
    phoneDisplay: "0533 509 99 75",
    whatsappNumber: "905335099975",
    whatsappDisplay: "0533 509 99 75",
    defaultWhatsappMessage: "Merhaba, Gökçe İnşaat ve Yapı üzerinden ulaşıyorum. Çiftlik ve yapı projeleriniz hakkında bilgi ve teklif almak istiyorum.",
    email: "info@gokceyapilar.com",
    address: "Merkez Ofis: Ardahan / Türkiye (81 İlde Mobil Şantiye & Uygulama)",
    city: "Ardahan",
    region: "Türkiye Geneli (81 İl Kapsamında Proje, İmalat ve Montaj)",
    workingHours: "Pazartesi - Cumartesi: 08:30 - 19:00",
    sunday: "Pazar: Randevu ile",
  },

  // Sosyal Medya (Resmi Hesap: @gokce.yapilar)
  social: {
    instagram: "https://www.instagram.com/gokce.yapilar?igsi=czN1emh0NWFzYW9t&utm_source=qr",
    instagramHandle: "@gokce.yapilar",
    instagramShortUrl: "https://www.instagram.com/gokce.yapilar",
    facebook: "https://facebook.com/gokceinsaatveyapi",
    linkedin: "https://linkedin.com/company/gokceinsaatveyapi",
  },

  // Marka Mesajları ve 4 Ana Güven Sütunu
  brandPillars: [
    {
      title: "Baştan Sona Tek Ekip",
      description: "Mimari projelendirme, statik hesaplar, zemin hazırlığı, fabrika çelik imalatı ve sahada montajı tek elden yönetiyoruz.",
      icon: "Users",
    },
    {
      title: "Anahtar Teslim Çözüm",
      description: "Farklı ustalar ve taşeronlarla ayrı ayrı uğraşma derdine son. Tamamlanmış, test edilmiş yapınızı teslim alın.",
      icon: "Key",
    },
    {
      title: "Türkiye Geneli Hizmet Ağı",
      description: "Araziniz nerede olursa olsun, mobil şantiye ve uzman montaj ekiplerimizle Türkiye'nin 81 ilinde anahtar teslim inşaat.",
      icon: "MapPin",
    },
    {
      title: "Şeffaf Fiyat & Güvenilirlik",
      description: "Gereksiz maliyetleri ortadan kaldıran doğru mühendislik, sözleşmeli net bütçe ve sürprizsiz teslimat garantisi.",
      icon: "CheckCircle",
    },
  ],

  // Süreç Adımları
  processSteps: [
    {
      step: "01",
      title: "İhtiyacınızı Dinliyoruz",
      description: "Arazinizi, hayvan kapasitenizi veya konut talebinizi detaylı olarak analiz edip ön fizibilite raporunu çıkarıyoruz.",
    },
    {
      step: "02",
      title: "Projeyi Planlıyoruz",
      description: "Bölgesel iklim koşullarına uygun mimari yerleşim, statik mukavemet, havalandırma ve yemleme yollarını 3D modelliyoruz.",
    },
    {
      step: "03",
      title: "Maliyet ve Teklifi Oluşturuyoruz",
      description: "Sürpriz ek maliyetler çıkarmayan, malzeme ve işçilik kalemleri şeffaf anahtar teslim teklifimizi sunuyoruz.",
    },
    {
      step: "04",
      title: "İnşaata Başlıyoruz",
      description: "Zemin kazısı, betonarme temel, endüstriyel çelik karkas montajı ve yalıtımlı çatı kaplamasını planlanan takvimde yürütüyoruz.",
    },
    {
      step: "05",
      title: "Anahtar Teslim Teslim Ediyoruz",
      description: "Tüm sistemleri eksiksiz test ederek yapınızı hemen kullanıma hazır şekilde teslim ediyoruz.",
    },
  ],

  // Ana Menü Navigasyon
  navLinks: [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hizmetler", href: "/hizmetler" },
    { label: "Model Kataloğu", href: "/projeler" },
    { label: "Fiyat Listesi", href: "/ciftlik-fiyatlari" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
    { label: "Rehber", href: "/rehber" },
  ],
};
