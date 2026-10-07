import { 
  Project, 
  FarmModelTypeInfo, 
  ModelTypeCode, 
  BuildingSystemType, 
  AnimalWelfareItem, 
  ConstructionStage,
  BuildingSystemOptionInfo 
} from "@/types";
import { 
  PRICING_CONFIG, 
  calculateEstimatedCost, 
  STANDARD_FARM_PRICES,
  getModelDimensions,
  getModelLength,
  getModelWidth,
  CAPACITY_CONFIG,
  MODEL_WIDTH_CONFIG,
  TURNKEY_PRICE_INCLUSIONS
} from "@/config/pricing";
import { MODEL_MEDIA } from "@/data/media";

export interface CoreCatalogModel {
  code: "A" | "B" | "C" | "D" | "E";
  name: string;
  badge: string;
  slug: string;
  width: number;
  widthText: string;
  systemTypes: string;
  capacityRange: string;
  shortDescription: string;
  systemSummary: string;
  mainImage: string;
  gallery: string[];
}

export const FIVE_CORE_MODELS: CoreCatalogModel[] = [
  {
    code: "A",
    name: "A — Bağlı Sistem",
    badge: "Model A",
    slug: "a-bagli-sistem",
    width: 10,
    widthText: "10 metre",
    systemTypes: "Ağır Çelik / Prefabrik / Betonarme",
    capacityRange: "25 - 250 Baş",
    shortDescription: "Kontrollü barındırma ve düzenli işletme planlamasına uygun sistem.",
    systemSummary: "Bağlı sistem, hayvanların belirlenmiş duraklarda kontrollü şekilde barındırıldığı bir işletme modelidir. Yemleme, sulama, bakım ve günlük işletme faaliyetlerinin düzenli şekilde yürütülmesine olanak sağlar.",
    mainImage: MODEL_MEDIA.A.mainImage,
    gallery: MODEL_MEDIA.A.gallery,
  },
  {
    code: "B",
    name: "B — Besi + Süt Karma Sistem",
    badge: "Model B",
    slug: "b-karma-sistem",
    width: 14,
    widthText: "14 metre",
    systemTypes: "Ağır Çelik / Prefabrik / Betonarme",
    capacityRange: "25 - 250 Baş",
    shortDescription: "Besi ve süt işletmesinin birlikte planlandığı karma model.",
    systemSummary: "Besi ve süt işletmesinin birlikte planlandığı, bağımsız padok hatları ile sağmal ve besi süreçlerinin tek çatı altında optimize edildiği karma modeldir.",
    mainImage: MODEL_MEDIA.B.mainImage,
    gallery: MODEL_MEDIA.B.gallery,
  },
  {
    code: "C",
    name: "C — Besi Modeli",
    badge: "Model C",
    slug: "c-besi-modeli",
    width: 12,
    widthText: "12 metre",
    systemTypes: "Ağır Çelik / Prefabrik / Betonarme",
    capacityRange: "25 - 250 Baş",
    shortDescription: "Besi işletmeleri için planlanan model.",
    systemSummary: "Büyükbaş et üretimi odaklı, serbest padoklu, kesintisiz traktör yem yollu ve maksimum havalandırmalı endüstriyel besi modelidir.",
    mainImage: MODEL_MEDIA.C.mainImage,
    gallery: MODEL_MEDIA.C.gallery,
  },
  {
    code: "D",
    name: "D — Süt Modeli",
    badge: "Model D",
    slug: "d-sut-modeli",
    width: 18,
    widthText: "18 metre",
    systemTypes: "Ağır Çelik / Prefabrik / Betonarme",
    capacityRange: "25 - 250 Baş",
    shortDescription: "Süt sığırcılığı işletmeleri için planlanan model.",
    systemSummary: "Süt sığırcılığı işletmeleri için planlanan, serbest duraklı konfor yataklıkları, otomatik donmaz suluk altyapısı ve sağımhane entegrasyonuna uygun ileri teknoloji süt modelidir.",
    mainImage: MODEL_MEDIA.D.mainImage,
    gallery: MODEL_MEDIA.D.gallery,
  },
  {
    code: "E",
    name: "E — Açık Besi Modeli",
    badge: "Model E",
    slug: "e-acik-besi",
    width: 12,
    widthText: "12 metre",
    systemTypes: "Ağır Çelik / Prefabrik / Betonarme",
    capacityRange: "25 - 250 Baş",
    shortDescription: "Açık veya yarı açık işletme yaklaşımına uygun model.",
    systemSummary: "Açık veya yarı açık işletme yaklaşımına uygun, geniş gezinti padoklu, rüzgar perdeli ve doğal havalandırmalı ekonomik açık besi modelidir.",
    mainImage: MODEL_MEDIA.E.mainImage,
    gallery: MODEL_MEDIA.E.gallery,
  },
];

