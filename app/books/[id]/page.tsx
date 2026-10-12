import Link from "next/link";
import { notFound } from "next/navigation";
import { books, getBook, getCardsForBook } from "@/lib/data";

export function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = getBook(id);
  if (!book) notFound();

  const cards = getCardsForBook(book.id);
  const prevBook = books.find((b) => b.order === book.order - 1);
  const nextBook = books.find((b) => b.order === book.order + 1);

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        十書一覧へ戻る
      </Link>

      <header className="mt-6 flex flex-col gap-4 border-b border-border/70 pb-8">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl font-serif-jp text-2xl font-bold"
          style={{ backgroundColor: book.accentSoft, color: book.accent }}
        >
          {String(book.order).padStart(2, "0")}
        </span>
        <div>
          <h1 className="font-serif-jp text-3xl font-black sm:text-4xl">{book.title}</h1>
          <p className="mt-1.5 text-base font-bold" style={{ color: book.accent }}>
            {book.subtitle}
          </p>
        </div>
        <p className="text-xs uppercase tracking-wide text-muted">{book.era}</p>
        <p className="text-[15px] leading-relaxed text-foreground/85 sm:text-base">
          {book.essence}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="mb-5 font-serif-jp text-lg font-bold sm:text-xl">
          現代に活かす、4つの要点
        </h2>
        <div className="flex flex-col gap-4">
          {book.keyPoints.map((kp, i) => (
            <article
              key={kp.title}
              className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ backgroundColor: book.accentSoft, color: book.accent }}
                >
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-serif-jp text-lg font-bold leading-snug">
                    {kp.title}
                  </h3>
                  {kp.original && (
                    <p className="mt-2 border-l-2 pl-3 text-sm italic leading-relaxed text-muted" style={{ borderColor: book.accent }}>
                      「{kp.original}」
                    </p>
                  )}
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                    {kp.description}
                  </p>
                  <div
                    className="mt-4 rounded-xl p-4"
                    style={{ backgroundColor: book.accentSoft }}
                  >
                    <p className="text-xs font-bold tracking-wide" style={{ color: book.accent }}>
                      今の暮らしに活かすなら
                    </p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-foreground/90">
                      {kp.modernApplication}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {cards.length > 0 && (
        <section className="mt-10 rounded-2xl border border-border/70 bg-surface-muted p-6 text-center sm:p-8">
          <p className="font-serif-jp text-base font-bold sm:text-lg">
            「{book.title}」の格言カードで、人生の局面に効く一言を引く
          </p>
          <Link
            href={`/cards?book=${book.id}`}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {book.title}のカードを開く（{cards.length}枚）
          </Link>
        </section>
      )}

      <nav className="mt-10 flex items-center justify-between gap-3 border-t border-border/70 pt-6 text-sm">
        {prevBook ? (
          <Link
            href={`/books/${prevBook.id}`}
            className="flex-1 truncate text-muted transition-colors hover:text-foreground"
          >
            ← {prevBook.title}
          </Link>
        ) : (
          <span />
        )}
        {nextBook && (
          <Link
            href={`/books/${nextBook.id}`}
            className="flex-1 truncate text-right text-muted transition-colors hover:text-foreground"
          >
            {nextBook.title} →
          </Link>
        )}
      </nav>
    </div>
  );
}
