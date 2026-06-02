export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  sortOrder: number;
  active: boolean;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  active: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  brandId: string;
  price: number;
  description: string;
  specifications: Record<string, string>;
  mainImage: string;
  gallery: string[];
  availability: "In stock" | "Limited" | "On request";
  type: string;
  featured: boolean;
  promotion?: string;
  createdAt: string;
  active: boolean;
};

const categoryTranslations: Record<string, Partial<Record<Locale, Pick<Category, "name" | "description">>>> = {
  weapons: {
    lv: { name: "Ieroči", description: "Karabīnes, bises, pistoles un pneimatiskie ieroči licencētiem īpašniekiem." },
    ru: { name: "Оружие", description: "Винтовки, ружья, пистолеты и пневматика для лицензированных владельцев." },
  },
  ammunition: {
    lv: { name: "Munīcija", description: "Uzticama munīcija karabīnēm, bisēm un pistolēm no pārbaudītiem ražotājiem." },
    ru: { name: "Боеприпасы", description: "Надежные патроны для винтовок, ружей и пистолетов от проверенных производителей." },
  },
  optics: {
    lv: { name: "Optika", description: "Tēmēkļi, termālā optika, nakts redzamība, binokļi un tālmēri." },
    ru: { name: "Оптика", description: "Прицелы, тепловизоры, ночное видение, бинокли и дальномеры." },
  },
  "hunting-equipment": {
    lv: { name: "Medību aprīkojums", description: "Naži, somas, mugursomas, tīrīšanas komplekti un medību aksesuāri." },
    ru: { name: "Охотничье снаряжение", description: "Ножи, сумки, рюкзаки, наборы для чистки и аксессуары для охоты." },
  },
  clothing: {
    lv: { name: "Apģērbs", description: "Laikapstākļiem piemērotas jakas, bikses, zābaki, cimdi un cepures." },
    ru: { name: "Одежда", description: "Куртки, брюки, ботинки, перчатки и шапки для сложной погоды." },
  },
  rifles: { lv: { name: "Karabīnes", description: "Precīzas karabīnes medībām un sporta šaušanai." }, ru: { name: "Винтовки", description: "Точные винтовки для охоты и спортивной стрельбы." } },
  shotguns: { lv: { name: "Bises", description: "Bises medībām un šaušanas sportam." }, ru: { name: "Ружья", description: "Ружья для охоты и стрелкового спорта." } },
  handguns: { lv: { name: "Pistoles", description: "Pistoles licencētiem īpašniekiem." }, ru: { name: "Пистолеты", description: "Пистолеты для лицензированных владельцев." } },
  "air-rifles": { lv: { name: "Pneimatiskās karabīnes", description: "Pneimatiskie ieroči treniņiem un precizitātei." }, ru: { name: "Пневматические винтовки", description: "Пневматика для тренировок и точной стрельбы." } },
  "rifle-ammunition": { lv: { name: "Karabīņu munīcija", description: "Munīcija medību un sporta karabīnēm." }, ru: { name: "Патроны для винтовок", description: "Патроны для охотничьих и спортивных винтовок." } },
  "shotgun-ammunition": { lv: { name: "Bises munīcija", description: "Munīcija bisēm dažādiem medību scenārijiem." }, ru: { name: "Патроны для ружей", description: "Патроны для разных охотничьих задач." } },
  scopes: { lv: { name: "Tēmēkļi", description: "Optiskie tēmēkļi precīzai šaušanai." }, ru: { name: "Прицелы", description: "Оптические прицелы для точной стрельбы." } },
  "thermal-optics": { lv: { name: "Termālā optika", description: "Termālās ierīces novērošanai sarežģītos apstākļos." }, ru: { name: "Тепловизоры", description: "Тепловизионные приборы для наблюдения в сложных условиях." } },
  rangefinders: { lv: { name: "Tālmēri", description: "Precīzi tālmēri distances noteikšanai." }, ru: { name: "Дальномеры", description: "Точные дальномеры для определения дистанции." } },
  knives: { lv: { name: "Naži", description: "Izturīgi naži medībām un lauka darbiem." }, ru: { name: "Ножи", description: "Надежные ножи для охоты и полевых задач." } },
  backpacks: { lv: { name: "Mugursomas", description: "Klusas un ērtas mugursomas medību braucieniem." }, ru: { name: "Рюкзаки", description: "Тихие и удобные рюкзаки для охоты." } },
  "cleaning-kits": { lv: { name: "Tīrīšanas komplekti", description: "Komplekti ieroču kopšanai un uzturēšanai." }, ru: { name: "Наборы для чистки", description: "Комплекты для ухода и обслуживания оружия." } },
  jackets: { lv: { name: "Jakas", description: "Klusas un izturīgas jakas medībām." }, ru: { name: "Куртки", description: "Тихие и прочные куртки для охоты." } },
  boots: { lv: { name: "Zābaki", description: "Stabili zābaki slapjiem un aukstiem apstākļiem." }, ru: { name: "Ботинки", description: "Устойчивые ботинки для влажной и холодной погоды." } },
  gloves: { lv: { name: "Cimdi", description: "Silti un funkcionāli cimdi medībām." }, ru: { name: "Перчатки", description: "Теплые и практичные перчатки для охоты." } },
};

