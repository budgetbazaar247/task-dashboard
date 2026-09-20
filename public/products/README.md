# Product Images

Demo watches currently use generated placeholder SVGs (`watch-1-a.svg`, `watch-1-b.svg`, …).

## Replacing with your own photos

1. Drop your image files in this folder, e.g. `watch-1.jpg`, `watch-1-2.jpg`, `watch-1-3.jpg`.
2. Open `src/data/products.ts` and update the `images` array for the matching product to point
   at your new file paths, e.g.:

   ```ts
   images: ["/products/watch-1.jpg", "/products/watch-1-2.jpg", "/products/watch-1-3.jpg"],
   ```

3. Save — the shop grid, product page gallery, and AI assistant's product links all read from
   this same array automatically, so no other code changes are needed.

Use JPG or PNG for real photography; square (1:1) images at 1200x1200px or larger look best.
