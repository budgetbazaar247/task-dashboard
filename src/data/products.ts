export type ProductCategory =
  | "Chronograph"
  | "Dress"
  | "Dive"
  | "Smart"
  | "Minimalist";

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
}

// Replace the `images` paths below with your own files placed in /public/products.
// See /public/products/README.md for the exact naming convention.
export const products: Product[] = [
  {
    id: "1",
    slug: "aurelia-chronograph-steel",
    sku: "BB-CHR-001",
    name: "Aurelia Chronograph",
    brand: "BudgetBazaar Atelier",
    category: "Chronograph",
    price: 1249,
    compareAtPrice: 1599,
    description:
      "A refined stainless-steel chronograph with a sunburst dial, tachymeter bezel, and sapphire-coated crystal. Built for everyday precision with a statement presence.",
    specifications: {
      "Case Material": "316L Stainless Steel",
      "Case Diameter": "42mm",
      Movement: "Quartz Chronograph",
      "Water Resistance": "100m",
      Strap: "Steel bracelet with butterfly clasp",
      Crystal: "Sapphire-coated mineral glass",
    },
    images: ["/products/watch-1-a.svg", "/products/watch-1-b.svg"],
    rating: 4.7,
    reviewCount: 128,
    stock: 14,
    featured: true,
    bestSeller: true,
  },
  {
    id: "2",
    slug: "verona-dress-gold",
    sku: "BB-DRS-002",
    name: "Verona Dress Watch",
    brand: "BudgetBazaar Atelier",
    category: "Dress",
    price: 899,
    description:
      "An ultra-slim dress watch finished in warm gold-tone plating with a genuine leather strap. Understated elegance for the boardroom or a formal evening.",
    specifications: {
      "Case Material": "Gold-tone stainless steel",
      "Case Diameter": "40mm",
      Movement: "Japanese Quartz",
      "Water Resistance": "30m",
      Strap: "Genuine leather, brown",
      Crystal: "Mineral glass",
    },
    images: ["/products/watch-2-a.svg", "/products/watch-2-b.svg"],
    rating: 4.5,
    reviewCount: 76,
    stock: 9,
    featured: true,
  },
  {
    id: "3",
    slug: "triton-diver-300",
    sku: "BB-DIV-003",
    name: "Triton Diver 300",
    brand: "BudgetBazaar Atelier",
    category: "Dive",
    price: 1450,
    compareAtPrice: 1750,
    description:
      "A rugged professional-grade diver rated to 300m, with a unidirectional rotating bezel, luminous markers, and a screw-down crown.",
    specifications: {
      "Case Material": "316L Stainless Steel",
      "Case Diameter": "44mm",
      Movement: "Automatic",
      "Water Resistance": "300m",
      Strap: "Steel bracelet with diver extension",
      Crystal: "Sapphire crystal",
    },
    images: ["/products/watch-3-a.svg", "/products/watch-3-b.svg"],
    rating: 4.8,
    reviewCount: 203,
    stock: 6,
    bestSeller: true,
    newArrival: true,
  },
  {
    id: "4",
    slug: "pulse-smartwatch-pro",
    sku: "BB-SMT-004",
    name: "Pulse Smartwatch Pro",
    brand: "BudgetBazaar Tech",
    category: "Smart",
    price: 699,
    description:
      "A premium smartwatch with AMOLED display, heart-rate and SpO2 tracking, 10-day battery life, and full smartphone notifications.",
    specifications: {
      Display: "1.43\" AMOLED, always-on",
      Battery: "Up to 10 days",
      "Water Resistance": "IP68",
      Sensors: "Heart rate, SpO2, accelerometer",
      Connectivity: "Bluetooth 5.2",
      Compatibility: "iOS & Android",
    },
    images: ["/products/watch-4-a.svg", "/products/watch-4-b.svg"],
    rating: 4.4,
    reviewCount: 341,
    stock: 22,
    newArrival: true,
  },
  {
    id: "5",
    slug: "solstice-minimalist-mesh",
    sku: "BB-MIN-005",
    name: "Solstice Minimalist",
    brand: "BudgetBazaar Atelier",
    category: "Minimalist",
    price: 549,
    compareAtPrice: 649,
    description:
      "A clean, Scandinavian-inspired minimalist watch with a matte dial, no numerals, and a comfortable milanese mesh band.",
    specifications: {
      "Case Material": "Stainless Steel",
      "Case Diameter": "38mm",
      Movement: "Quartz",
      "Water Resistance": "50m",
      Strap: "Milanese mesh",
      Crystal: "Mineral glass",
    },
    images: ["/products/watch-5-a.svg", "/products/watch-5-b.svg"],
    rating: 4.6,
    reviewCount: 94,
    stock: 0,
    featured: true,
  },
  {
    id: "6",
    slug: "regent-chronograph-black",
    sku: "BB-CHR-006",
    name: "Regent Chronograph Black",
    brand: "BudgetBazaar Atelier",
    category: "Chronograph",
    price: 1099,
    description:
      "A bold black-ion-plated chronograph with contrast orange accents, designed for those who want their timepiece to make a statement.",
    specifications: {
      "Case Material": "Black IP-plated steel",
      "Case Diameter": "43mm",
      Movement: "Quartz Chronograph",
      "Water Resistance": "100m",
      Strap: "Black silicone",
      Crystal: "Mineral glass",
    },
    images: ["/products/watch-6-a.svg", "/products/watch-6-b.svg"],
    rating: 4.3,
    reviewCount: 58,
    stock: 17,
    bestSeller: true,
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string) {
  const normalized = category.trim().toLowerCase();
  return products.filter((p) => p.category.toLowerCase() === normalized);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) =>
    [p.name, p.brand, p.category, p.description]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}

export function getBestSellers() {
  return products.filter((p) => p.bestSeller);
}

export function getNewArrivals() {
  return products.filter((p) => p.newArrival);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