const productTranslations: Record<string, Partial<Record<Locale, Pick<Product, "name" | "description" | "type" | "promotion">>>> = {
  "sako-s20-hunter-rifle": {
    lv: { name: "Sako S20 Hunter karabīne", description: "Modulāra aizslēga karabīne ar sabalansētu laidi, precīzu mēlīti un uzticamu darbību aukstumā.", type: "Karabīne" },
    ru: { name: "Винтовка Sako S20 Hunter", description: "Модульная охотничья винтовка с балансированной ложей, четким спуском и надежной работой в холодную погоду.", type: "Винтовка" },
  },
  "zeiss-conquest-v4-scope": {
    lv: { name: "Zeiss Conquest V4 tēmēklis", description: "Gaišs un kompakts tēmēklis medībām vājā apgaismojumā ar precīzu regulāciju un izturīgu korpusu.", type: "Tēmēklis", promotion: "Pieejama demo vienība" },
    ru: { name: "Прицел Zeiss Conquest V4", description: "Светлый компактный прицел для охоты при слабом освещении с точной регулировкой и прочным корпусом.", type: "Прицел", promotion: "Доступен демо-образец" },
  },
  "harkila-pro-hunter-jacket": {
    lv: { name: "Harkila Pro Hunter jaka", description: "Klusa, ūdensizturīga un elpojoša jaka ar pastiprinātiem paneļiem un praktiskām kabatām aktīvām medībām.", type: "Jaka" },
    ru: { name: "Куртка Harkila Pro Hunter", description: "Тихая водонепроницаемая дышащая куртка с усиленными зонами и практичными карманами для активной охоты.", type: "Куртка" },
  },
  "benchmade-saddle-mountain-knife": {
    lv: { name: "Benchmade Saddle Mountain nazis", description: "Fiksēta asmens nazis ar ērtu satvērienu, izturīgu tēraudu un praktisku maksti medību braucieniem.", type: "Nazis", promotion: "Jaunums" },
    ru: { name: "Нож Benchmade Saddle Mountain", description: "Полевой нож с фиксированным клинком, уверенным хватом, прочной сталью и практичными ножнами.", type: "Нож", promotion: "Новинка" },
  },
  "fieldline-expedition-backpack": {
    lv: { name: "Fieldline Expedition mugursoma", description: "45 litru medību mugursoma ar klusu audumu, ieroča stiprinājumu un laikapstākļiem izturīgiem nodalījumiem.", type: "Mugursoma" },
    ru: { name: "Рюкзак Fieldline Expedition", description: "Охотничий рюкзак 45 л с тихой тканью, креплением для оружия и влагостойкими отделениями.", type: "Рюкзак" },
  },
  "thermal-scout-35-monocular": {
    lv: { name: "Thermal Scout 35 monoklis", description: "Kompakts termālais monoklis nakts novērošanai ar vienkāršu vadību un skaidru attēla apstrādi.", type: "Termālā optika", promotion: "Iepriekšpasūtījums" },
    ru: { name: "Тепловизионный монокуляр Thermal Scout 35", description: "Компактный тепловизионный монокуляр для ночного наблюдения с простым управлением и четкой обработкой изображения.", type: "Тепловизор", promotion: "Предзаказ" },
  },
};

