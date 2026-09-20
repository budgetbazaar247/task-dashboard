# BudgetBazaar247

A premium watch & accessories e-commerce storefront for the Saudi Arabia / GCC market, built with
Next.js (App Router), TypeScript, and Tailwind CSS, with an AI shopping assistant ("BudgetBazaar AI")
powered by the Anthropic API and real tool use against the product catalog.

> **Demo storefront.** Checkout does not process real payments, and the AI assistant will refuse
> to invent prices, stock, or shipping times — everything it says comes from the product catalog
> via tool calls.

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Zustand** for cart/wishlist state (persisted to `localStorage`)
- **lucide-react** for icons
- **@anthropic-ai/sdk** for the AI shopping assistant, called only from the server

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — ESLint

## Adding Products

Product data lives in `src/data/products.ts` — a single typed array. Add a new entry with a
unique `id`/`slug`/`sku`, price, description, `specifications`, category, and an `images` array
(see below). The site, search, filters, and the AI assistant all read from this one file.

## Adding Product Images

Images live in `public/products/`. Demo products currently use generated placeholder SVGs.

To use your own photos:

1. Drop image files into `public/products/`, e.g. `watch-1.jpg`, `watch-1-2.jpg`.
2. In `src/data/products.ts`, point that product's `images` array at your files:
   ```ts
   images: ["/products/watch-1.jpg", "/products/watch-1-2.jpg"],
   ```
3. Save. The shop grid, product gallery, and AI assistant's product links update automatically.

See `public/products/README.md` for details.

## Configuring the AI Assistant

The assistant runs server-side only — the browser never sees your API key.

1. Copy `.env.example` to `.env.local`.
2. Set `ANTHROPIC_API_KEY=your_key_here` in `.env.local` (never commit this file).
3. Restart `npm run dev`.

The chat widget (bottom-right) posts to `/api/ai/chat`, a server route that calls the Anthropic
API with tool definitions backed by real store data (`src/lib/ai-tools.ts`):

```
Customer → Chat widget → /api/ai/chat (server) → Anthropic API
                                                      ↓ tool calls
                              searchProducts / getProduct / compareProducts /
                              getProductsByCategory / checkInventory /
                              addToCart / getStorePolicy
```

The assistant is instructed to never invent prices, stock, or policies — only to state what the
tools return. `addToCart` calls are relayed back to the browser as a `clientAction`, and the
widget applies them to the local cart (the server has no access to `localStorage`).

## Store Configuration

Edit `src/config/site.ts` to change the store name, WhatsApp number, currency, shipping regions,
and return window in one place. `NEXT_PUBLIC_STORE_NAME` and `NEXT_PUBLIC_WHATSAPP_NUMBER` can
also be set via environment variables (see `.env.example`).

## Connecting a Real Payment Provider

The checkout page (`src/app/checkout/page.tsx`) currently clears the cart and redirects to a
success page without charging anything — there's a visible placeholder notice explaining this.
To go live:

1. Pick a provider that supports Saudi payment methods (e.g. Mada) — common choices are Moyasar,
   HyperPay, PayTabs, Tap, or Stripe (for international cards).
2. Add a server route (e.g. `/api/checkout`) that creates a payment/session with your provider's
   server-side SDK, using a secret key stored in `.env.local` — never in client code.
3. Replace the checkout form's submit handler to redirect to the provider's hosted payment page,
   or embed their client SDK/element for in-page card entry.
4. Verify payment status via a webhook before marking an order as paid, then redirect to
   `/checkout/success` (or a dynamic order confirmation page).

## Deployment

This is a standard Next.js app and deploys to any Next.js-compatible host (Vercel, Netlify,
a Node server, or a container):

```bash
npm run build
npm start
```

Set `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_STORE_NAME`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, and
`NEXT_PUBLIC_SITE_URL` (your production URL, used for metadata/sitemap) as environment variables
on your host — never in the repository.

## Project Structure

```
src/
  app/                # Routes (App Router): home, shop, product/[slug], cart, checkout,
                       # checkout/success, about, contact, faq, privacy, terms, wishlist,
                       # api/ai/chat, sitemap.ts, robots.ts
  components/         # Navbar, Footer, ProductCard, ProductGrid, Hero, AIChat, WhatsAppButton, Toaster
  config/site.ts      # Store name, currency, WhatsApp number, shipping/returns config
  data/products.ts    # Product catalog + search/filter helpers
  data/policies.ts    # Shipping/returns/warranty/payment policy text
  lib/ai-tools.ts     # AI tool implementations (server-side, backed by the catalog)
  lib/cart-store.ts   # Zustand cart store (persisted)
  lib/wishlist-store.ts
  lib/toast-store.ts
public/products/      # Product images (placeholders — replace with your own photos)
```
