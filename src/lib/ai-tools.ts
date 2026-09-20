import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts as searchProductsData,
} from "@/data/products";
import { getStorePolicy as getStorePolicyData } from "@/data/policies";
import { siteConfig } from "@/config/site";

// Tool implementations backing the AI shopping assistant. Each function
// returns plain, serializable data derived only from the real product
// catalog — the model is never allowed to invent prices, stock, or policies.

function summarize(p: ReturnType<typeof getProductById>) {
  if (!p) return null;
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? null,
    currency: siteConfig.currency,
    inStock: p.stock > 0,
    stock: p.stock,
    rating: p.rating,
    reviewCount: p.reviewCount,
    url: `/product/${p.slug}`,
  };
}

export function searchProducts(query: string) {
  const results = searchProductsData(query).map(summarize);
  return { query, count: results.length, results };
}

export function getProduct(productId: string) {
  const product = getProductById(productId);
  if (!product) {
    return { found: false, error: `No product found with id "${productId}".` };
  }
  return {
    found: true,
    product: {
      ...summarize(product),
      description: product.description,
      specifications: product.specifications,
      sku: product.sku,
      images: product.images,
    },
  };
}

export function compareProducts(productIds: string[]) {
  const items = productIds.map((id) => {
    const p = getProductById(id);
    if (!p) return { id, found: false };
    return {
      id,
      found: true,
      name: p.name,
      price: p.price,
      currency: siteConfig.currency,
      category: p.category,
      inStock: p.stock > 0,
      rating: p.rating,
      specifications: p.specifications,
    };
  });
  return { items };
}

export function getProductsByCategoryTool(category: string) {
  const results = getProductsByCategory(category).map(summarize);
  return { category, count: results.length, results };
}

export function checkInventory(productId: string) {
  const product = getProductById(productId);
  if (!product) {
    return { found: false, error: `No product found with id "${productId}".` };
  }
  return {
    found: true,
    productId,
    name: product.name,
    inStock: product.stock > 0,
    stock: product.stock,
  };
}

export function addToCartTool(productId: string, quantity: number) {
  const product = getProductById(productId);
  if (!product) {
    return { success: false, error: `No product found with id "${productId}".` };
  }
  if (product.stock <= 0) {
    return {
      success: false,
      error: `${product.name} is currently out of stock and cannot be added to the cart.`,
    };
  }
  const qty = Math.max(1, Math.min(quantity || 1, product.stock));
  // This tool signals intent back to the client, which performs the actual
  // localStorage cart mutation (the server has no access to the browser's
  // cart state). See the chat route's `client_action` passthrough.
  return {
    success: true,
    productId,
    name: product.name,
    quantity: qty,
    message: `Added ${qty} x ${product.name} to the cart.`,
  };
}

export function getStorePolicy(policyType: string) {
  return { policyType, policy: getStorePolicyData(policyType) };
}

export const catalogSnapshotForPrompt = () =>
  getAllProducts()
    .map(
      (p) =>
        `- ${p.name} (id: ${p.id}, ${p.category}, ${siteConfig.currency} ${p.price}${
          p.compareAtPrice ? `, was ${siteConfig.currency} ${p.compareAtPrice}` : ""
        }, ${p.stock > 0 ? `${p.stock} in stock` : "out of stock"})`
    )
    .join("\n");
