export type ModelTypeCode = "A" | "B" | "C" | "D" | "E";
export type BuildingSystemType = "Çelik" | "Prefabrik" | "Betonarme";

export interface FarmModelTypeInfo {
  code: ModelTypeCode;
  name: string; // e.g. "A — Bağlı Sistem"
  shortName: string;
  description: string;
  systemSummary: string;
}

export interface ConstructionStage {
  step: string; // "01", "02", ... "11"
  title: string;
  description: string;
}

export interface AnimalWelfareItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface BuildingSystemOptionInfo {
  system: BuildingSystemType;
  slug: string;
  title: string;
  description: string;
  advantages: string[];
  estimatedDurationWeeks: number;
  estimatedCost: string;
}

export interface Project {
  id: string;
  slug: string;
  slugAliases?: string[];
  title: string;
  category: 'besi-ciftligi' | 'sut-ciftligi' | 'karma-ciftlik' | 'bagli-sistem' | 'acik-besi' | 'ahir' | 'ev' | 'celik-yapi' | 'tarimsal-yapi';
  categoryLabel: string;
  capacity?: string; // "25 Baş", "50 Baş", "75 Baş", "100 Baş", "150 Baş", "200 Baş", "200+ Baş"
  capacityValue?: number; // 25, 50, 75, 100, 150, 200, 250
  modelType?: ModelTypeCode; // A, B, C, D, E
  modelName?: string; // "A — Bağlı Sistem", "B — Besi + Süt Karma", "C — Besi Modeli", "D — Süt Modeli", "E — Açık Besi Modeli"
  buildingSystem?: BuildingSystemType; // "Çelik", "Prefabrik", "Betonarme"
  
  length?: number;
  width?: number;
  totalArea?: number;
  livestockType?: string;
  dimensions?: {
    length: number;
    width: number;
    height?: number;
    totalArea: number;
  };
  
  system: string;
  shortDescription: string;
  fullDescription: string;
  
  // Detaylı Profesyonel Bölümler
  projectAbout?: string;
  systemDescription?: string;
  animalWelfare?: AnimalWelfareItem[];
  constructionStages?: ConstructionStage[];
  systemOptions?: BuildingSystemOptionInfo[];
  
  mainImage: string;
  gallery: string[];
  features: string[];
  advantages: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  turnkeyIncluded: string[];
  blueprintLayout?: {
    feedAlleyWidth?: string;
    penDimensions?: string;
    ventilation?: string;
    manureSystem?: string;
    roofSystem?: string;
  };
  estimatedDurationWeeks?: number;
  estimatedCost?: string;
  priceNote?: string;
  location?: string;
  status?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  features: string[];
  scope: string[];
  benefits: string[];
  faq?: { question: string; answer: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  city: string;
  projectType: string;
  animalCapacity?: string;
  modelType?: string;
  buildingSystem?: string;
  landArea?: string;
  estimatedBudget?: string;
  message?: string;
}
