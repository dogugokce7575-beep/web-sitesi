/**
 * GÖKÇE İNŞAAT VE YAPI — MERKEZİ MEDYA VERİ YAPISI
 * 
 * Gerçek proje çizimleri, modeller ve şantiye referans videoları/fotoğrafları.
 * 52 Model Çizim/Görseli + 36 Şantiye Referans Videosu + Gerçek Saha Fotoğrafları.
 * (11, 44, 25, 43, 40, 45, 28, 30, 33 numaralı referanslar hariç tutulmuştur)
 */

export interface MediaItem {
  id: string;
  filename: string;
  path: string;
  type: "image" | "video";
  category: "model" | "reference";
  modelCode?: "A" | "B" | "C" | "D" | "E";
  title: string;
  altText: string;
  featured?: boolean;
}

export interface ModelMediaCollection {
  modelCode: "A" | "B" | "C" | "D" | "E";
  modelTitle: string;
  mainImage: string;
  gallery: string[];
}

// 5 ANA MODEL İÇİN GERÇEK MEDYA DOSYALARI (Model Kataloğu Çizimleri)
export const MODEL_MEDIA: Record<"A" | "B" | "C" | "D" | "E", ModelMediaCollection> = {
  A: {
    modelCode: "A",
    modelTitle: "A — Bağlı Sistem",
    mainImage: "/images/models/model-a-1.jpeg",
    gallery: [
      "/images/models/model-a-1.jpeg",
      "/images/models/model-a-2.jpeg",
      "/images/models/model-a-3.jpeg",
      "/images/models/model-a-4.jpeg",
      "/images/models/model-a-5.jpeg",
      "/images/models/model-a-6.jpeg",
      "/images/models/model-a-7.jpeg",
      "/images/models/model-a-8.jpeg",
      "/images/models/model-a-9.jpeg",
      "/images/models/model-a-10.jpeg",
      "/images/models/model-a-11.jpeg",
    ],
  },
  B: {
    modelCode: "B",
    modelTitle: "B — Besi + Süt Karma Sistem",
    mainImage: "/images/models/model-b-1.jpeg",
    gallery: [
      "/images/models/model-b-1.jpeg",
      "/images/models/model-b-2.jpeg",
      "/images/models/model-b-3.jpeg",
    ],
  },
  C: {
    modelCode: "C",
    modelTitle: "C — Besi Modeli",
    mainImage: "/images/models/model-c-1.jpeg",
    gallery: [
      "/images/models/model-c-1.jpeg",
      "/images/models/model-c-2.jpeg",
      "/images/models/model-c-3.jpeg",
      "/images/models/model-c-4.jpeg",
      "/images/models/model-c-5.jpeg",
      "/images/models/model-c-6.jpeg",
      "/images/models/model-c-7.jpeg",
      "/images/models/model-c-8.jpeg",
      "/images/models/model-c-9.jpeg",
      "/images/models/model-c-10.jpeg",
      "/images/models/model-c-11.jpeg",
      "/images/models/model-c-12.jpeg",
      "/images/models/model-c-13.jpeg",
    ],
  },
  D: {
    modelCode: "D",
    modelTitle: "D — Süt Modeli",
    mainImage: "/images/models/model-d-1.jpeg",
    gallery: [
      "/images/models/model-d-1.jpeg",
      "/images/models/model-d-2.jpeg",
      "/images/models/model-d-3.jpeg",
      "/images/models/model-d-4.jpeg",
      "/images/models/model-d-5.jpeg",
      "/images/models/model-d-6.jpeg",
      "/images/models/model-d-7.jpeg",
      "/images/models/model-d-8.jpeg",
      "/images/models/model-d-9.jpeg",
      "/images/models/model-d-10.jpeg",
      "/images/models/model-d-11.jpeg",
      "/images/models/model-d-12.jpeg",
      "/images/models/model-d-13.jpeg",
      "/images/models/model-d-14.jpeg",
    ],
  },
  E: {
    modelCode: "E",
    modelTitle: "E — Açık Besi Modeli",
    mainImage: "/images/models/model-e-1.jpeg",
    gallery: [
      "/images/models/model-e-1.jpeg",
      "/images/models/model-e-2.jpeg",
      "/images/models/model-e-3.jpeg",
      "/images/models/model-e-4.jpeg",
      "/images/models/model-e-5.jpeg",
      "/images/models/model-e-6.jpeg",
      "/images/models/model-e-7.jpeg",
      "/images/models/model-e-8.jpeg",
      "/images/models/model-e-9.jpeg",
      "/images/models/model-e-10.jpeg",
      "/images/models/model-e-11.jpeg",
    ],
  },
};

