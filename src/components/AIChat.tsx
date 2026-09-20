"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquareText, Send, X, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/lib/cart-store";
import { useToastStore } from "@/lib/toast-store";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content: `Hi! I'm ${siteConfig.aiAssistantName}. Tell me what you're looking for — style, budget, or occasion — and I'll help you find the right watch.`,
};

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.show);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (Array.isArray(data.clientActions)) {
        for (const action of data.clientActions) {
          if (action.type === "addToCart") {
            addItem(action.productId, action.quantity);
            showToast("Item added to cart by the assistant");
          }
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "..." }]);
    } catch {
      setError("Couldn't reach the assistant. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open BudgetBazaar AI chat"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-ink-950 shadow-gold transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquareText className="h-6 w-6" />}
      </button>

      {open && (
        <div className="animate-scale-in fixed bottom-24 right-4 z-40 flex h-[32rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-premium sm:right-6">
          <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-950 px-4 py-3">
            <Sparkles className="h-5 w-5 text-gold-400" />
            <div>
              <p className="text-sm font-semibold text-white">{siteConfig.aiAssistantName}</p>
              <p className="text-xs text-white/50">Shopping assistant</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-gold-gradient text-ink-950"
                    : "bg-ink-800 text-white/90"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[60%] rounded-2xl bg-ink-800 px-3 py-2 text-sm text-white/60">
                Typing…
              </div>
            )}
            {error && (
              <div className="rounded-2xl bg-red-950/40 px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-ink-700 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about watches, shipping, returns…"
              className="flex-1 rounded-full border border-ink-700 bg-ink-950 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-gold-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient text-ink-950 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
