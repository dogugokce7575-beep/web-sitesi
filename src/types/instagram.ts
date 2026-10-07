import { ModelTypeCode, BuildingSystemType } from "./index";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "REELS";

export type ProjectVerificationStatus = 
  | "draft"              // Taslak (İnceleme Bekliyor)
  | "needs_review"       // Doğrulama Gerekli (Eksik/Belirsiz Alanlar Var)
  | "approved"           // Onaylandı (Kataloğa Aktarılmaya Hazır)
  | "published";         // Yayınlandı (Web Sitesi Kataloğunda Canlı)

export interface InstagramRawPost {
  id: string;
  caption?: string;
  media_type: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  children?: {
    data: Array<{
      id: string;
      media_type: InstagramMediaType;
      media_url: string;
    }>;
  };
}

export interface AIClassificationResult {
  detectedCapacity?: number;
  capacityStatus: "confirmed" | "needs_review";
  
  detectedModelType?: ModelTypeCode;
  modelTypeStatus: "confirmed" | "needs_review";
  
  detectedBuildingSystem?: BuildingSystemType;
  buildingSystemStatus: "confirmed" | "needs_review";
  
  dimensions?: {
    length: number;
    width: number;
    totalArea: number;
    rawText: string;
  };
  dimensionsStatus: "confirmed" | "needs_review";
  
  detectedPrice?: string;
  priceStatus: "confirmed" | "not_provided";
  
  professionalTitle: string;
  cleanDescription: string;
  detectedFeatures: string[];
  suggestedModelSlug?: string;
  confidenceScore: number; // 0 to 100
  needsManualReviewReasons: string[];
}

export interface InstagramManagedPost {
  id: string;
  originalInstagramId: string;
  permalink: string;
  publishedAt: string;
  rawCaption: string;
  mediaType: "image" | "video";
  
  // Local storage paths (never raw ephemeral Instagram CDN URLs)
  localMediaUrl: string;
  localThumbnailUrl: string;
  mediaStorageStatus: "saved_locally" | "manual_upload_needed" | "optimized";
  
  // AI classification & Model linkage
  status: ProjectVerificationStatus;
  capacity?: number;
  capacityLabel?: string;
  modelType?: ModelTypeCode;
  modelName?: string;
  buildingSystem?: BuildingSystemType;
  
  length?: number;
  width?: number;
  totalArea?: number;
  
  estimatedPrice?: string;
  priceType?: string;
  priceNote?: string;
  
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  
  // Model catalog linkage
  linkedModelSlug?: string;
  isFeaturedOnHome: boolean;
  
  // Admin audit info
  reviewedBy?: string;
  reviewedAt?: string;
  lastUpdatedAt: string;
}

export interface InstagramSyncResponse {
  success: boolean;
  syncedCount: number;
  newDraftsCount: number;
  needsReviewCount: number;
  message: string;
  posts: InstagramManagedPost[];
}
