/**
 * GÖKÇE İNŞAAT VE YAPI — MERKEZİ FİYATLANDIRMA, KAPASİTE VE DİNAMİK ÖLÇÜ KONFİGÜRASYONU
 * 
 * Fiyatlar ve ölçüler tek merkezden dinamik olarak hesaplanır:
 * 1. Kapasite -> Proje Uzunluğu
 * 2. Model Tipi -> Proje Genişliği (Özel model istisnaları ile)
 * 3. Toplam Alan (m²) = Uzunluk × Genişlik
 * 4. Tahmini Yapım Maliyeti = Toplam m² × m² Birim Maliyeti
 */

import { BuildingSystemType, ModelTypeCode } from "@/types";

// 1. KAPASİTEYE GÖRE UZUNLUK KONFİGÜRASYONU (Metre)
// 25 baştan 250 başa kadar; tanımlanmamış olanlar için null döner
export const CAPACITY_CONFIG: Record<number, number | null> = {
  25: 15,    // 25 Baş -> 15 metre
  50: 25,    // 50 Baş -> 25 metre
  75: 35,    // 75 Baş -> 35 metre
  100: 50,   // 100 Baş -> 50 metre
  125: null, // Proje ölçüsü teklif aşamasında belirlenir
  150: 75,   // 150 Baş -> 75 metre
  175: null, // Proje ölçüsü teklif aşamasında belirlenir
  200: 100,  // 200 Baş -> 100 metre
  225: null, // Proje ölçüsü teklif aşamasında belirlenir
  250: null, // Proje ölçüsü teklif aşamasında belirlenir
};

// 1. AŞAMA — Kapasite Seçenekleri (25'ten 250 Baş'a kadar)
export const STEP_CAPACITY_OPTIONS = [
  25, 50, 75, 100, 125, 150, 175, 200, 225, 250
] as const;

// 2. MODEL TİPİNE GÖRE GENİŞLİK KURALLARI VE ÖZEL İSTİSNALAR (Metre)
export const MODEL_WIDTH_CONFIG = {
  default_bagli: 10,   // Genel bağlı sistem: 10 metre
  default_acik: 12,    // Genel açık sistem: 12 metre
  model_A_bagli: 10,   // Model A — Bağlı Sistem: 10 metre
  model_B_karma: 14,   // Model B — Besi + Süt Karma Sistem: 14 metre (Özel İstisna)
  model_C_besi: 12,    // Model C — Besi Modeli: 12 metre
  model_D_sut: 18,     // Model D — Süt Modeli: 18 metre (Özel İstisna)
  model_E_acikBesi: 12,// Model E — Açık Besi Modeli: 12 metre
};

// 2. AŞAMA — Model Seçenekleri ve Açıklamaları
export interface StepModelOption {
  code: "A" | "B" | "C" | "D" | "E";
  title: string;
  name: string;
  width: number;
  description: string;
}

export const STEP_MODEL_OPTIONS: StepModelOption[] = [
  {
    code: "A",
    title: "A — Bağlı Sistem",
    name: "Bağlı Sistem",
    width: 10,
    description: "Kontrollü barındırma ve düzenli işletme planlamasına uygun sistem.",
  },
  {
    code: "B",
    title: "B — Besi + Süt Karma Sistem",
    name: "Besi + Süt Karma Sistem",
    width: 14,
    description: "Besi ve süt işletmesinin birlikte planlandığı karma model.",
  },
  {
    code: "C",
    title: "C — Besi Modeli",
    name: "Besi Modeli",
    width: 12,
    description: "Besi işletmeleri için planlanan model.",
  },
  {
    code: "D",
    title: "D — Süt Modeli",
    name: "Süt Modeli",
    width: 18,
    description: "Süt sığırcılığı işletmeleri için planlanan model.",
  },
  {
    code: "E",
    title: "E — Açık Besi Modeli",
    name: "Açık Besi Modeli",
    width: 12,
    description: "Açık veya yarı açık işletme yaklaşımına uygun model.",
  },
];

