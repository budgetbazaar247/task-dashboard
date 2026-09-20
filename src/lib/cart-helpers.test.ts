import { describe, expect, it } from "vitest";
import { getCartDetails, getCartTotal, getCartCount, type CartLine } from "./cart-store";
import { getAllProducts } from "@/data/products";

describe("cart helpers", () => {
  const [productA, productB] = getAllProducts();
  const lines: CartLine[] = [
    { productId: productA.id, quantity: 2 },
    { productId: productB.id, quantity: 1 },
  ];

  it("resolves cart lines to their product details", () => {
    const details = getCartDetails(lines);
    expect(details).toHaveLength(2);
    expect(details[0].product.id).toBe(productA.id);
    expect(details[0].quantity).toBe(2);
  });

  it("drops lines referencing unknown product ids", () => {
    const details = getCartDetails([...lines, { productId: "does-not-exist", quantity: 1 }]);
    expect(details).toHaveLength(2);
  });

  it("computes the cart total as price times quantity, summed", () => {
    const expected = productA.price * 2 + productB.price * 1;
    expect(getCartTotal(lines)).toBe(expected);
  });

  it("computes total item count across lines", () => {
    expect(getCartCount(lines)).toBe(3);
  });

  it("returns zero for an empty cart", () => {
    expect(getCartTotal([])).toBe(0);
    expect(getCartCount([])).toBe(0);
  });
});
