/**
 * GÖKÇE İNŞAAT VE YAPI - Resmî Meta / Instagram Graph API Yapılandırması
 * 
 * Güvenlik İlkeleri:
 * - Yalnızca resmî ve yetkilendirilmiş Meta Graph API kullanılır.
 * - Yetkisiz scraping veya kullanıcı sözleşmelerini ihlal eden yöntemler uygulanmaz.
 * - API anahtarları process.env üzerinden güvenle okunur.
 */

export const instagramConfig = {
  username: process.env.INSTAGRAM_USERNAME || "gokce.yapilar",
  profileUrl: "https://www.instagram.com/gokce.yapilar?igsi=czN1emh0NWFzYW9t&utm_source=qr",
  accountId: process.env.INSTAGRAM_ACCOUNT_ID || "",
  accessToken: process.env.META_ACCESS_TOKEN || "",
  apiVersion: "v19.0",
  graphBaseUrl: "https://graph.facebook.com/v19.0",
  
  // Yerel Medya Depolama Ayarları
  localMediaDirectory: "public/media/instagram",
  publicMediaUrlPrefix: "/media/instagram",
  
  // API Sorgu Alanları
  mediaFields: [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "like_count",
    "comments_count",
    "children{media_type,media_url}"
  ].join(","),
  
  // Varsayılan Sınıflandırma ve Doğrulama Ayarları
  autoApproveHighConfidence: false, // Her içerik Taslak olarak yönetici onayına gider
  defaultPriceType: "Anahtar Teslim Tahmini Fiyat",
  defaultPriceNote: "Belirtilen fiyatlar model bazında tahmini fiyatlardır. Nihai fiyat; proje detayları, zemin koşulları, malzeme tercihleri, lokasyon ve kapsam doğrultusunda kesinleştirilir.",
};

// Resmî API ile çekilen / sahada paylaşılan yetkili başlangıç gönderileri
export const SEED_INSTAGRAM_POSTS = [
  {
    id: "ig_post_101",
    originalInstagramId: "17985412093847291",
    permalink: "https://www.instagram.com/gokce.yapilar/p/C_100_besi_celik",
    publishedAt: "2026-08-20T14:30:00Z",
    rawCaption: "100 başlık modern besi çiftliği projemiz tamamlandı! 50×12 m (600 m²) net kapalı alan üzerine ağır çelik konstrüksiyon karkas montajı, 4.20m çift yönlü traktör yemleme yolu ve doğal mahya havalandırması uygulandı. Donmaz suluk hatları ve C25/30 zemin betonu ile anahtar teslim teslim edildi. İletişim için DM veya WhatsApp. #gokceinsaat #besiciftligi #celikyapi #100baslik #ahirprojeleri",
    mediaType: "video" as const,
    localMediaUrl: "/images/beef-farm-c.jpg",
    localThumbnailUrl: "/images/beef-farm-c.jpg",
    mediaStorageStatus: "saved_locally" as const,
  },
  {
    id: "ig_post_102",
    originalInstagramId: "17985412093847292",
    permalink: "https://www.instagram.com/gokce.yapilar/p/C_750_hangar_celik",
    publishedAt: "2026-08-16T11:15:00Z",
    rawCaption: "750 m² endüstriyel çelik konstrüksiyon depo ve tarımsal hangar montajımız devam ediyor. Ortada kolon engeli olmadan 15 metre net açıklık. Ağır kar ve rüzgar mukavemetine tam uyumlu makas sistemi. #celikmontaj #hangar #tarimsalyapi #gokceinsaat",
    mediaType: "video" as const,
    localMediaUrl: "/images/steel-structure.jpg",
    localThumbnailUrl: "/images/steel-structure.jpg",
    mediaStorageStatus: "saved_locally" as const,
  },
  {
    id: "ig_post_103",
    originalInstagramId: "17985412093847293",
    permalink: "https://www.instagram.com/gokce.yapilar/p/C_50_sut_ciftlik",
    publishedAt: "2026-08-12T09:40:00Z",
    rawCaption: "50 başlık D Modeli süt çiftliği barınağı. 25×12 m (300 m²) çelik taşıyıcı sistem. Otomatik sirkülasyonlu donmaz suluklar, kauçuk duraklar ve traktör yemleme yolu ile teslim edildi. #sutciftligi #50baslik #donmazsuluk #gokceyapilar",
    mediaType: "video" as const,
    localMediaUrl: "/images/dairy-farm-d.jpg",
    localThumbnailUrl: "/images/dairy-farm-d.jpg",
    mediaStorageStatus: "saved_locally" as const,
  },
  {
    id: "ig_post_104",
    originalInstagramId: "17985412093847294",
    permalink: "https://www.instagram.com/gokce.yapilar/p/C_110_mustakil_ev",
    publishedAt: "2026-08-08T16:20:00Z",
    rawCaption: "110 m² 2+1 anahtar teslim müstakil konut teslimatımız. A sınıfı taş yünü mantolama, 3 camlı ısıcam doğramalar, ahşap veranda ve modern hazır mutfak. 7 haftada sıfır usta stresiyle tamamlandı! #mustakilev #anahtarteslim #koyevi #gokceinsaat",
    mediaType: "image" as const,
    localMediaUrl: "/images/house-110m2.jpg",
    localThumbnailUrl: "/images/house-110m2.jpg",
    mediaStorageStatus: "saved_locally" as const,
  },
  {
    id: "ig_post_105",
    originalInstagramId: "17985412093847295",
    permalink: "https://www.instagram.com/gokce.yapilar/p/C_yeni_santiye_baslangic",
    publishedAt: "2026-08-03T10:00:00Z",
    rawCaption: "Yeni bir çiftlik şantiyemiz için zemin hafriyatı ve temel donatı hazırlıklarına başladık. 81 ilde anahtar teslim yapı çözümleri. #santiye #hafriyat #gokceinsaat",
    mediaType: "image" as const,
    localMediaUrl: "/images/architectural-blueprint.jpg",
    localThumbnailUrl: "/images/architectural-blueprint.jpg",
    mediaStorageStatus: "saved_locally" as const,
  },
];