const brandTranslations: Record<string, Partial<Record<Locale, Pick<Brand, "description">>>> = {
  sako: {
    lv: { description: "Somu precizitātes karabīnes un praksē pārbaudītas detaļas." },
    ru: { description: "Финские точные винтовки и проверенные в поле компоненты." },
  },
  zeiss: {
    lv: { description: "Premium optika ar izcilu skaidrību un veiktspēju vājā apgaismojumā." },
    ru: { description: "Премиальная оптика с отличной четкостью и работой при слабом освещении." },
  },
  harkila: {
    lv: { description: "Tehnisks medību apģērbs skarbiem laikapstākļiem un garām dienām dabā." },
    ru: { description: "Техническая охотничья одежда для суровой погоды и долгих дней на природе." },
  },
  benchmade: {
    lv: { description: "Izturīgi naži precīziem lauka darbiem." },
    ru: { description: "Прочные ножи для точной полевой работы." },
  },
};

export const revalidate = 300;

export const categories: Category[] = [
  {
    id: "weapons",
    name: "Weapons",
    slug: "weapons",
    description: "Rifles, shotguns, handguns, and air rifles for licensed owners.",
    image:
      "https://images.unsplash.com/photo-1517846693594-1567da72af75?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 1,
    active: true,
  },
  {
    id: "ammunition",
    name: "Ammunition",
    slug: "ammunition",
    description: "Reliable rifle, shotgun, and handgun ammunition by trusted makers.",
    image:
      "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 2,
    active: true,
  },
  {
    id: "optics",
    name: "Optics",
    slug: "optics",
    description: "Scopes, thermal optics, night vision, binoculars, and rangefinders.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 3,
    active: true,
  },
  {
    id: "hunting-equipment",
    name: "Hunting Equipment",
    slug: "hunting-equipment",
    description: "Field-ready knives, packs, cleaning kits, and hunting accessories.",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 4,
    active: true,
  },
  {
    id: "clothing",
    name: "Clothing",
    slug: "clothing",
    description: "Weatherproof jackets, trousers, boots, gloves, and hats.",
    image:
      "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 5,
    active: true,
  },
];

export const subcategories: Category[] = [
  ["rifles", "Rifles", "weapons"],
  ["shotguns", "Shotguns", "weapons"],
  ["handguns", "Handguns", "weapons"],
  ["air-rifles", "Air Rifles", "weapons"],
  ["rifle-ammunition", "Rifle Ammunition", "ammunition"],
  ["shotgun-ammunition", "Shotgun Ammunition", "ammunition"],
  ["scopes", "Scopes", "optics"],
  ["thermal-optics", "Thermal Optics", "optics"],
  ["rangefinders", "Rangefinders", "optics"],
  ["knives", "Knives", "hunting-equipment"],
  ["backpacks", "Backpacks", "hunting-equipment"],
  ["cleaning-kits", "Cleaning Kits", "hunting-equipment"],
  ["jackets", "Jackets", "clothing"],
  ["boots", "Boots", "clothing"],
  ["gloves", "Gloves", "clothing"],
].map(([id, name, parentId], index) => ({
  id,
  name,
  slug: id,
  description: `${name} selected for dependable performance in demanding outdoor conditions.`,
  image: categories.find((category) => category.id === parentId)?.image ?? categories[0].image,
  parentId,
  sortOrder: index + 1,
  active: true,
}));