// 3. AŞAMA — Yapı Sistemi Seçenekleri (Ağır Çelik, Prefabrik, Betonarme)
export interface StepSystemOption {
  id: "prefabrik" | "celik" | "betonarme";
  title: string;
  unitCost: number;
  unitCostFormatted: string;
  description: string;
}

export const STEP_SYSTEM_OPTIONS: StepSystemOption[] = [
  {
    id: "prefabrik",
    title: "Prefabrik",
    unitCost: 10000,
    unitCostFormatted: "10.000 TL / m²",
    description: "Hızlı montaj, modüler ve yüksek ısı yalıtımlı prefabrik taşıyıcı sistem.",
  },
  {
    id: "celik",
    title: "Ağır Çelik",
    unitCost: 11000,
    unitCostFormatted: "11.000 TL / m²",
    description: "Geniş kolon aralıkları, maksimum mukavemet ve endüstriyel karkas.",
  },
  {
    id: "betonarme",
    title: "Betonarme",
    unitCost: 12000,
    unitCostFormatted: "12.000 TL / m²",
    description: "Geleneksel dayanım, monolitik temel ve karkas yapı sistemi.",
  },
];

// 3. GÜNCEL m² BİRİM MALİYETLERİ (TL / m²)
export const PRICING_CONFIG = {
  prefabrikUnitCost: 10000,
  celikUnitCost: 11000,
  betonarmeUnitCost: 12000,
  unitCosts: {
    prefabrik: 10000,  // Prefabrik: 10.000 TL / m²
    celik: 11000,      // Çelik / Ağır Çelik: 11.000 TL / m²
    betonarme: 12000,  // Betonarme: 12.000 TL / m²
    acikBesi: 7000,    // Model E Açık Besi: 7.000 TL / m² (Özel Maliyet)
  },
  
  // Standart Yasal Fiyat Uyarı Metni
  disclaimer: "Belirtilen fiyat, seçilen modelin toplam m² alanı üzerinden hesaplanan tahmini yapım maliyetidir. Nihai fiyat; zemin koşulları, malzeme tercihleri, lokasyon ve uygulama detaylarına göre kesinleştirilir.",
};

export const PRICING_DISCLAIMER = PRICING_CONFIG.disclaimer;

export const TURNKEY_PRICE_INCLUSIONS = [
  "Araziye özel 3D mimari çizim ve statik hesap raporları",
  "C25/30 hazır betonarme temel ve subasman imalatı",
  "Statik mukavemetli taşıyıcı karkas imalatı ve montajı",
  "İzoleli çatı kaplaması ve yağmur olukları",
  "Sıcak daldırma galvaniz yem kilitleri ve padok ayırıcılar",
  "Donmaz döküm suluk tesisatı ve LED aydınlatma armatürleri",
  "Teslim öncesi sistem fonksiyon testleri ve saha temizliği",
];

/**
 * Kapasiteye göre proje uzunluğunu döner (Metre).
 */
export function getModelLength(capacityValue: number): number {
  if (CAPACITY_CONFIG[capacityValue]) {
    return CAPACITY_CONFIG[capacityValue];
  }
  // En yakın standardı bul veya orantısal hesapla
  if (capacityValue <= 25) return 15;
  if (capacityValue <= 50) return 25;
  if (capacityValue <= 75) return 35;
  if (capacityValue <= 100) return 50;
  if (capacityValue <= 150) return 75;
  if (capacityValue <= 200) return 100;
  return Math.round(capacityValue * 0.5);
}

/**
 * Model koduna ve sistemine göre proje genişliğini döner (Metre).
 * Öncelik Sırası:
 * 1. Özel Model İstisnaları:
 *    - Model B (Karma): 14m
 *    - Model D (Süt): 18m
 * 2. Model C (Besi) / Model E (Açık Besi) / Açık Sistemler: 12m
 * 3. Model A (Bağlı Sistem): 10m
 */