// GERÇEK ŞANTİYE REFERANS FOTOĞRAFLARI
export const REFERENCE_PHOTOS: MediaItem[] = [
  {
    id: "ref-img-1",
    filename: "referans-1.jpeg",
    path: "/images/references/referans-1.jpeg",
    type: "image",
    category: "reference",
    title: "Gökçe İnşaat ve Yapı — Saha Uygulama Referansı",
    altText: "Gökçe İnşaat ve Yapı anahtar teslim çiftlik karkas ve saha montajı",
    featured: true,
  },
  {
    id: "ref-img-farm-1",
    filename: "stall-farm-a.jpg",
    path: "/images/stall-farm-a.jpg",
    type: "image",
    category: "reference",
    title: "Model A — Bağlı Sistem Çiftlik Montajı",
    altText: "Bağlı sistem modern ahır karkas imalatı",
    featured: true,
  },
  {
    id: "ref-img-farm-2",
    filename: "combo-farm-b.jpg",
    path: "/images/combo-farm-b.jpg",
    type: "image",
    category: "reference",
    title: "Model B — Besi & Süt Karma Tesis Kurulumu",
    altText: "Besi ve süt karma sistem çiftlik montajı",
    featured: true,
  },
  {
    id: "ref-img-farm-3",
    filename: "beef-farm-c.jpg",
    path: "/images/beef-farm-c.jpg",
    type: "image",
    category: "reference",
    title: "Model C — Modern Besi Çiftliği İmalatı",
    altText: "Modern besi ahırı çelik taşıyıcı karkas",
    featured: true,
  },
  {
    id: "ref-img-farm-4",
    filename: "dairy-farm-d.jpg",
    path: "/images/dairy-farm-d.jpg",
    type: "image",
    category: "reference",
    title: "Model D — Yüksek Verimli Süt Çiftliği Tesisi",
    altText: "Modern süt sığırcılığı tesisi inşaatı",
    featured: true,
  },
  {
    id: "ref-img-farm-5",
    filename: "open-feedlot-e.jpg",
    path: "/images/open-feedlot-e.jpg",
    type: "image",
    category: "reference",
    title: "Model E — Açık & Yarı Açık Besi Sistemi",
    altText: "Açık padoklu ekonomik besi çiftliği",
    featured: true,
  },
  {
    id: "ref-img-farm-6",
    filename: "koyun-ciftligi.jpg",
    path: "/images/koyun-ciftligi.jpg",
    type: "image",
    category: "reference",
    title: "Küçükbaş Koyun Çiftliği & Otomatik Yemleme",
    altText: "Küçükbaş koyun ağılı modern barınak yapısı",
    featured: true,
  },
  {
    id: "ref-img-farm-7",
    filename: "steel-structure.jpg",
    path: "/images/steel-structure.jpg",
    type: "image",
    category: "reference",
    title: "Endüstriyel Ağır Çelik Karkas İmalatı",
    altText: "Ağır çelik konstrüksiyon tarımsal depo ve çiftlik iskeleti",
    featured: true,
  },
  {
    id: "ref-img-farm-8",
    filename: "agricultural-storage.jpg",
    path: "/images/agricultural-storage.jpg",
    type: "image",
    category: "reference",
    title: "Tarımsal Yem Deposu ve Hangar Yapısı",
    altText: "Tarımsal ürün ve yem depolama hangarı",
    featured: true,
  },
];

// 11, 44, 25, 43, 40, 45, 28, 30, 33 NUMARALI REFERANSLAR HARİÇ TUTULMUŞ 36 ADET GERÇEK ŞANTİYE VİDEOSU
const EXCLUDED_REFERENCE_NUMS = new Set([11, 44, 25, 43, 40, 45, 28, 30, 33]);

const ACTIVE_REFERENCE_NUMS = Array.from({ length: 45 }, (_, i) => i + 1).filter(
  (num) => !EXCLUDED_REFERENCE_NUMS.has(num)
);

export const REFERENCE_VIDEOS: MediaItem[] = ACTIVE_REFERENCE_NUMS.map((num, idx) => ({
  id: `ref-vid-${num}`,
  filename: `referans-${num}.mp4`,
  path: `/videos/references/referans-${num}.mp4`,
  type: "video",
  category: "reference",
  title: `Şantiye Referans Kaydı #${num}`,
  altText: `Gökçe İnşaat ve Yapı montaj ve şantiye referans videosu #${num}`,
  featured: idx < 12, // İlk 12 video öne çıkanlar
}));