export const FARM_MODEL_TYPES: FarmModelTypeInfo[] = [
  {
    code: "A",
    name: "A — Bağlı Sistem",
    shortName: "Bağlı Sistem",
    description: "Bireysel yemleme ve suluk donanımlı, bağlı duraklı klasik ve yarı mekanize barınak modeli.",
    systemSummary: "Bağlı sistem, hayvanların belirlenmiş duraklarda kontrollü şekilde barındırıldığı bir işletme modelidir. Yemleme, sulama, bakım ve günlük işletme faaliyetlerinin düzenli şekilde yürütülmesine olanak sağlayacak şekilde planlanabilir.",
  },
  {
    code: "B",
    name: "B — Besi + Süt Karma Sistem",
    shortName: "Besi + Süt Karma",
    description: "Hem sağmal inekler hem de besi tosunları için bağımsız padoklara sahip çok amaçlı çiftlik modeli.",
    systemSummary: "Besi + Süt karma sistem; aynı işletme çatısı altında hem sağmal hayvanların süt üretimini hem de erkek tosunların besi gelişimini bağımsız padoklarda koordine eden çok yönlü ve karlı bir işletme modelidir.",
  },
  {
    code: "C",
    name: "C — Besi Modeli",
    shortName: "Besi Modeli",
    description: "Büyükbaş et üretimi için serbest padoklu, ferah ve hızlı kilo alımı odaklı modern besi modeli.",
    systemSummary: "Besi modeli; serbest dolaşımlı grup padokları ve kesintisiz 4.20m merkezi traktör yemleme yolu ile besi tosunlarının günlük canlı ağırlık artışını ve iş gücü tasarrufunu maksimize eden endüstriyel barınak sistemidir.",
  },
  {
    code: "D",
    name: "D — Süt Modeli",
    shortName: "Süt Modeli",
    description: "Sağım ünitesi bağlantılı, konfor yataklıklı ve yüksek hijyenik süt sığırcılığı modeli.",
    systemSummary: "Süt modeli; modern duraklı yataklıklar, otomatik kaşınma fırçaları, hijyenik sağımhane geçiş koridorları ve donmaz suluk altyapısı ile hayvan konforunu ve süt verimini artıran ileri teknoloji süt sığırcılığı modelidir.",
  },
  {
    code: "E",
    name: "E — Açık Besi Modeli",
    shortName: "Açık Besi Modeli",
    description: "Geniş gezinti alanlı, rüzgar kırıcı perdeli ve doğal havalandırmalı ekonomik yarı açık besi sistemi.",
    systemSummary: "Açık besi modeli; yarı açık gölgelikli sundurmalar, geniş açık gezinti arazisi ve doğal rüzgar sirkülasyonu ile minimum inşaat metrekare maliyetiyle maksimum sürü kapasitesi sağlayan ekonomik barınak sistemidir.",
  },
];

export const BUILDING_SYSTEMS: BuildingSystemType[] = ["Çelik", "Prefabrik", "Betonarme"];

// Kapasiteye göre standart proje uzunlukları (Genişlik ve m² modele göre dinamik hesaplanır)
export const FARM_CAPACITIES = [
  { label: "25 Baş", value: 25, length: 15 },
  { label: "50 Baş", value: 50, length: 25 },
  { label: "75 Baş", value: 75, length: 35 },
  { label: "100 Baş", value: 100, length: 50 },
  { label: "150 Baş", value: 150, length: 75 },
  { label: "200 Baş", value: 200, length: 100 },
  { label: "200+ Baş", value: 250, length: 125 },
];

export const DEFAULT_PRICE_NOTE = "Belirtilen fiyatlar model bazında tahmini fiyatlardır. Nihai fiyat; proje detayları, zemin koşulları, malzeme tercihleri, lokasyon ve kapsam doğrultusunda kesinleştirilir.";

const FARM_IMAGES: Record<ModelTypeCode, { main: string; gallery: string[] }> = {
  A: {
    main: MODEL_MEDIA.A.mainImage,
    gallery: MODEL_MEDIA.A.gallery,
  },
  B: {
    main: MODEL_MEDIA.B.mainImage,
    gallery: MODEL_MEDIA.B.gallery,
  },
  C: {
    main: MODEL_MEDIA.C.mainImage,
    gallery: MODEL_MEDIA.C.gallery,
  },
  D: {
    main: MODEL_MEDIA.D.mainImage,
    gallery: MODEL_MEDIA.D.gallery,
  },
  E: {
    main: MODEL_MEDIA.E.mainImage,
    gallery: MODEL_MEDIA.E.gallery,
  },
};

// 11 Standart Yapım Aşaması
const STANDARD_CONSTRUCTION_STAGES: ConstructionStage[] = [
  { step: "01", title: "İhtiyaç ve Kapasite Analizi", description: "Arsanın topoğrafyası, hayvan kapasitesi ve bölgesel iklim şartları analiz edilerek ihtiyaç programı netleştirilir." },
  { step: "02", title: "Arazi / Proje Ön Çalışması", description: "Hakim rüzgar yönü, güneş açısı ve traktör manevra yollarına göre tesisin araziye optimum yerleşimi planlanır." },
  { step: "03", title: "Mimari ve Statik Projelendirme", description: "Bölgenin kar ve rüzgar yükü hesaplarına tam uyumlu 3D mimari modelleme ve statik mukavemet projeleri çizilir." },
  { step: "04", title: "Zemin ve Temel Hazırlığı", description: "Saha hafriyatı, blokaj sıkıştırma, subasman kalıpları ve donatılı betonarme radye temel imalatı tamamlanır." },
  { step: "05", title: "Taşıyıcı Sistem İmalatı", description: "Fabrikada hassas kaynak ve kumlama ile hazırlanan ağır çelik / prefabrik taşıyıcı karkas sahada vinçle monte edilir." },
  { step: "06", title: "Çatı ve Cephe Uygulamaları", description: "Doğal mahya havalandırma açıklığına sahip antikondenzasyon yalıtımlı çatı panelleri ve rüzgar perdeleri uygulanır." },
  { step: "07", title: "Hayvan Alanları ve İç Düzenleme", description: "Sıcak daldırma galvanizli padok bölmeleri, durak demirleri, servis kapıları ve fırçalı kaymaz zemin betonu dökülür." },
  { step: "08", title: "Yemleme, Sulama & Gübre Sistemleri", description: "Merkezi traktör yem yolu, sirkülasyonlu donmaz otomatik döküm suluk hatları ve sıyırıcı tahliye kanalları kurulur." },
  { step: "09", title: "Elektrik ve Mekanik Uygulamalar", description: "Neme ve amonyağa dayanıklı endüstriyel LED aydınlatma, ana pano ve sıhhi tesisat hatları devreye alınır." },
  { step: "10", title: "Son Kontroller & Fonksiyon Testi", description: "Suluk sirkülasyonu, kapı kilitleri, hava akış yönleri ve statik güvenlik parametreleri mühendislerimizce denetlenir." },
  { step: "11", title: "Anahtar Teslim", description: "Yapı eksiksiz, temizlenmiş ve hemen hayvan yerleşimine hazır biçimde sözleşmeli süre içinde teslim edilir." },
];