export function getModelWidth(modelCode?: ModelTypeCode | string): number {
  if (!modelCode) return MODEL_WIDTH_CONFIG.default_acik;

  const codeStr = String(modelCode).toUpperCase();

  if (codeStr === "B" || codeStr.includes("KARMA")) {
    return MODEL_WIDTH_CONFIG.model_B_karma; // 14 metre
  }
  if (codeStr === "D" || codeStr.includes("SÜT") || codeStr.includes("SUT")) {
    return MODEL_WIDTH_CONFIG.model_D_sut; // 18 metre
  }
  if (codeStr === "A" || codeStr.includes("BAĞLI") || codeStr.includes("BAGLI")) {
    return MODEL_WIDTH_CONFIG.model_A_bagli; // 10 metre
  }
  if (codeStr === "C" || codeStr.includes("BESİ") || codeStr.includes("BESI")) {
    return MODEL_WIDTH_CONFIG.model_C_besi; // 12 metre
  }
  if (codeStr === "E" || codeStr.includes("AÇIK") || codeStr.includes("ACIK")) {
    return MODEL_WIDTH_CONFIG.model_E_acikBesi; // 12 metre
  }

  return MODEL_WIDTH_CONFIG.default_acik;
}

export interface ModelDimensionInfo {
  length: number;
  width: number;
  totalArea: number;
  dimensionsText: string;
  areaText: string;
}

/**
 * Kapasite ve model koduna göre tam dinamik ölçü ve m² hesabını döner.
 */
export function getModelDimensions(
  capacityValue: number,
  modelCode?: ModelTypeCode | string
): ModelDimensionInfo {
  const length = getModelLength(capacityValue);
  const width = getModelWidth(modelCode);
  const totalArea = length * width;

  return {
    length,
    width,
    totalArea,
    dimensionsText: `${length} × ${width} m`,
    areaText: `${totalArea} m²`,
  };
}

/**
 * Sayıyı binlik noktalı metin yapar (örn: 1500000 -> 1.500.000)
 */
export function formatPrice(amount: number): string {
  if (isNaN(amount) || amount === 0) return "0";
  return new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Sayıyı Türk Lirası para formatına dönüştürür (örn: 1500000 -> ₺1.500.000)
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === 0) return "₺0";
  const formatted = new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
  return `₺${formatted}`;
}

/**
 * Sayıyı binlik noktalı metin yapar (örn: 10000 -> 10.000 TL / m²)
 */
export function formatUnitCost(cost: number): string {
  const formatted = new Intl.NumberFormat("tr-TR").format(cost);
  return `${formatted} TL / m²`;
}

/**
 * Model tipi ve yapı sistemine göre geçerli m² birim maliyetini döner.
 * Öncelik: E — Açık Besi Modeli ise doğrudan 7.000 TL/m² uygulanır.
 */
export function getUnitCost(system: BuildingSystemType | string, modelType?: ModelTypeCode | string): number {
  const isAcikBesi = modelType === "E" || (typeof modelType === "string" && (modelType.toLowerCase().includes("açık") || modelType.toLowerCase().includes("acik")));
  
  if (isAcikBesi) {
    return PRICING_CONFIG.unitCosts.acikBesi; // 7.000 TL / m²
  }

  const sys = (system || "").toLowerCase();
  if (sys.includes("prefabrik")) {
    return PRICING_CONFIG.unitCosts.prefabrik; // 10.000 TL / m²
  }
  if (sys.includes("betonarme")) {
    return PRICING_CONFIG.unitCosts.betonarme; // 12.000 TL / m²
  }
  // Varsayılan: Çelik
  return PRICING_CONFIG.unitCosts.celik; // 11.000 TL / m²
}

export interface CalculationResult {
  length: number;
  width: number;
  dimensionsText: string;
  totalArea: number;
  unitCost: number;
  unitCostFormatted: string;
  totalCost: number;
  totalCostFormatted: string;
  calculationText: string;
  buildingSystem: string;
  modelType?: string;
  disclaimer: string;
}