export const brands: Brand[] = [
  {
    id: "sako",
    name: "Sako",
    slug: "sako",
    logo: "SAKO",
    description: "Finnish precision rifles and field-proven components.",
    active: true,
  },
  {
    id: "zeiss",
    name: "Zeiss",
    slug: "zeiss",
    logo: "ZEISS",
    description: "Premium optics with excellent clarity and low-light performance.",
    active: true,
  },
  {
    id: "harkila",
    name: "Harkila",
    slug: "harkila",
    logo: "HARKILA",
    description: "Technical hunting clothing for harsh weather and long days outdoors.",
    active: true,
  },
  {
    id: "benchmade",
    name: "Benchmade",
    slug: "benchmade",
    logo: "BENCHMADE",
    description: "Durable knives built for precise field work.",
    active: true,
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Sako S20 Hunter Rifle",
    slug: "sako-s20-hunter-rifle",
    sku: "SAK-S20-HUN",
    categoryId: "rifles",
    brandId: "sako",
    price: 1890,
    description:
      "A modular bolt-action hunting rifle with a balanced stock, crisp trigger, and reliable cold-weather performance.",
    specifications: {
      Caliber: ".308 Win",
      Barrel: "610 mm",
      Magazine: "5 rounds",
      Weight: "3.6 kg",
    },
    mainImage:
      "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517846693594-1567da72af75?auto=format&fit=crop&w=1200&q=80",
    ],
    availability: "On request",
    type: "Rifle",
    featured: true,
    createdAt: "2026-05-22",
    active: true,
  },
  {
    id: "p2",
    name: "Zeiss Conquest V4 Scope",
    slug: "zeiss-conquest-v4-scope",
    sku: "ZEI-V4-3-12",
    categoryId: "scopes",
    brandId: "zeiss",
    price: 1180,
    description:
      "Bright, compact riflescope for low-light hunting with precise turret tracking and rugged sealed construction.",
    specifications: {
      Magnification: "3-12x",
      Objective: "56 mm",
      Reticle: "Illuminated",
      Warranty: "10 years",
    },
    mainImage:
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
    availability: "In stock",
    type: "Scope",
    featured: true,
    promotion: "Demo unit available",
    createdAt: "2026-05-28",
    active: true,
  },
  {
    id: "p3",
    name: "Harkila Pro Hunter Jacket",
    slug: "harkila-pro-hunter-jacket",
    sku: "HAR-PRO-JKT",
    categoryId: "jackets",
    brandId: "harkila",
    price: 549,
    description:
      "Quiet, waterproof, breathable jacket with reinforced panels and practical pocket placement for active hunters.",
    specifications: {
      Membrane: "Waterproof",
      Fit: "Regular",
      Sizes: "S-3XL",
      Color: "Willow green",
    },
    mainImage:
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1200&q=80",
    ],
    availability: "Limited",
    type: "Jacket",
    featured: true,
    createdAt: "2026-05-30",
    active: true,
  },
  {
    id: "p4",
    name: "Benchmade Saddle Mountain Knife",
    slug: "benchmade-saddle-mountain-knife",
    sku: "BEN-SMK-15002",
    categoryId: "knives",
    brandId: "benchmade",
    price: 265,
    description:
      "Fixed-blade field knife with a controlled grip, strong steel, and practical sheath for hunting trips.",
    specifications: {
      Steel: "CPM-S30V",
      Blade: "10.7 cm",
      Handle: "Stabilized wood",
      Sheath: "Leather",
    },
    mainImage:
      "https://images.unsplash.com/photo-1607344645866-009c7d96d4f1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607344645866-009c7d96d4f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80",
    ],
    availability: "In stock",
    type: "Knife",
    featured: false,
    promotion: "New arrival",
    createdAt: "2026-06-01",
    active: true,
  },
  {
    id: "p5",
    name: "Fieldline Expedition Backpack",
    slug: "fieldline-expedition-backpack",
    sku: "FLD-EXP-45",
    categoryId: "backpacks",
    brandId: "harkila",
    price: 189,
    description:
      "45-liter hunting backpack with quiet fabric, rifle carry support, and weather-resistant compartments.",
    specifications: {
      Volume: "45 L",
      Material: "Brushed polyester",
      Raincover: "Included",
      Weight: "1.7 kg",
    },
    mainImage:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80",
    ],
    availability: "In stock",
    type: "Backpack",
    featured: false,
    createdAt: "2026-05-25",
    active: true,
  },
  {
    id: "p6",
    name: "Thermal Scout 35 Monocular",
    slug: "thermal-scout-35-monocular",
    sku: "THM-SCT-35",
    categoryId: "thermal-optics",
    brandId: "zeiss",
    price: 2190,
    description:
      "Compact thermal monocular for night observation with simple controls and clear image processing.",
    specifications: {
      Sensor: "384x288",
      Lens: "35 mm",
      Detection: "Up to 1300 m",
      Battery: "7 hours",
    },
    mainImage:
      "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?auto=format&fit=crop&w=1200&q=80",
    ],
    availability: "On request",
    type: "Thermal Optic",
    featured: true,
    promotion: "Pre-order",
    createdAt: "2026-05-31",
    active: true,
  },
];

