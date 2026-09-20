import { describe, expect, it } from "vitest";
import {
  getAllProducts,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getFeatured,
  getBestSellers,
  getRelatedProducts,
} from "./products";

describe("product catalog", () => {
  it("has unique ids, slugs, and skus", () => {
    const products = getAllProducts();
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
    expect(new Set(products.map((p) => p.sku)).size).toBe(products.length);
  });

  it("every product has at least one image, a positive price, and specifications", () => {
    for (const p of getAllProducts()) {
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.price).toBeGreaterThan(0);
      expect(Object.keys(p.specifications).length).toBeGreaterThan(0);
    }
  });

  it("looks up products by slug and id", () => {
    const bySlug = getProductBySlug("aurelia-chronograph-steel");
    expect(bySlug?.name).toBe("Aurelia Chronograph");
    expect(getProductById(bySlug!.id)?.slug).toBe("aurelia-chronograph-steel");
    expect(getProductBySlug("does-not-exist")).toBeUndefined();
  });

  it("filters by category case-insensitively", () => {
    const dive = getProductsByCategory("dive");
    expect(dive.length).toBeGreaterThan(0);
    expect(dive.every((p) => p.category === "Dive")).toBe(true);
  });

  it("searches across name, brand, category, and description", () => {
    const results = searchProducts("chronograph");
    expect(results.length).toBeGreaterThan(0);
    expect(searchProducts("")).toEqual(getAllProducts());
  });

  it("returns only featured and best-seller flagged products", () => {
    expect(getFeatured().every((p) => p.featured)).toBe(true);
    expect(getBestSellers().every((p) => p.bestSeller)).toBe(true);
  });

  it("finds related products within the same category, excluding itself", () => {
    const product = getProductBySlug("aurelia-chronograph-steel")!;
    const related = getRelatedProducts(product);
    expect(related.every((p) => p.category === product.category)).toBe(true);
    expect(related.some((p) => p.id === product.id)).toBe(false);
  });
});