/**
 * Toplam Alan ve Yapı Sistemi üzerinden tahmini yapım maliyetini hesaplar.
 * Formül: Toplam Alan (m²) × m² Birim Maliyeti = Tahmini Yapım Maliyeti
 */
export function calculateEstimatedCost(
  totalArea: number,
  system: BuildingSystemType | string = "Çelik",
  modelType?: ModelTypeCode | string
): CalculationResult {
  const area = totalArea || 0;
  const width = getModelWidth(modelType);
  const length = width > 0 ? Math.round(area / width) : 0;
  const unitCost = getUnitCost(system, modelType);
  const totalCost = area * unitCost;

  return {
    length,
    width,
    dimensionsText: `${length} × ${width} m`,
    totalArea: area,
    unitCost: unitCost,
    unitCostFormatted: formatUnitCost(unitCost),
    totalCost: totalCost,
    totalCostFormatted: formatCurrency(totalCost),
    calculationText: `${area} m² × ${formatUnitCost(unitCost)}`,
    buildingSystem: system,
    modelType: typeof modelType === "string" ? modelType : undefined,
    disclaimer: PRICING_CONFIG.disclaimer,
  };
}

/**
 * Kapasite, Yapı Sistemi ve Model Tipi üzerinden dinamik maliyet hesaplar.
 */
export function calculateCostByCapacity(
  capacityValue: number,
  system: BuildingSystemType | string = "Çelik",
  modelType?: ModelTypeCode | string
): CalculationResult {
  const dim = getModelDimensions(capacityValue, modelType);
  const result = calculateEstimatedCost(dim.totalArea, system, modelType);
  return {
    ...result,
    length: dim.length,
    width: dim.width,
    dimensionsText: dim.dimensionsText,
  };
}

export interface ModelPriceItem {
  modelCode: "A" | "B" | "C" | "D" | "E";
  modelName: string;
  capacity: string;
  capacityValue: number;
  length: number;
  width: number;
  dimensions: string;
  area: number;
  buildingSystem: "Çelik" | "Prefabrik" | "Betonarme";
  unitCost: number;
  unitCostFormatted: string;
  totalCost: number;
  priceText: string;
  calculationText: string;
  priceType: string;
  priceNote: string;
  slug: string;
}

