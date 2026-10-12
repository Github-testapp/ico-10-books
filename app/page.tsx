import Link from "next/link";
import { books } from "@/lib/data";
import BookCard from "@/components/BookCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <section className="flex flex-col items-start gap-5 py-14 sm:py-20">
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-accent">
          ご先祖様が選ぶ、良書10選
        </span>
        <h1 className="font-serif-jp text-3xl font-black leading-[1.3] sm:text-5xl sm:leading-[1.25]">
          古典10冊の知恵を、
          <br />
          今日のあなたの判断に。
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          論語・易経・道徳経など、時代を超えて読み継がれてきた十の古典から、要点と現代の暮らしに活かせるポイントを抽出しました。難しい言葉は後回しにして、まずは「今の自分に効くところ」から読めます。
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/cards"
            className="rounded-full bg-accent px-5 py-2.5 text-base font-bold text-accent-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            格言カードで知恵を引く
          </Link>
          <a
            href="#books"
            className="rounded-full border border-border px-5 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:border-accent/50 hover:text-foreground"
          >
            10冊を見る
          </a>
        </div>
      </section>

      <section id="books" className="scroll-mt-20">
        <h2 className="mb-5 font-serif-jp text-xl font-bold sm:text-2xl">十書 一覧</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-border/70 bg-surface-muted px-6 py-10 text-center sm:mt-24 sm:px-12 sm:py-14">
        <p className="font-serif-jp text-xl font-bold leading-relaxed sm:text-2xl">
          時代が進んでも、人の悩みはあまり変わらない。
          <br />
          古典に触れることで、答えはいつも
          <br className="sm:hidden" />
          新しく見える形で、昔からそこにあったことに気づく。
        </p>
      </section>
    </div>
  );
}
