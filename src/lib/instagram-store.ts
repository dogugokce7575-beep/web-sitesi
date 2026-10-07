import { InstagramManagedPost, ProjectVerificationStatus } from "@/types/instagram";
import { SEED_INSTAGRAM_POSTS, instagramConfig } from "@/config/instagram";
import { classifyInstagramPost } from "./instagram-classifier";

// In-Memory & Cache Store for Managed Instagram Posts
let cachedPosts: InstagramManagedPost[] = [];

// Başlangıç verilerini otomatik sınıflandırarak yükle
function initializeStore(): InstagramManagedPost[] {
  if (cachedPosts.length > 0) return cachedPosts;

  cachedPosts = SEED_INSTAGRAM_POSTS.map((seed, idx) => {
    const classification = classifyInstagramPost(seed.rawCaption, seed.mediaType);
    
    // Durum belirleme: Eksik alan varsa needs_review, tamamsa approved veya published
    let status: ProjectVerificationStatus = "draft";
    if (classification.confidenceScore < 75 || classification.needsManualReviewReasons.length > 0) {
      status = "needs_review";
    } else {
      status = idx < 3 ? "published" : "approved";
    }

    return {
      id: seed.id,
      originalInstagramId: seed.originalInstagramId,
      permalink: seed.permalink,
      publishedAt: seed.publishedAt,
      rawCaption: seed.rawCaption,
      mediaType: seed.mediaType,
      localMediaUrl: seed.localMediaUrl,
      localThumbnailUrl: seed.localThumbnailUrl,
      mediaStorageStatus: seed.mediaStorageStatus,
      
      status: status,
      capacity: classification.detectedCapacity,
      capacityLabel: classification.detectedCapacity ? `${classification.detectedCapacity} Baş` : undefined,
      modelType: classification.detectedModelType,
      modelName: classification.detectedModelType ? `Model ${classification.detectedModelType}` : undefined,
      buildingSystem: classification.detectedBuildingSystem,
      
      length: classification.dimensions?.length,
      width: classification.dimensions?.width,
      totalArea: classification.dimensions?.totalArea,
      
      estimatedPrice: classification.detectedPrice,
      priceType: instagramConfig.defaultPriceType,
      priceNote: instagramConfig.defaultPriceNote,
      
      title: classification.professionalTitle,
      shortDescription: classification.cleanDescription.slice(0, 160) + "...",
      fullDescription: classification.cleanDescription,
      features: classification.detectedFeatures,
      
      linkedModelSlug: classification.suggestedModelSlug,
      isFeaturedOnHome: idx < 4,
      lastUpdatedAt: new Date().toISOString(),
    };
  });

  return cachedPosts;
}

export function getInstagramPosts(): InstagramManagedPost[] {
  return initializeStore();
}

export function getInstagramPostById(id: string): InstagramManagedPost | undefined {
  const posts = initializeStore();
  return posts.find((p) => p.id === id);
}

export function getPublishedInstagramPosts(): InstagramManagedPost[] {
  const posts = initializeStore();
  return posts.filter((p) => p.status === "published");
}

export function getInstagramPostsByModelSlug(modelSlug: string): InstagramManagedPost[] {
  const posts = getPublishedInstagramPosts();
  return posts.filter((p) => p.linkedModelSlug === modelSlug);
}

export function updateInstagramPost(id: string, updates: Partial<InstagramManagedPost>): InstagramManagedPost | null {
  const posts = initializeStore();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    ...updates,
    lastUpdatedAt: new Date().toISOString(),
  };

  return posts[index];
}

export function publishInstagramPost(id: string): InstagramManagedPost | null {
  return updateInstagramPost(id, {
    status: "published",
    reviewedAt: new Date().toISOString(),
    reviewedBy: "Admin",
  });
}

export function addInstagramPostFromApi(rawPost: {
  id: string;
  originalInstagramId: string;
  permalink: string;
  publishedAt: string;
  rawCaption: string;
  mediaType: "image" | "video";
  localMediaUrl: string;
  localThumbnailUrl: string;
}): InstagramManagedPost {
  const posts = initializeStore();
  
  // Duplicate kontrolü
  const existing = posts.find((p) => p.originalInstagramId === rawPost.originalInstagramId);
  if (existing) {
    return existing;
  }

  const classification = classifyInstagramPost(rawPost.rawCaption, rawPost.mediaType);
  const status: ProjectVerificationStatus = classification.confidenceScore >= 80 ? "draft" : "needs_review";

  const newPost: InstagramManagedPost = {
    id: `ig_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    originalInstagramId: rawPost.originalInstagramId,
    permalink: rawPost.permalink,
    publishedAt: rawPost.publishedAt || new Date().toISOString(),
    rawCaption: rawPost.rawCaption,
    mediaType: rawPost.mediaType,
    localMediaUrl: rawPost.localMediaUrl,
    localThumbnailUrl: rawPost.localThumbnailUrl,
    mediaStorageStatus: "saved_locally",
    
    status,
    capacity: classification.detectedCapacity,
    capacityLabel: classification.detectedCapacity ? `${classification.detectedCapacity} Baş` : undefined,
    modelType: classification.detectedModelType,
    modelName: classification.detectedModelType ? `Model ${classification.detectedModelType}` : undefined,
    buildingSystem: classification.detectedBuildingSystem,
    
    length: classification.dimensions?.length,
    width: classification.dimensions?.width,
    totalArea: classification.dimensions?.totalArea,
    
    estimatedPrice: classification.detectedPrice,
    priceType: instagramConfig.defaultPriceType,
    priceNote: instagramConfig.defaultPriceNote,
    
    title: classification.professionalTitle,
    shortDescription: classification.cleanDescription.slice(0, 160) + "...",
    fullDescription: classification.cleanDescription,
    features: classification.detectedFeatures,
    
    linkedModelSlug: classification.suggestedModelSlug,
    isFeaturedOnHome: false,
    lastUpdatedAt: new Date().toISOString(),
  };

  posts.unshift(newPost);
  return newPost;
}