// Standart Çiftlik Fiyat Listesi Verileri (Tümü dinamik ölçü ve fiyat formülü ile hesaplanır)
const RAW_PRICING_TABLE = [
  // Model A (Bağlı Sistem -> 10m Genişlik)
  { modelCode: "A" as const, modelName: "A — Bağlı Sistem", capacity: "25 Baş", capacityValue: 25, buildingSystem: "Prefabrik" as const, slug: "25-baslik-a-modeli-prefabrik" },
  { modelCode: "A" as const, modelName: "A — Bağlı Sistem", capacity: "50 Baş", capacityValue: 50, buildingSystem: "Çelik" as const, slug: "50-baslik-a-modeli-celik" },
  { modelCode: "A" as const, modelName: "A — Bağlı Sistem", capacity: "100 Baş", capacityValue: 100, buildingSystem: "Çelik" as const, slug: "100-baslik-a-modeli-celik" },
  
  // Model B (Karma Sistem -> 14m Genişlik)
  { modelCode: "B" as const, modelName: "B — Besi + Süt Karma", capacity: "25 Baş", capacityValue: 25, buildingSystem: "Çelik" as const, slug: "25-baslik-b-modeli-celik" },
  { modelCode: "B" as const, modelName: "B — Besi + Süt Karma", capacity: "50 Baş", capacityValue: 50, buildingSystem: "Çelik" as const, slug: "50-baslik-b-modeli-celik" },
  { modelCode: "B" as const, modelName: "B — Besi + Süt Karma", capacity: "75 Baş", capacityValue: 75, buildingSystem: "Çelik" as const, slug: "75-baslik-b-modeli-celik" },
  { modelCode: "B" as const, modelName: "B — Besi + Süt Karma", capacity: "100 Baş", capacityValue: 100, buildingSystem: "Çelik" as const, slug: "100-baslik-b-modeli-celik" },
  { modelCode: "B" as const, modelName: "B — Besi + Süt Karma", capacity: "150 Baş", capacityValue: 150, buildingSystem: "Çelik" as const, slug: "150-baslik-b-modeli-celik" },
  { modelCode: "B" as const, modelName: "B — Besi + Süt Karma", capacity: "200 Baş", capacityValue: 200, buildingSystem: "Çelik" as const, slug: "200-baslik-b-modeli-celik" },
  
  // Model C (Besi Modeli -> 12m Genişlik)
  { modelCode: "C" as const, modelName: "C — Besi Modeli", capacity: "25 Baş", capacityValue: 25, buildingSystem: "Çelik" as const, slug: "25-baslik-c-modeli-celik" },
  { modelCode: "C" as const, modelName: "C — Besi Modeli", capacity: "50 Baş", capacityValue: 50, buildingSystem: "Çelik" as const, slug: "50-baslik-c-modeli-celik" },
  { modelCode: "C" as const, modelName: "C — Besi Modeli", capacity: "75 Baş", capacityValue: 75, buildingSystem: "Çelik" as const, slug: "75-baslik-c-modeli-celik" },
  { modelCode: "C" as const, modelName: "C — Besi Modeli", capacity: "100 Baş", capacityValue: 100, buildingSystem: "Betonarme" as const, slug: "100-baslik-c-modeli-betonarme" },
  { modelCode: "C" as const, modelName: "C — Besi Modeli", capacity: "150 Baş", capacityValue: 150, buildingSystem: "Çelik" as const, slug: "150-baslik-c-modeli-celik" },
  { modelCode: "C" as const, modelName: "C — Besi Modeli", capacity: "200 Baş", capacityValue: 200, buildingSystem: "Çelik" as const, slug: "200-baslik-c-modeli-celik" },
  
  // Model D (Süt Modeli -> 18m Genişlik)
  { modelCode: "D" as const, modelName: "D — Süt Modeli", capacity: "25 Baş", capacityValue: 25, buildingSystem: "Çelik" as const, slug: "25-baslik-d-modeli-celik" },
  { modelCode: "D" as const, modelName: "D — Süt Modeli", capacity: "50 Baş", capacityValue: 50, buildingSystem: "Çelik" as const, slug: "50-baslik-d-modeli-celik" },
  { modelCode: "D" as const, modelName: "D — Süt Modeli", capacity: "75 Baş", capacityValue: 75, buildingSystem: "Çelik" as const, slug: "75-baslik-d-modeli-celik" },
  { modelCode: "D" as const, modelName: "D — Süt Modeli", capacity: "100 Baş", capacityValue: 100, buildingSystem: "Çelik" as const, slug: "100-baslik-d-modeli-celik" },
  { modelCode: "D" as const, modelName: "D — Süt Modeli", capacity: "150 Baş", capacityValue: 150, buildingSystem: "Çelik" as const, slug: "150-baslik-d-modeli-celik" },
  { modelCode: "D" as const, modelName: "D — Süt Modeli", capacity: "200 Baş", capacityValue: 200, buildingSystem: "Çelik" as const, slug: "200-baslik-d-modeli-celik" },
  
  // Model E (Açık Besi Modeli -> 12m Genişlik, 7.000 TL/m²)
  { modelCode: "E" as const, modelName: "E — Açık Besi Modeli", capacity: "25 Baş", capacityValue: 25, buildingSystem: "Çelik" as const, slug: "25-baslik-e-modeli-celik" },
  { modelCode: "E" as const, modelName: "E — Açık Besi Modeli", capacity: "50 Baş", capacityValue: 50, buildingSystem: "Çelik" as const, slug: "50-baslik-e-modeli-celik" },
  { modelCode: "E" as const, modelName: "E — Açık Besi Modeli", capacity: "75 Baş", capacityValue: 75, buildingSystem: "Çelik" as const, slug: "75-baslik-e-modeli-celik" },
  { modelCode: "E" as const, modelName: "E — Açık Besi Modeli", capacity: "100 Baş", capacityValue: 100, buildingSystem: "Çelik" as const, slug: "100-baslik-e-modeli-celik" },
  { modelCode: "E" as const, modelName: "E — Açık Besi Modeli", capacity: "150 Baş", capacityValue: 150, buildingSystem: "Çelik" as const, slug: "150-baslik-e-modeli-celik" },
  { modelCode: "E" as const, modelName: "E — Açık Besi Modeli", capacity: "200 Baş", capacityValue: 200, buildingSystem: "Çelik" as const, slug: "200-baslik-e-modeli-celik" },
];