// Hayvan Refahı Tasarım İlkeleri
const STANDARD_ANIMAL_WELFARE_ITEMS: AnimalWelfareItem[] = [
  { title: "Doğal Mahya Havalandırması", description: "Çatı tepe baca etkisi sayesinde ahır içindeki nem, amonyak ve sıcak hava sürekli dışarı atılır; hayvanlarda solunum yolu stresi önlenir." },
  { title: "Geniş ve Ferah Hayvan Alanı", description: "Hayvan başına düşen optimum metrekare alanı sayesinde sürü içi sıkışma, yaralanma ve stres minimum seviyeye indirilir." },
  { title: "Donmaz Kesintisiz Su Erişimi", description: "Termostatik sirkülasyonlu döküm otomatik suluklar sayesinde sert kış şartlarında dahi taze ve ılık suya 7/24 kesintisiz erişim sağlanır." },
  { title: "Kaymaz Fırçalı Zemin Betonu", description: "Özel desenli ve helikopter perdahlı eğimli zemin dokusu, tırnak sağlığını korur ve ıslak zemin kaynaklı kayma-düşme riskini ortadan kaldırır." },
  { title: "Doğal Gün Işığı & Aydınlatma", description: "Çatıda yer alan polikarbon ışıklıklar ve homojen LED aydınlatma, sirkadiyen ritmi destekleyerek süt ve et verimini artırır." },
  { title: "Kolay Gübre Tahliyesi", description: "Eğimli zemin ve traktör/otomatik sıyırıcıya uygun kanal tasarımı ile gübre ahırdan hızla uzaklaştırılır, hijyen standardı korunur." },
];

