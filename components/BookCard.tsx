import Link from "next/link";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group relative flex flex-col gap-3 rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-serif-jp text-lg font-bold"
          style={{ backgroundColor: book.accentSoft, color: book.accent }}
        >
          {String(book.order).padStart(2, "0")}
        </span>
        <span className="pt-1 text-xs text-muted">{book.era.split(" / ")[0]}</span>
      </div>

      <div>
        <h3 className="font-serif-jp text-xl font-bold leading-tight sm:text-2xl">
          {book.title}
        </h3>
        <p className="mt-1 text-sm font-medium" style={{ color: book.accent }}>
          {book.subtitle}
        </p>
      </div>

      <p className="text-base leading-relaxed text-muted">{book.essence}</p>

      <span className="mt-auto flex items-center gap-1 pt-1 text-sm font-medium text-foreground/80 transition-transform group-hover:translate-x-0.5">
        要点を読む
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-px">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