// Fiyatları ve ölçüleri tam dinamik formülle üreten tablo
export const STANDARD_FARM_PRICES: ModelPriceItem[] = RAW_PRICING_TABLE.map((item) => {
  const dim = getModelDimensions(item.capacityValue, item.modelCode);
  const calc = calculateEstimatedCost(dim.totalArea, item.buildingSystem, item.modelCode);
  return {
    ...item,
    length: dim.length,
    width: dim.width,
    dimensions: dim.dimensionsText,
    area: dim.totalArea,
    unitCost: calc.unitCost,
    unitCostFormatted: calc.unitCostFormatted,
    totalCost: calc.totalCost,
    priceText: calc.totalCostFormatted,
    calculationText: calc.calculationText,
    priceType: "Tahmini Yapım Maliyeti",
    priceNote: PRICING_CONFIG.disclaimer,
  };
});

/**
 * Kademeli Fiyat Hesaplama Sonuç Arayüzü (3 Aşamalı Hesaplayıcı)
 */
export interface StepCalculationResult {
  isValid: boolean;
  hasExactPrice: boolean;
  capacityValue: number | null;
  capacityText: string;
  modelOption: StepModelOption | null;
  systemOption: StepSystemOption | null;
  length: number | null;
  width: number | null;
  dimensionsText: string;
  totalArea: number | null;
  areaText: string;
  unitCost: number;
  unitCostFormatted: string;
  totalCost: number | null;
  priceDisplay: string; // "₺3.850.000" veya "Proje detaylarına göre teklif oluşturulur."
  breakdownText: string; // "350 m² × 11.000 TL/m² = ₺3.850.000"
  disclaimer: string;
  whatsappMessage: string;
  offerUrl: string;
}

/**
 * 3 Aşamalı Kademeli Fiyat Hesaplayıcı Mantığı:
 * 1. Kapasite (25 - 250 Baş)
 * 2. Model (A, B, C, D, E)
 * 3. Yapı Sistemi (Prefabrik, Ağır Çelik, Betonarme)
 * 
 * Hata ve Tanımlanmamış Kapasite Kontrolü:
 * - 125, 175, 225, 250 gibi tanımlanmamış kapasiteler için rastgele değer üretilmez;
 *   "Proje ölçüsü teklif aşamasında belirlenir" ve "Proje detaylarına göre teklif oluşturulur." döner.
 * - Model E (Açık Besi) seçildiğinde yapı sistemi ne olursa olsun birim maliyet 7.000 TL / m² uygulanır.
 */