// Generate standard catalog of Farm Models dynamically
function generateFarmCatalog(): Project[] {
  const catalog: Project[] = [];

  FARM_CAPACITIES.forEach((cap) => {
    FARM_MODEL_TYPES.forEach((model) => {
      // Dinamik ölçü ve alan hesabı: Uzunluk (Kapasiteden) × Genişlik (Modelden)
      const dim = getModelDimensions(cap.value, model.code);

      BUILDING_SYSTEMS.forEach((system) => {
        // Safe ASCII Slugs
        const systemAscii = system === "Çelik" ? "celik" : system.toLowerCase();
        const primarySlug = `${cap.value}-baslik-${model.code.toLowerCase()}-modeli-${systemAscii}`;
        
        // URL Aliases to ensure 0% 404
        const aliases = [
          `${cap.value}-bas-${model.code.toLowerCase()}-${model.shortName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          `${cap.value}-bas-${model.code.toLowerCase()}-modeli`,
          `${cap.value}-baslik-${model.code.toLowerCase()}-modeli`,
          `${cap.value}-baslik-${model.code.toLowerCase()}-modeli-${system.toLowerCase()}`,
          `${cap.value}-baslik-${model.code.toLowerCase()}-modeli-celik`,
          `${cap.value}-baslik-${model.code.toLowerCase()}-modeli-prefabrik`,
          `${cap.value}-baslik-${model.code.toLowerCase()}-modeli-betonarme`,
          `${cap.value}-bas-${model.code.toLowerCase()}-bagli-sistem`,
          `${cap.value}-bas-${model.code.toLowerCase()}-besi-modeli`,
          `${cap.value}-bas-${model.code.toLowerCase()}-sut-modeli`,
          `${cap.value}-bas-${model.code.toLowerCase()}-karma-sistem`,
          `${cap.value}-bas-${model.code.toLowerCase()}-acik-besi`,
        ];

        const title = `${cap.value} Başlık ${model.code} Modeli (${model.shortName})`;
        
        let category: Project["category"] = "besi-ciftligi";
        if (model.code === "A") category = "bagli-sistem";
        if (model.code === "B") category = "karma-ciftlik";
        if (model.code === "C") category = "besi-ciftligi";
        if (model.code === "D") category = "sut-ciftligi";
        if (model.code === "E") category = "acik-besi";

        const isMainFeatured = (cap.value === 50 || cap.value === 100 || cap.value === 75 || cap.value === 25) && system === "Çelik" && (model.code === "C" || model.code === "B" || model.code === "D");

        // Otomatik m² birim maliyet hesaplama formülü: Alan × Birim Maliyeti
        const costCalc = calculateEstimatedCost(dim.totalArea, system, model.code);
        const estimatedCost = costCalc.totalCostFormatted;

        // 3 Taşıyıcı Sistem Seçeneği (Tümü dinamik m² maliyetiyle)
        const systemOptions: BuildingSystemOptionInfo[] = [
          {
            system: "Çelik",
            slug: `${cap.value}-baslik-${model.code.toLowerCase()}-modeli-celik`,
            title: `${cap.value} Başlık ${model.code} Modeli — Ağır Çelik Taşıyıcı`,
            description: "Geniş açıklıklı, ortada kolon engeli bulunmayan, yoğun kar ve rüzgar yüküne en dayanıklı modern taşıyıcı sistemdir.",
            advantages: ["Kolonsuz geniş iç hacim ve ferah manevra alanı", "Hızlı civatalı saha montajı", "Depreme ve fırtınalara karşı esnek mukavemet"],
            estimatedDurationWeeks: cap.value <= 50 ? 5 : (cap.value <= 100 ? 7 : 9),
            estimatedCost: calculateEstimatedCost(dim.totalArea, "Çelik", model.code).totalCostFormatted,
          },
          {
            system: "Prefabrik",
            slug: `${cap.value}-baslik-${model.code.toLowerCase()}-modeli-prefabrik`,
            title: `${cap.value} Başlık ${model.code} Modeli — Prefabrik Beton Kolonlu`,
            description: "Fabrikasyon ön üretimli betonarme kolon ve makas elemanları ile uzun ömürlü ve yangına yüksek mukavemetli yapı çözümüdür.",
            advantages: ["Korozyona ve yangına karşı üstün dayanım", "Standart modüler parça kalitesi", "Minimum bakım maliyeti"],
            estimatedDurationWeeks: cap.value <= 50 ? 6 : (cap.value <= 100 ? 8 : 10),
            estimatedCost: calculateEstimatedCost(dim.totalArea, "Prefabrik", model.code).totalCostFormatted,
          },
          {
            system: "Betonarme",
            slug: `${cap.value}-baslik-${model.code.toLowerCase()}-modeli-betonarme`,
            title: `${cap.value} Başlık ${model.code} Modeli — Konvansiyonel Betonarme`,
            description: "Klasik yerinde dökme betonarme taşıyıcı sistem; yüksek kütlesel dayanıklılık ve termal kütle avantajı sunar.",
            advantages: ["Maksimum rijitlik ve rüzgar direnci", "Bölgesel malzeme uyumluluğu", "Ağır dış iklim şartlarına tam mukavemet"],
            estimatedDurationWeeks: cap.value <= 50 ? 7 : (cap.value <= 100 ? 9 : 12),
            estimatedCost: calculateEstimatedCost(dim.totalArea, "Betonarme", model.code).totalCostFormatted,
          },
        ];

        // 4-6 Model Avantajı
        const advantages = [
          `İşletme Düzeninin Kolaylaştırılması: ${cap.value} baş hayvanın günlük yemleme ve bakımının tek aks üzerinden yönetilmesi.`,
          `Traktörle Hızlı Yemleme: 4.20m genişliğindeki merkezi koridor ile yem dağıtımında iş gücünden %50 tasarruf.`,
          `Doğal Havalandırma & Verim Artışı: Mahya baca etkisiyle amonyak birikimini önleyen temiz hava sirkülasyonu.`,
          `Sıfır Donma Riski: Termostatik sirkülasyonlu döküm suluk altyapısı ile kışın su kesintisi yaşanmaz.`,
          `Modüler Ölçeklenebilirlik: İleride sürünüz büyüdüğünde ekleme yapılabilecek esnek mimari aks planı.`,
          `Anahtar Teslim Tek Yüklenici: Zemin betonundan çatıya kadar tüm sürecin sözleşmeli tek firma güvencesiyle tamamlanması.`,
        ];

        catalog.push({
          id: primarySlug,
          slug: primarySlug,
          slugAliases: aliases,
          title: title,
          category: category,
          categoryLabel: model.name,
          capacity: `${cap.value} Baş`,
          capacityValue: cap.value,
          modelType: model.code,
          modelName: model.name,
          buildingSystem: system,
          length: dim.length,
          width: dim.width,
          totalArea: dim.totalArea,
          livestockType: model.shortName,
          dimensions: {
            length: dim.length,
            width: dim.width,
            height: 4.5,
            totalArea: dim.totalArea,
          },
          system: `${system} Taşıyıcı Sistemli ${model.name}`,
          shortDescription: `${cap.value} baş kapasiteli, ${dim.length}m × ${dim.width}m (${dim.totalArea} m²) taban alanına sahip ${system.toLowerCase()} yapı sistemli modern ${model.shortName.toLowerCase()} projesi.`,
          fullDescription: `Gökçe İnşaat ve Yapı tarafından Türkiye genelindeki iklim ve arazi koşullarına göre projelendirilen ${cap.value} Başlık ${model.name}; ${dim.length}m × ${dim.width}m (${dim.totalArea} m²) net taban alanı üzerinde ${system.toLowerCase()} yapı sistemiyle inşa edilir. Tesis; merkezi traktör yemleme hattı, doğal baca havalandırması, otomatik donmaz suluk altyapısı ve fırçalı kaymaz zemin betonu ile eksiksiz teslim edilir.`,
          
          projectAbout: `${cap.value} Başlık ${model.name} projesi; modern hayvancılık işletmelerinde iş gücü maliyetini azaltmak, günlük hayvan bakımını kolaylaştırmak ve hayvan konforunu maksimize ederek et/süt verimini yükseltmek amacıyla tasarlanmıştır. ${dim.length}m × ${dim.width}m net ölçüleriyle hem arazi kullanımını optimize eder hem de traktörle hızlı yem dağıtımı ve gübre temizliği yapılmasına olanak tanır.`,
          systemDescription: model.systemSummary,
          animalWelfare: STANDARD_ANIMAL_WELFARE_ITEMS,
          constructionStages: STANDARD_CONSTRUCTION_STAGES,
          systemOptions: systemOptions,
          
          mainImage: FARM_IMAGES[model.code].main,
          gallery: FARM_IMAGES[model.code].gallery,
          features: [
            `${dim.length}m × ${dim.width}m net mimari plan (${dim.totalArea} m² taban alanı)`,
            `4.00 - 4.20 metre genişliğinde kesintisiz merkezi traktör yemleme yolu`,
            `Doğal baca etkili mahya havalandırma sistemi ile temiz hava sirkülasyonu`,
            `Donmaya karşı termal korumalı otomatik döküm sirkülasyonlu suluk hattı`,
            `Sıcak daldırma galvanizli, korozyona dayanıklı yem kilit ve padok demirleri`,
            `Sıyırıcıya ve traktör kürümesine uygun özel eğimli fırçalı saha betonu`,
            `İzoleli sandviç panel / antikondenzasyon çelik çatı kaplaması`,
            `Düşük tüketimli yüksek aydınlatma verimli endüstriyel LED aydınlatma`,
          ],
          advantages: advantages,
          specifications: [
            { label: "Kapasite", value: `${cap.value} Baş Büyükbaş` },
            { label: "Yapı Ölçüleri", value: `${dim.length}m × ${dim.width}m` },
            { label: "Toplam Kapalı Alan", value: `${dim.totalArea} m²` },
            { label: "Taşıyıcı Yapı Sistemi", value: `${system} Karkas` },
            { label: "Model Tipi", value: model.name },
            { label: "İşletme Tipi", value: model.shortName },
            { label: "Yemleme Sistemi", value: "4.20m Çift Yönlü Traktör Yolu" },
            { label: "Sulama Altyapısı", value: "Sirkülasyonlu Donmaz Döküm Suluk" },
            { label: "Gübre Yönetimi", value: "Traktör Kürüme / Sıyırıcı Kanalı" },
            { label: "Havalandırma", value: "Doğal Mahya Baca Sirkülasyonu" },
            { label: "Çatı Sistemi", value: "İzoleli Panel / Antikondenzasyon Sac" },
            { label: "Zemin Betonu", value: "C25/30 Hasır Çelikli Kaymaz Fırçalı" },
          ],
          turnkeyIncluded: [
            "Mimari ve statik projelendirme",
            "Zemin hafriyatı ve temel betonu",
            "Taşıyıcı karkas imalatı ve montajı",
            "Çatı ve cephe kaplaması",
            "Galvanizli yemlik ve kilit sistemleri",
            "Donmaz suluk tesisatı",
            "Elektrik ve LED aydınlatma hatları",
          ],
          estimatedDurationWeeks: cap.value <= 50 ? 5 : (cap.value <= 100 ? 7 : 9),
          estimatedCost: estimatedCost,
          priceNote: DEFAULT_PRICE_NOTE,
          location: "Türkiye Geneli",
          status: "Hazır Model",
          featured: isMainFeatured,
        });
      });
    });
  });

  return catalog;
}

// Müstakil Konut ve Endüstriyel Yapılar
const NON_FARM_PROJECTS: Project[] = [
  {
    id: "110-m2-anahtar-teslim-ev",
    slug: "110-m2-anahtar-teslim-ev",
    slugAliases: ["110-m2-ev", "110m2-mustakil-ev", "2-1-anahtar-teslim-ev"],
    title: "110 m² 2+1 Modern Müstakil Ev",
    category: "ev",
    categoryLabel: "Anahtar Teslim Konut",
    capacity: "2+1 Plan",
    buildingSystem: "Çelik",
    length: 11,
    width: 10,
    totalArea: 110,
    dimensions: {
      length: 11,
      width: 10,
      totalArea: 110,
    },
    system: "Ağır Çelik Karkas + Taş Yünü Mantolama",
    shortDescription: "110 m² net kullanım alanına sahip, 2 yatak odası, geniş salon-mutfak ve verandalı modern müstakil konut.",
    fullDescription: "Gökçe İnşaat ve Yapı müstakil konut serisinin en çok tercih edilen 110 m² 2+1 modeli; A sınıfı taş yünü ısı yalıtımı, 3 camlı PVC doğramaları, ahşap görünümlü verandası ve modern hazır mutfak donanımlarıyla eksiksiz anahtar teslim inşa edilir.",
    projectAbout: "Bu proje; kırsal veya müstakil arsasında konforlu, yüksek ısı yalıtımlı ve depreme dayanıklı bir yaşam alanı kurmak isteyen aileler için tasarlanmıştır. Zemin betonundan mutfak dolaplarına kadar tek elden teslim edilir.",
    systemDescription: "Hafif ve ağır çelik karkas kombinasyonu üzerine dış cephede 10cm taş yünü mantolama ve dekoratif taş/ahşap kaplama uygulanır. İç mekanda alçıpan üzeri silinebilir boya ve 1. sınıf laminat parke yer alır.",
    animalWelfare: [],
    constructionStages: STANDARD_CONSTRUCTION_STAGES,
    mainImage: "/images/house-110m2.jpg",
    gallery: [
      "/images/house-110m2.jpg",
      "/images/house-160m2.jpg",
      "/images/architectural-blueprint.jpg",
    ],
    features: [
      "110 m² brüt, 95 m² net kullanım alanı",
      "Geniş 20 m² kapalı taş/ahşap veranda",
      "10 cm A sınıfı taş yünü dış cephe mantolaması",
      "3 camlı ses ve ısı yalıtımlı PVC pencereler",
      "Hazır mutfak dolapları ve granit tezgah",
      "Eksiksiz banyo vitrifiyeleri ve seramik kaplamalar",
    ],
    advantages: [
      "Kışın Sıcak, Yazın Serin: Eksi derecelerde bile minimum yakıt tüketimi.",
      "Depreme Üstün Mukavemet: Esnek ve kırılmaz çelik karkas mimarisi.",
      "Hızlı Teslimat: 6-8 hafta içinde taşınmaya hazır.",
    ],
    specifications: [
      { label: "Oda Sayısı", value: "2+1" },
      { label: "Toplam Alan", value: "110 m²" },
      { label: "Veranda Alanı", value: "20 m²" },
      { label: "Taşıyıcı Sistem", value: "Ağır / Hafif Çelik Karkas" },
      { label: "Yalıtım", value: "10 cm Taş Yünü A1 Yanmaz" },
      { label: "Pencereler", value: "3 Camlı Isıcam Konfor PVC" },
    ],
    turnkeyIncluded: [
      "Temel betonu, kaba inşaat, çatı, mantolama, elektrik, su, boya, parke, mutfak ve banyo",
    ],
    estimatedDurationWeeks: 7,
    estimatedCost: calculateEstimatedCost(110, "Çelik").totalCostFormatted,
    priceNote: DEFAULT_PRICE_NOTE,
    location: "Türkiye Geneli",
    status: "Hazır Model",
    featured: true,
  },
  {
    id: "160-m2-anahtar-teslim-villa",
    slug: "160-m2-anahtar-teslim-villa",
    slugAliases: ["160-m2-villa", "160m2-mustakil-ev", "3-1-anahtar-teslim-ev"],
    title: "160 m² 3+1 Lüks Çiftlik Evi & Villa",
    category: "ev",
    categoryLabel: "Anahtar Teslim Konut",
    capacity: "3+1 Plan",
    buildingSystem: "Çelik",
    length: 16,
    width: 10,
    totalArea: 160,
    dimensions: {
      length: 16,
      width: 10,
      totalArea: 160,
    },
    system: "Ağır Çelik Karkas + Taş Kaplama",
    shortDescription: "160 m² geniş yaşam alanlı, 3 yatak odası, ebeveyn banyosu ve şömineli geniş salonlu lüks çiftlik konutu.",
    fullDescription: "Geniş aileler ve çiftlik yerleşkeleri için özel olarak projelendirilen 160 m² 3+1 müstakil konut; yüksek tavanlı salonu, doğal taş kaplamalı cephesi ve geniş teras alanlarıyla estetik ve konforu bir arada sunar.",
    projectAbout: "Çiftlik işletmesinin yanında veya müstakil arazide prestijli ve uzun ömürlü bir konut arayan yatırımcılar için anahtar teslim inşa edilir.",
    systemDescription: "Galvanizli çelik karkas, yüksek yoğunluklu taş yünü yalıtım ve dekoratif doğal taş dış kaplama.",
    animalWelfare: [],
    constructionStages: STANDARD_CONSTRUCTION_STAGES,
    mainImage: "/images/house-160m2.jpg",
    gallery: [
      "/images/house-160m2.jpg",
      "/images/house-110m2.jpg",
      "/images/architectural-blueprint.jpg",
    ],
    features: [
      "160 m² brüt, 140 m² net kullanım alanı",
      "3 Yatak Odası + Ebeveyn Banyosu + Giyinme Odası",
      "Doğal taş kaplama dış cephe ve şömine altyapısı",
      "Geniş 35 m² L tipi gölgelikli veranda",
      "Yerden ısıtma uyumlu zemin altyapısı",
    ],
    advantages: [
      "Üst Düzey Konfor: Geniş oda ölçüleri ve ebeveyn süiti.",
      "Yüksek Enerji Tasarrufu: Çift katmanlı termal bariyer.",
    ],
    specifications: [
      { label: "Oda Sayısı", value: "3+1 (Ebeveyn Banyolu)" },
      { label: "Toplam Alan", value: "160 m²" },
      { label: "Veranda Alanı", value: "35 m²" },
      { label: "Taşıyıcı Sistem", value: "Ağır Çelik Karkas" },
    ],
    turnkeyIncluded: [
      "Temel, kaba yapı, çatı, taş cephe, elektrik, sıhhi tesisat, mutfak ve banyo",
    ],
    estimatedDurationWeeks: 9,
    estimatedCost: calculateEstimatedCost(160, "Çelik").totalCostFormatted,
    priceNote: DEFAULT_PRICE_NOTE,
    location: "Türkiye Geneli",
    status: "Hazır Model",
    featured: true,
  },
  {
    id: "750-m2-celik-konstruksiyon-ahir",
    slug: "750-m2-celik-konstruksiyon-ahir",
    slugAliases: ["750-m2-celik-ahir", "750-m2-hangar", "celik-konstruksiyon-yapi"],
    title: "750 m² Geniş Açıklıklı Çelik Ahır & Hangar",
    category: "celik-yapi",
    categoryLabel: "Çelik Yapılar",
    capacity: "Endüstriyel Ölçek",
    buildingSystem: "Çelik",
    length: 50,
    width: 15,
    totalArea: 750,
    dimensions: {
      length: 50,
      width: 15,
      totalArea: 750,
    },
    system: "Kolonsuz Geniş Açıklıklı Ağır Çelik Makas",
    shortDescription: "15 metre kolonsuz net iç açıklık sunan, ağır kar yüküne mukavemetli endüstriyel çiftlik ve depolama yapısı.",
    fullDescription: "Gökçe İnşaat ve Yapı ağır çelik mühendisliği ile üretilen 750 m² çelik yapı; ortada kolon engeli bulunmadığı için iş makinelerinin ve yem karma vagonlarının serbestçe manevra yapmasını sağlar.",
    projectAbout: "Büyük ölçekli hayvancılık tesisleri, saman/balya hangarları ve tarımsal lojistik merkezleri için anahtar teslim inşa edilir.",
    systemDescription: "Korozyona karşı epoksi astarlı çelik profiller, civatalı saha birleşimi ve sandviç panel çatı kaplaması.",
    animalWelfare: STANDARD_ANIMAL_WELFARE_ITEMS,
    constructionStages: STANDARD_CONSTRUCTION_STAGES,
    mainImage: "/images/steel-structure.jpg",
    gallery: [
      "/images/steel-structure.jpg",
      "/images/agricultural-storage.jpg",
      "/images/architectural-blueprint.jpg",
    ],
    features: [
      "15 metre kolonsuz net iç açıklık",
      "Yoğun kar ve fırtına yüküne tam dayanıklı statik hesap",
      "5 metre net saçak yüksekliği",
      "Epoksi astar ve fırın boyalı çelik karkas",
    ],
    advantages: [
      "Maksimum İç Hacim: İş makineleri için sınırsız manevra alanı.",
      "Hızlı Montaj: Fabrikasyon çelik elemanlar sayesinde 4-5 haftada kurulum.",
    ],
    specifications: [
      { label: "Ölçüler", value: "50m × 15m" },
      { label: "Toplam Alan", value: "750 m²" },
      { label: "Kolonsuz Açıklık", value: "15 Metre" },
      { label: "Saçak Yüksekliği", value: "5.00 Metre" },
    ],
    turnkeyIncluded: [
      "Statik proje, ankrajlı temel, çelik karkas imalatı ve montajı, çatı kaplaması",
    ],
    estimatedDurationWeeks: 6,
    estimatedCost: calculateEstimatedCost(750, "Çelik").totalCostFormatted,
    priceNote: DEFAULT_PRICE_NOTE,
    location: "Türkiye Geneli",
    status: "Hazır Model",
    featured: true,
  },
  {
    id: "500-m2-tarimsal-depo-hangar",
    slug: "500-m2-tarimsal-depo-hangar",
    slugAliases: ["500-m2-depo", "500-m2-tarimsal-hangar", "tarimsal-depo"],
    title: "500 m² Tarımsal Yem ve Ekipman Deposu",
    category: "tarimsal-yapi",
    categoryLabel: "Tarımsal Yapılar",
    capacity: "Yem & Makine Deposu",
    buildingSystem: "Çelik",
    length: 35,
    width: 14.3,
    totalArea: 500,
    dimensions: {
      length: 35,
      width: 14.3,
      totalArea: 500,
    },
    system: "Endüstriyel Çelik Depo Yapısı",
    shortDescription: "Tarımsal ürün, saman balyası ve traktör ekipmanları için rutubetsiz ve güvenli depolama hangarı.",
    fullDescription: "Tarımsal işletmelerin yem ve ekipman güvenliğini sağlamak için özel olarak geliştirilmiş depolama yapısıdır. Yüksek kapı açıklıkları sayesinde en büyük traktör ve biçerdöverler rahatça giriş-çıkış yapabilir.",
    projectAbout: "Yem, balya ve tarım makinelerini yağmur, don ve kemirgenlerden korumak için tasarlanmış yüksek tavanlı depo çözümü.",
    systemDescription: "Geniş sürme kapılı, doğal havalandırma menfezli çelik karkas yapı.",
    animalWelfare: [],
    constructionStages: STANDARD_CONSTRUCTION_STAGES,
    mainImage: "/images/agricultural-storage.jpg",
    gallery: [
      "/images/agricultural-storage.jpg",
      "/images/steel-structure.jpg",
      "/images/architectural-blueprint.jpg",
    ],
    features: [
      "5.5 metre saçak yüksekliği ile yüksek balya istifleme kapasitesi",
      "5m × 4.5m geniş endüstriyel seksiyonel/sürgülü kapı",
      "Rutubet önleyici doğal hava menfezleri",
      "Ağır tonajlı araç girişine uygun helikopter perdahlı zemin betonu",
    ],
    advantages: [
      "Ürün Kaybını Önler: Yem ve samanlarınızı nem, yağmur ve kemirgenlerden korur.",
      "Kolay Lojistik: İş makineleri için ferah manevra alanı.",
    ],
    specifications: [
      { label: "Alan", value: "500 m²" },
      { label: "Yükseklik", value: "5.50 m" },
      { label: "Zemin", value: "C30 Donatılı Helikopterli Saha Betonu" },
    ],
    turnkeyIncluded: [
      "Temel, çelik montajı, çatı ve cephe kaplaması, kapılar",
    ],
    estimatedDurationWeeks: 4,
    estimatedCost: calculateEstimatedCost(500, "Çelik").totalCostFormatted,
    priceNote: DEFAULT_PRICE_NOTE,
    location: "Türkiye Geneli",
    status: "Hazır Model",
    featured: false,
  },
];

// 5 Ana Model İçin Kanonik Proje Verileri (SEO Uyumlu ve Fiyatsız)
function generateCoreModelProjects(): Project[] {
  return FIVE_CORE_MODELS.map((model) => {
    let category: Project["category"] = "besi-ciftligi";
    if (model.code === "A") category = "bagli-sistem";
    if (model.code === "B") category = "karma-ciftlik";
    if (model.code === "C") category = "besi-ciftligi";
    if (model.code === "D") category = "sut-ciftligi";
    if (model.code === "E") category = "acik-besi";

    const systemOptions: BuildingSystemOptionInfo[] = [
      {
        system: "Çelik",
        slug: `${model.slug}-celik`,
        title: `${model.name} — Ağır Çelik Taşıyıcı Karkas`,
        description: "Geniş açıklıklı, ortada kolon engeli bulunmayan, yoğun kar ve rüzgar yüküne en dayanıklı endüstriyel çelik konstrüksiyon taşıyıcı sistem.",
        advantages: ["Kolonsuz ferah iç manevra alanı", "Hızlı civatalı saha montajı", "Depreme ve fırtınaya karşı yüksek mukavemet"],
        estimatedDurationWeeks: 6,
        estimatedCost: "Fiyat Hesaplama Bölümünde Belirlenir",
      },
      {
        system: "Prefabrik",
        slug: `${model.slug}-prefabrik`,
        title: `${model.name} — Prefabrik Betonarme Kolonlu`,
        description: "Fabrikasyon ön üretimli betonarme kolon ve makas elemanları ile uzun ömürlü ve yangına yüksek mukavemetli modüler yapı çözümü.",
        advantages: ["Korozyona ve yangına karşı üstün dayanım", "Standart modüler parça kalitesi", "Minimum periyodik bakım maliyeti"],
        estimatedDurationWeeks: 7,
        estimatedCost: "Fiyat Hesaplama Bölümünde Belirlenir",
      },
      {
        system: "Betonarme",
        slug: `${model.slug}-betonarme`,
        title: `${model.name} — Konvansiyonel Betonarme Karkas`,
        description: "Klasik yerinde dökme betonarme taşıyıcı sistem; yüksek kütlesel dayanıklılık ve termal kütle avantajı sunar.",
        advantages: ["Maksimum rijitlik ve rüzgar direnci", "Bölgesel malzeme uyumluluğu", "Ağır kış şartlarına tam mukavemet"],
        estimatedDurationWeeks: 8,
        estimatedCost: "Fiyat Hesaplama Bölümünde Belirlenir",
      },
    ];

    return {
      id: `core-model-${model.code.toLowerCase()}`,
      slug: model.slug,
      slugAliases: [
        `model-${model.code.toLowerCase()}`,
        `model-${model.code.toLowerCase()}-${model.slug}`,
        `${model.code.toLowerCase()}-modeli`,
        `${model.code.toLowerCase()}-bagli-sistem`,
        `${model.code.toLowerCase()}-karma-sistem`,
        `${model.code.toLowerCase()}-besi-modeli`,
        `${model.code.toLowerCase()}-sut-modeli`,
        `${model.code.toLowerCase()}-acik-besi`,
      ],
      title: `${model.name} Çiftlik Projesi`,
      category,
      categoryLabel: model.name,
      capacity: "25 — 250 Baş",
      capacityValue: 50,
      modelType: model.code,
      modelName: model.name,
      buildingSystem: "Çelik",
      length: 25,
      width: model.width,
      totalArea: 25 * model.width,
      dimensions: {
        length: 25,
        width: model.width,
        totalArea: 25 * model.width,
      },
      system: "Ağır Çelik / Prefabrik / Betonarme",
      shortDescription: model.shortDescription,
      fullDescription: `${model.name}; Gökçe İnşaat ve Yapı tarafından geliştirilen, ${model.shortDescription} Tesis; statik mukavemetli ana taşıyıcı karkas, doğal mahya havalandırması, sirkülasyonlu donmaz suluk altyapısı ve uzun ömürlü padok yerleşimiyle anahtar teslim inşa edilir.`,
      projectAbout: model.systemSummary,
      systemDescription: `${model.name} için Ağır Çelik, Prefabrik ve Betonarme taşıyıcı sistem seçenekleri sunulmaktadır. Çelik taşıyıcı sistem geniş açıklıklı kolonsuz iç hacim sağlarken, prefabrik ve betonarme çözümler yangın ve korozyon dayanımıyla öne çıkar.`,
      animalWelfare: STANDARD_ANIMAL_WELFARE_ITEMS,
      constructionStages: STANDARD_CONSTRUCTION_STAGES,
      systemOptions,
      mainImage: model.mainImage,
      gallery: model.gallery,
      features: [
        `${model.widthText} genişliğinde standart mimari aks planı`,
        "25 Baş ile 250 Baş arası esnek ölçeklenebilirlik",
        "Merkezi yem yolu ve geniş traktör manevra koridoru",
        "Sıcak daldırma galvanizli padok ve durak demirleri",
        "Termostatik donmaz döküm otomatik suluk hatları",
        "Doğal baca etkili mahya havalandırma açıklığı",
      ],
      advantages: [
        "Hayvan refahına tam uyumlu hava akışı ve doğal gün ışığı",
        "İş gücünden %50 tasarruf sağlayan yemleme ve bakım aksı",
        "Modüler mimari sayesinde sürü genişlemesine tam uygunluk",
        "Anahtar teslim tek yüklenici ve sözleşmeli teslim güvencesi",
      ],
      specifications: [
        { label: "Model Tipi", value: model.name },
        { label: "Standart Genişlik", value: model.widthText },
        { label: "Kapasite Aralığı", value: "25 — 250 Baş" },
        { label: "Taşıyıcı Sistemler", value: "Ağır Çelik / Prefabrik / Betonarme" },
        { label: "Havalandırma", value: "Mahya Baca Etkili Doğal Havalandırma" },
        { label: "Zemin Tipi", value: "Helikopter Perdahlı Kaymaz Fırçalı Beton" },
        { label: "Teslim Kapsamı", value: "Hafriyattan Montaja Anahtar Teslim" },
      ],
      turnkeyIncluded: TURNKEY_PRICE_INCLUSIONS,
      featured: true,
      status: "Anahtar Teslim Standart Model",
      location: "Türkiye Geneli (81 İl)",
    };
  });
}

// Complete combined dataset
export const projectsData: Project[] = [
  ...generateCoreModelProjects(),
  ...generateFarmCatalog(),
  ...NON_FARM_PROJECTS
];

/**
 * Normalizes strings by converting Turkish characters to ASCII and stripping punctuation
 */
function normalizeSlug(str: string): string {
  if (!str) return "";
  try {
    str = decodeURIComponent(str);
  } catch (e) {
    // decode failed, proceed with raw
  }
  return str
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Robust Project Finder with Zero-404 Guarantee:
 * 1. Exact slug match
 * 2. Slug aliases match
 * 3. Normalized ASCII slug match
 * 4. Regex parameter extractor (Capacity + Model Code + System)
 */
export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined;

  // 1. Exact match
  const exact = projectsData.find((p) => p.slug === slug);
  if (exact) return exact;

  const normalizedTarget = normalizeSlug(slug);

  // 2. Normalized slug match or alias match
  for (const project of projectsData) {
    if (normalizeSlug(project.slug) === normalizedTarget) {
      return project;
    }
    if (project.slugAliases) {
      for (const alias of project.slugAliases) {
        if (normalizeSlug(alias) === normalizedTarget) {
          return project;
        }
      }
    }
  }

  // 3. Fallback: Parse capacity and model type from URL pattern
  // Matches e.g. "25-bas-a-bagli-sistem", "50-bas-c-besi", "100-bas-d", "200-baslik-c"
  const capMatch = normalizedTarget.match(/(\d{2,3})/);
  const modelMatch = normalizedTarget.match(/(?:model-|-modeli|-bas-|-baslik-)([abcde])/);

  if (capMatch && modelMatch) {
    const capVal = parseInt(capMatch[1], 10);
    const modelCode = modelMatch[1].toUpperCase() as ModelTypeCode;
    
    // Check if system is specified (celik, prefabrik, betonarme)
    let sys: BuildingSystemType = "Çelik";
    if (normalizedTarget.includes("prefabrik")) sys = "Prefabrik";
    if (normalizedTarget.includes("betonarme")) sys = "Betonarme";

    const matched = projectsData.find((p) => p.capacityValue === capVal && p.modelType === modelCode && p.buildingSystem === sys);
    if (matched) return matched;

    // Any system match for that capacity and model
    const anySystemMatch = projectsData.find((p) => p.capacityValue === capVal && p.modelType === modelCode);
    if (anySystemMatch) return anySystemMatch;
  }

  return undefined;
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter((p) => p.featured);
}
