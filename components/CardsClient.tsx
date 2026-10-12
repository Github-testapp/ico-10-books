"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { books, flashcards, categories } from "@/lib/data";
import type { CardCategory } from "@/lib/types";
import Furigana from "./Furigana";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Deterministic round-robin across books so the first render (SSR-safe,
// no Math.random) still feels varied instead of grouped by book.
function interleaveByBook(cards: typeof flashcards): string[] {
  const groups = new Map<string, string[]>();
  for (const c of cards) {
    const list = groups.get(c.bookId) ?? [];
    list.push(c.id);
    groups.set(c.bookId, list);
  }
  const buckets = Array.from(groups.values());
  const result: string[] = [];
  let i = 0;
  while (result.length < cards.length) {
    for (const bucket of buckets) {
      if (i < bucket.length) result.push(bucket[i]);
    }
    i++;
  }
  return result;
}

export default function CardsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookFilter = searchParams.get("book");
  const activeBook = books.find((b) => b.id === bookFilter);

  const [category, setCategory] = useState<CardCategory | "すべて">("すべて");
  const [order, setOrder] = useState(() => interleaveByBook(flashcards));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const pool = useMemo(() => {
    const byId = new Map(flashcards.map((c) => [c.id, c]));
    let list = order.map((id) => byId.get(id)!);
    if (activeBook) list = list.filter((c) => c.bookId === activeBook.id);
    if (category !== "すべて") list = list.filter((c) => c.category === category);
    return list;
  }, [order, activeBook, category]);

  const safeIndex = pool.length ? index % pool.length : 0;
  const card = pool[safeIndex];
  const book = card ? books.find((b) => b.id === card.bookId)! : undefined;

  function goTo(nextIndex: number) {
    setFlipped(false);
    setIndex(((nextIndex % pool.length) + pool.length) % pool.length);
  }

  function handleShuffle() {
    setOrder(shuffle(flashcards.map((c) => c.id)));
    setFlipped(false);
    setIndex(0);
  }

  function clearBookFilter() {
    router.push("/cards");
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-24 pt-8 sm:px-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium tracking-wide text-accent">
          格言フラッシュカード
        </span>
        <h1 className="font-serif-jp text-3xl font-black sm:text-4xl">
          今のあなたに効く一言を引く
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          カードをタップすると、その状況に最も効く古典の言葉がめくれます。
        </p>
      </div>

      {activeBook && (
        <button
          onClick={clearBookFilter}
          className="mt-4 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium"
          style={{ backgroundColor: activeBook.accentSoft, color: activeBook.accent }}
        >
          「{activeBook.title}」のカードのみ表示中
          <span aria-hidden>✕</span>
        </button>
      )}

      <div className="mt-5 flex w-full max-w-2xl flex-wrap justify-center gap-2 overflow-x-auto scrollbar-none">
        {(["すべて", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              goTo(0);
            }}
            className="shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
            style={
              category === c
                ? { backgroundColor: "var(--accent)", color: "var(--accent-foreground)", borderColor: "var(--accent)" }
                : { borderColor: "var(--border)", color: "var(--muted)" }
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 w-full">
        {card ? (
          <>
            <p className="mb-3 text-center text-sm font-medium text-muted">
              {safeIndex + 1} / {pool.length}
            </p>
            <div className="mx-auto w-full max-w-xl sm:max-w-2xl" style={{ perspective: 1600 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.22 }}
                  className="relative h-[58vh] min-h-[440px] max-h-[600px] w-full cursor-pointer select-none sm:h-[70vh] sm:min-h-[560px] sm:max-h-[820px]"
                  style={{ perspective: 1600 }}
                  onClick={() => setFlipped((f) => !f)}
                >
                  <motion.div
                    className="relative h-full w-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    {/* front */}
                    <div
                      className="absolute inset-0 flex flex-col rounded-3xl border p-7 shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:p-10"
                      style={{
                        backfaceVisibility: "hidden",
                        backgroundColor: book?.accentSoft,
                        borderColor: book?.accent,
                      }}
                    >
                      <span
                        className="self-start rounded-full bg-white/60 px-3.5 py-1.5 text-sm font-bold"
                        style={{ color: book?.accent }}
                      >
                        {book?.title}
                      </span>
                      <div className="flex flex-1 items-center justify-center py-6">
                        <p className="font-serif-jp text-ink-on-tint text-center text-2xl font-bold leading-snug sm:text-4xl">
                          {card.situation}
                        </p>
                      </div>
                      <span className="text-ink-on-tint/60 self-center text-sm font-medium">
                        タップしてめくる
                      </span>
                    </div>

                    {/* back */}
                    <div
                      className="absolute inset-0 flex flex-col overflow-y-auto rounded-3xl border p-7 shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:p-10"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: "var(--surface)",
                        borderColor: book?.accent,
                      }}
                    >
                      <span
                        className="self-start rounded-full px-3.5 py-1.5 text-sm font-bold"
                        style={{ backgroundColor: book?.accentSoft, color: book?.accent }}
                      >
                        {book?.title} ・ {card.category}
                      </span>
                      <div className="flex flex-1 flex-col justify-center gap-4 py-6">
                        <p
                          className="font-serif-jp text-xl font-bold leading-loose sm:text-3xl"
                          style={{ color: book?.accent }}
                        >
                          「<Furigana text={card.quote} />」
                        </p>
                        <p className="text-base leading-relaxed text-muted sm:text-lg">
                          {card.meaning}
                        </p>
                      </div>
                      <div
                        className="rounded-xl p-4 sm:p-5"
                        style={{ backgroundColor: book?.accentSoft }}
                      >
                        <p className="text-sm font-bold tracking-wide" style={{ color: book?.accent }}>
                          今の自分に活かすなら
                        </p>
                        <p className="mt-1.5 text-base leading-relaxed text-ink-on-tint sm:text-lg">
                          {card.advice}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => goTo(safeIndex - 1)}
                aria-label="前のカード"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent/50 hover:text-foreground"
              >
                ←
              </button>
              <button
                onClick={handleShuffle}
                aria-label="シャッフル"
                className="flex h-12 items-center gap-1.5 rounded-full border border-border px-5 text-base font-medium text-foreground/70 transition-colors hover:border-accent/50 hover:text-foreground"
              >
                シャッフル
              </button>
              <button
                onClick={() => goTo(safeIndex + 1)}
                aria-label="次のカード"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity hover:opacity-90"
              >
                →
              </button>
            </div>

            {book && (
              <p className="mt-6 text-center text-sm text-muted">
                この一言の出典 —{" "}
                <Link href={`/books/${book.id}`} className="font-medium underline">
                  {book.title}の要点を読む
                </Link>
              </p>
            )}
          </>
        ) : (
          <p className="py-20 text-center text-base text-muted">
            条件に合うカードがありません。
          </p>
        )}
      </div>
    </div>
  );
}