export function getMainCategories() {
  return categories.filter((category) => category.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getSubcategories(parentId: string) {
  return subcategories
    .filter((category) => category.active && category.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategory(slug: string) {
  return [...categories, ...subcategories].find((category) => category.slug === slug && category.active);
}

export function getBrand(slug: string) {
  return brands.find((brand) => brand.slug === slug && brand.active);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug && product.active);
}

export function getBrandById(id: string) {
  return brands.find((brand) => brand.id === id);
}

export function getCategoryById(id: string) {
  return [...categories, ...subcategories].find((category) => category.id === id);
}

export function getProductsByCategory(categoryId: string) {
  const childIds = getSubcategories(categoryId).map((category) => category.id);
  return products.filter(
    (product) =>
      product.active && (product.categoryId === categoryId || childIds.includes(product.categoryId)),
  );
}

export function getProductsByBrand(brandId: string) {
  return products.filter((product) => product.active && product.brandId === brandId);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.active && product.featured);
}

export function getNewArrivals() {
  return [...products]
    .filter((product) => product.active)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 4);
}

export function searchCatalog(query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return { products: [], brands: [], categories: [] };
  }

  return {
    products: products.filter((product) =>
      [product.name, product.sku, product.description, product.type]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    ),
    brands: brands.filter((brand) =>
      [brand.name, brand.description].join(" ").toLowerCase().includes(normalized),
    ),
    categories: [...categories, ...subcategories].filter((category) =>
      [category.name, category.description].join(" ").toLowerCase().includes(normalized),
    ),
  };
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function localizeCategory(category: Category, locale: Locale): Category {
  return { ...category, ...categoryTranslations[category.id]?.[locale] };
}

export function localizeBrand(brand: Brand, locale: Locale): Brand {
  return { ...brand, ...brandTranslations[brand.id]?.[locale] };
}

export function localizeProduct(product: Product, locale: Locale): Product {
  return { ...product, ...productTranslations[product.slug]?.[locale] };
}

export function localizeAvailability(product: Product, locale: Locale) {
  const copy = t(locale).common;

  if (product.availability === "In stock") {
    return copy.inStock;
  }

  if (product.availability === "Limited") {
    return copy.limited;
  }

  return copy.onRequest;
}
import type { Locale } from "./i18n";
import { t } from "./i18n";
