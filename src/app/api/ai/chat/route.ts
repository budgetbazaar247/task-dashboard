import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  searchProducts,
  getProduct,
  compareProducts,
  getProductsByCategoryTool,
  checkInventory,
  addToCartTool,
  getStorePolicy,
  catalogSnapshotForPrompt,
} from "@/lib/ai-tools";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const MODEL = "claude-sonnet-5";

const tools: Anthropic.Tool[] = [
  {
    name: "searchProducts",
    description: "Search the watch catalog by keyword (name, brand, category, or description).",
    input_schema: {
      type: "object",
      properties: { query: { type: "string", description: "Search keywords" } },
      required: ["query"],
    },
  },
  {
    name: "getProduct",
    description: "Get full details for one product by its id.",
    input_schema: {
      type: "object",
      properties: { productId: { type: "string" } },
      required: ["productId"],
    },
  },
  {
    name: "compareProducts",
    description: "Compare two or more products side by side by their ids.",
    input_schema: {
      type: "object",
      properties: {
        productIds: { type: "array", items: { type: "string" }, minItems: 2 },
      },
      required: ["productIds"],
    },
  },
  {
    name: "getProductsByCategory",
    description:
      "List products in a category. Valid categories: Chronograph, Dress, Dive, Smart, Minimalist.",
    input_schema: {
      type: "object",
      properties: { category: { type: "string" } },
      required: ["category"],
    },
  },
  {
    name: "checkInventory",
    description: "Check whether a product is in stock and how many units remain.",
    input_schema: {
      type: "object",
      properties: { productId: { type: "string" } },
      required: ["productId"],
    },
  },
  {
    name: "addToCart",
    description:
      "Add a product to the customer's cart. Only call this when the customer explicitly asks to add an item to their cart.",
    input_schema: {
      type: "object",
      properties: {
        productId: { type: "string" },
        quantity: { type: "number", default: 1 },
      },
      required: ["productId"],
    },
  },
  {
    name: "getStorePolicy",
    description: "Get the store's policy text. policyType is one of: shipping, returns, warranty, payment.",
    input_schema: {
      type: "object",
      properties: { policyType: { type: "string" } },
      required: ["policyType"],
    },
  },
];

function runTool(name: string, input: Record<string, unknown>) {
  switch (name) {
    case "searchProducts":
      return searchProducts(String(input.query ?? ""));
    case "getProduct":
      return getProduct(String(input.productId ?? ""));
    case "compareProducts":
      return compareProducts(
        Array.isArray(input.productIds) ? input.productIds.map(String) : []
      );
    case "getProductsByCategory":
      return getProductsByCategoryTool(String(input.category ?? ""));
    case "checkInventory":
      return checkInventory(String(input.productId ?? ""));
    case "addToCart":
      return addToCartTool(String(input.productId ?? ""), Number(input.quantity ?? 1));
    case "getStorePolicy":
      return getStorePolicy(String(input.policyType ?? ""));
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

const SYSTEM_PROMPT = `You are ${siteConfig.aiAssistantName}, the shopping assistant for ${siteConfig.name}, an online watch and accessories store serving Saudi Arabia and the GCC.

Behave like a helpful, professional store sales assistant. Rules you must always follow:
- Be concise and friendly.
- Only use information returned by your tools (searchProducts, getProduct, compareProducts, getProductsByCategory, checkInventory, addToCart, getStorePolicy). Never invent prices, stock levels, shipping times, or product specifications.
- Always mention prices in ${siteConfig.currency}.
- Never claim a product is in stock unless a tool confirms it.
- If information isn't available from your tools, say so plainly instead of guessing.
- Recommend products based on what the customer says they want (budget, style, use case).
- Do not pressure the customer or use aggressive sales tactics.
- Only call addToCart when the customer explicitly asks you to add something to their cart.
- When you mention a specific product, include its store URL (from tool results) so the customer can view it.
- Keep responses short and easy to scan; use plain text, not heavy markdown.

Known catalog (for your awareness only — always confirm exact price/stock via tools before stating them):
${catalogSnapshotForPrompt()}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI assistant is not configured. Set ANTHROPIC_API_KEY on the server." },
      { status: 503 }
    );
  }

  let body: { messages?: Anthropic.MessageParam[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  if (incoming.length === 0) {
    return NextResponse.json({ error: "messages is required." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });
  const messages: Anthropic.MessageParam[] = [...incoming];
  const clientActions: Array<{ type: string; productId: string; quantity: number }> = [];

  try {
    for (let iteration = 0; iteration < 6; iteration++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools,
        messages,
      });

      const toolUseBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );

      if (toolUseBlocks.length === 0) {
        const text = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n");
        return NextResponse.json({ reply: text, clientActions });
      }

      messages.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = toolUseBlocks.map((block) => {
        const result = runTool(block.name, (block.input as Record<string, unknown>) ?? {});
        if (block.name === "addToCart" && (result as { success?: boolean }).success) {
          const r = result as { productId: string; quantity: number };
          clientActions.push({ type: "addToCart", productId: r.productId, quantity: r.quantity });
        }
        return {
          type: "tool_result",
          tool_use_id: block.id,
          content: JSON.stringify(result),
        };
      });

      messages.push({ role: "user", content: toolResults });
    }

    return NextResponse.json(
      { error: "The assistant took too many steps to respond. Please try again." },
      { status: 500 }
    );
  } catch (err) {
    console.error("AI chat error", err);
    return NextResponse.json(
      { error: "The assistant is temporarily unavailable. Please try again shortly." },
      { status: 500 }
    );
  }
}
