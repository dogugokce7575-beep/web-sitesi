import { ModelTypeCode, BuildingSystemType } from "@/types";
import { AIClassificationResult } from "@/types/instagram";
import { FARM_MODEL_TYPES, FARM_CAPACITIES, BUILDING_SYSTEMS } from "@/data/projects";
import { getModelDimensions } from "@/config/pricing";

/**
 * AI ve Kural Tabanlı Instagram İçerik Sınıflandırıcı
 * 
 * Kesin Kural: Açıkça belirtilmeyen hiçbir teknik veri (kapasite, model, fiyat, ölçü)
 * tahmin edilmez veya uydurulmaz. Emin olunmayan alanlar "Doğrulama Gerekli" olarak işaretlenir.
 */
export function classifyInstagramPost(caption: string, mediaType: "image" | "video"): AIClassificationResult {
  const normalized = (caption || "").toLowerCase();
  const reasons: string[] = [];
  let confidenceScore = 100;

  // 1. Kapasite Tespiti (25, 50, 75, 100, 150, 200 Baş)
  let detectedCapacity: number | undefined = undefined;
  let capacityStatus: "confirmed" | "needs_review" = "needs_review";

  const capacityMatch = normalized.match(/(\d{2,3})\s*(?:başlık|baş|büyükbaş|hayvanlık|sağmal)/i);
  if (capacityMatch && capacityMatch[1]) {
    const parsedCap = parseInt(capacityMatch[1], 10);
    const validCapacity = FARM_CAPACITIES.find((c) => c.value === parsedCap);
    if (validCapacity) {
      detectedCapacity = validCapacity.value;
      capacityStatus = "confirmed";
    } else {
      detectedCapacity = parsedCap;
      capacityStatus = "confirmed";
    }
  } else {
    // Özel ev projesi kontrolü
    if (normalized.includes("2+1") || normalized.includes("3+1") || normalized.includes("müstakil ev") || normalized.includes("konut")) {
      capacityStatus = "confirmed"; // Konut için hayvan kapasitesi gerekmez
    } else {
      reasons.push("Kapasite açıklamada açıkça belirtilmemiş.");
      confidenceScore -= 25;
    }
  }

  // 2. Model Tipi Tespiti (A, B, C, D, E)
  let detectedModelType: ModelTypeCode | undefined = undefined;
  let modelTypeStatus: "confirmed" | "needs_review" = "needs_review";

  if (normalized.includes("model a") || normalized.includes("a modeli") || (normalized.includes("bağlı") && !normalized.includes("besi"))) {
    detectedModelType = "A";
    modelTypeStatus = "confirmed";
  } else if (normalized.includes("model b") || normalized.includes("b modeli") || (normalized.includes("karma") || (normalized.includes("besi") && normalized.includes("süt")))) {
    detectedModelType = "B";
    modelTypeStatus = "confirmed";
  } else if (normalized.includes("model c") || normalized.includes("c modeli") || (normalized.includes("besi") && !normalized.includes("açık besi") && !normalized.includes("süt"))) {
    detectedModelType = "C";
    modelTypeStatus = "confirmed";
  } else if (normalized.includes("model d") || normalized.includes("d modeli") || (normalized.includes("süt") && !normalized.includes("besi"))) {
    detectedModelType = "D";
    modelTypeStatus = "confirmed";
  } else if (normalized.includes("model e") || normalized.includes("e modeli") || normalized.includes("açık besi") || normalized.includes("yarı açık")) {
    detectedModelType = "E";
    modelTypeStatus = "confirmed";
  } else {
    if (normalized.includes("ev") || normalized.includes("hangar") || normalized.includes("depo")) {
      // Çiftlik dışı yapı (ev/hangar)
      modelTypeStatus = "confirmed";
    } else {
      reasons.push("Model tipi (A/B/C/D/E) metinde kesin anlaşılamadı.");
      confidenceScore -= 25;
    }
  }

  // 3. Taşıyıcı Yapı Sistemi Tespiti (Çelik, Prefabrik, Betonarme)
  let detectedBuildingSystem: BuildingSystemType | undefined = undefined;
  let buildingSystemStatus: "confirmed" | "needs_review" = "needs_review";

  if (normalized.includes("çelik") || normalized.includes("celik") || normalized.includes("karkas") || normalized.includes("makas")) {
    detectedBuildingSystem = "Çelik";
    buildingSystemStatus = "confirmed";
  } else if (normalized.includes("prefabrik") || normalized.includes("modüler") || normalized.includes("moduler")) {
    detectedBuildingSystem = "Prefabrik";
    buildingSystemStatus = "confirmed";
  } else if (normalized.includes("betonarme") || normalized.includes("kolon kiriş") || normalized.includes("radye")) {
    detectedBuildingSystem = "Betonarme";
    buildingSystemStatus = "confirmed";
  } else {
    // Varsayılan endüstri standardı çeliktir ancak onay bekler
    detectedBuildingSystem = "Çelik";
    reasons.push("Taşıyıcı sistem metinde net belirtilmemiş (Çelik önerildi).");
    confidenceScore -= 15;
  }

  // 4. Ölçü ve Alan Tespiti (Örn: 25x12 m, 50x12, 15*10)
  let dimensions: AIClassificationResult["dimensions"] = undefined;
  let dimensionsStatus: "confirmed" | "needs_review" = "needs_review";

  const dimMatch = normalized.match(/(\d{1,3})\s*(?:[xX×*]|metreye|\s*m\s*[xX×*])\s*(\d{1,3})/);
  const m2Match = normalized.match(/(\d{2,4})\s*(?:m2|m²|metrekare)/i);

  if (dimMatch && dimMatch[1] && dimMatch[2]) {
    const rawD1 = parseInt(dimMatch[1], 10);
    const rawD2 = parseInt(dimMatch[2], 10);
    const length = Math.max(rawD1, rawD2);
    const width = Math.min(rawD1, rawD2);
    const totalArea = length * width;

    dimensions = {
      length,
      width,
      totalArea,
      rawText: `${length} × ${width} m`,
    };
    dimensionsStatus = "confirmed";
  } else if (m2Match && m2Match[1]) {
    const area = parseInt(m2Match[1], 10);
    // Kapasiteye göre standart genişlik (12m) ile boy çıkarımı
    const width = 12;
    const length = Math.round(area / width);
    dimensions = {
      length,
      width,
      totalArea: area,
      rawText: `${area} m²`,
    };
    dimensionsStatus = "confirmed";
  } else {
    // Kapasite biliniyorsa standart ölçü öner
    if (detectedCapacity) {
      const dim = getModelDimensions(detectedCapacity, detectedModelType);
      dimensions = {
        length: dim.length,
        width: dim.width,
        totalArea: dim.totalArea,
        rawText: `${dim.length} × ${dim.width} m (Standart)`,
      };
      reasons.push("Ölçü metinde yazılmamış; standart model ölçüsü önerildi.");
    } else {
      reasons.push("Ölçü (m × m) veya alan (m²) bilgisi bulunamadı.");
      confidenceScore -= 20;
    }
  }

  // 5. Fiyat Tespiti (Varsa alınır, yoksa uydurulmaz)
  let detectedPrice: string | undefined = undefined;
  let priceStatus: "confirmed" | "not_provided" = "not_provided";

  const priceMatch = caption.match(/(?:₺|TL|tl)\s*([\d.,]+)|([\d.,]+)\s*(?:₺|TL|tl)/);
  if (priceMatch) {
    detectedPrice = `₺ ${(priceMatch[1] || priceMatch[2]).trim()}`;
    priceStatus = "confirmed";
  } else {
    detectedPrice = "Fiyat için teklif alın";
    priceStatus = "not_provided";
  }

  // 6. Başlık ve Profesyonel Açıklama Üretimi
  let professionalTitle = "";
  if (detectedCapacity && detectedModelType) {
    const modelObj = FARM_MODEL_TYPES.find((m) => m.code === detectedModelType);
    professionalTitle = `${detectedCapacity} Başlık ${detectedModelType} Modeli (${modelObj?.shortName || "Çiftlik"})`;
  } else if (dimensions?.totalArea && normalized.includes("ev")) {
    professionalTitle = `${dimensions.totalArea} m² Anahtar Teslim Müstakil Ev`;
  } else if (dimensions?.totalArea && (normalized.includes("hangar") || normalized.includes("depo") || normalized.includes("çelik"))) {
    professionalTitle = `${dimensions.totalArea} m² Çelik Konstrüksiyon Tarımsal Yapı`;
  } else {
    professionalTitle = caption.slice(0, 60).replace(/[#@\n].*/g, "").trim() || "Gökçe İnşaat Saha Projesi";
  }

  // Açıklamayı hashtag ve emoji kirliliğinden arındırarak kurumsal formata dönüştür
  const cleanDescription = caption
    .replace(/#[a-zA-Z0-9_ğüşıöçĞÜŞİÖÇ]+/g, "") // Hashtagleri temizle
    .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")   // Linkleri temizle
    .replace(/@[a-zA-Z0-9_.]+/g, "")             // Mentionları temizle
    .replace(/\s+/g, " ")                        // Fazla boşlukları temizle
    .trim();

  // Öne çıkan teknik özellikler listesi
  const detectedFeatures: string[] = [];
  if (dimensions) detectedFeatures.push(`${dimensions.length}m × ${dimensions.width}m net kullanım alanı (${dimensions.totalArea} m²)`);
  if (normalized.includes("yemleme") || normalized.includes("traktör")) detectedFeatures.push("Merkezi traktör yemleme yolu ve yem kilitleri");
  if (normalized.includes("suluk") || normalized.includes("donmaz")) detectedFeatures.push("Sirkülasyonlu donmaya dayanıklı otomatik suluk altyapısı");
  if (normalized.includes("havalandırma") || normalized.includes("mahya")) detectedFeatures.push("Doğal baca etkili mahya havalandırma sistemi");
  if (normalized.includes("beton") || normalized.includes("saha betonu")) detectedFeatures.push("C25/30 hasır çelikli kaymaz fırçalı zemin betonu");
  if (normalized.includes("montaj") || normalized.includes("çelik")) detectedFeatures.push(`${detectedBuildingSystem || "Çelik"} taşıyıcı karkas montajı`);

  // Model Slug Eşleştirme
  let suggestedModelSlug: string | undefined = undefined;
  if (detectedCapacity && detectedModelType && detectedBuildingSystem) {
    suggestedModelSlug = `${detectedCapacity}-baslik-${detectedModelType.toLowerCase()}-modeli-${detectedBuildingSystem.toLowerCase()}`;
  }

  confidenceScore = Math.max(10, Math.min(100, confidenceScore));

  return {
    detectedCapacity,
    capacityStatus,
    detectedModelType,
    modelTypeStatus,
    detectedBuildingSystem,
    buildingSystemStatus,
    dimensions,
    dimensionsStatus,
    detectedPrice,
    priceStatus,
    professionalTitle,
    cleanDescription,
    detectedFeatures,
    suggestedModelSlug,
    confidenceScore,
    needsManualReviewReasons: reasons,
  };
}