export function calculateStepPrice(
  capacity: number | null,
  modelCode: "A" | "B" | "C" | "D" | "E" | null,
  systemId: "prefabrik" | "celik" | "betonarme" | null
): StepCalculationResult {
  const disclaimer = PRICING_CONFIG.disclaimer;

  // 1. Kapasite Seçim Kontrolü
  const capacityValue = capacity;
  const capacityText = capacityValue ? `${capacityValue} Baş` : "";

  // 2. Model Seçim Kontrolü
  const modelOption = STEP_MODEL_OPTIONS.find((m) => m.code === modelCode) || null;

  // 3. Yapı Sistemi Seçim Kontrolü
  const systemOption = STEP_SYSTEM_OPTIONS.find((s) => s.id === systemId) || null;

  // Eksik seçim kontrolü
  if (!capacityValue || !modelOption || !systemOption) {
    return {
      isValid: false,
      hasExactPrice: false,
      capacityValue,
      capacityText,
      modelOption,
      systemOption,
      length: null,
      width: null,
      dimensionsText: "Seçim bekleniyor",
      totalArea: null,
      areaText: "—",
      unitCost: 0,
      unitCostFormatted: "—",
      totalCost: null,
      priceDisplay: "Proje detaylarına göre teklif oluşturulur.",
      breakdownText: "Seçimlerinizi tamamlayınız.",
      disclaimer,
      whatsappMessage: "",
      offerUrl: "/teklif-al",
    };
  }

  // 4. Uzunluk Kontrolü (Tanımlanmamış veya null ise)
  const length = CAPACITY_CONFIG[capacityValue] ?? null;

  // 5. Genişlik Kontrolü
  const width = modelOption.width;

  // 6. Birim Maliyet Kontrolü (Önemli İstisna: Model E Açık Besi daima 7.000 TL/m²)
  let unitCost = systemOption.unitCost;
  if (modelOption.code === "E") {
    unitCost = PRICING_CONFIG.unitCosts.acikBesi; // 7.000 TL / m²
  }
  const unitCostFormatted = formatUnitCost(unitCost);

  // Tanımlanmamış kapasiteler (125, 175, 225, 250 veya null olanlar)
  if (length === null || length <= 0) {
    const dimensionsText = "Proje ölçüsü teklif aşamasında belirlenir";
    const areaText = "Teklif aşamasında belirlenir";
    const priceDisplay = "Proje detaylarına göre teklif oluşturulur.";
    const breakdownText = "Bu kapasite için özel statik ve mimari yerleşim projelendirmesi yapılarak teklif sunulmaktadır.";

    const whatsappMsg = `Merhaba, ${capacityText} ${modelOption.title} ${systemOption.title} yapı için bilgi almak istiyorum.`;
    const offerUrl = `/teklif-al?kapasite=${encodeURIComponent(capacityText)}&model=${encodeURIComponent(modelOption.title)}&sistem=${encodeURIComponent(systemOption.title)}&alan=${encodeURIComponent(areaText)}&fiyat=${encodeURIComponent(priceDisplay)}`;

    return {
      isValid: true,
      hasExactPrice: false,
      capacityValue,
      capacityText,
      modelOption,
      systemOption,
      length: null,
      width,
      dimensionsText,
      totalArea: null,
      areaText,
      unitCost,
      unitCostFormatted,
      totalCost: null,
      priceDisplay,
      breakdownText,
      disclaimer,
      whatsappMessage: whatsappMsg,
      offerUrl,
    };
  }

  // 7. Doğrulanmış Alan ve Tahmini Yapım Maliyeti
  const totalArea = length * width;
  const totalCost = totalArea * unitCost;
  const totalCostFormatted = formatCurrency(totalCost);
  const dimensionsText = `${length} × ${width} m`;
  const areaText = `${totalArea} m²`;
  const breakdownText = `${totalArea} m² × ${unitCostFormatted} = ${totalCostFormatted}`;

  const whatsappMsg = `Merhaba, ${capacityText} ${modelOption.title} ${systemOption.title} yapı için bilgi almak istiyorum.`;
  const offerUrl = `/teklif-al?kapasite=${encodeURIComponent(capacityText)}&model=${encodeURIComponent(modelOption.title)}&sistem=${encodeURIComponent(systemOption.title)}&olcu=${encodeURIComponent(dimensionsText)}&alan=${encodeURIComponent(areaText)}&fiyat=${encodeURIComponent(totalCostFormatted)}`;

  return {
    isValid: true,
    hasExactPrice: true,
    capacityValue,
    capacityText,
    modelOption,
    systemOption,
    length,
    width,
    dimensionsText,
    totalArea,
    areaText,
    unitCost,
    unitCostFormatted,
    totalCost,
    priceDisplay: totalCostFormatted,
    breakdownText,
    disclaimer,
    whatsappMessage: whatsappMsg,
    offerUrl,
  };
}

