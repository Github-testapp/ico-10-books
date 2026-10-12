import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 text-accent font-serif-jp text-sm font-bold">
            十
          </span>
          <span className="font-serif-jp text-[15px] font-bold tracking-wide sm:text-base">
            十書の知恵
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-muted transition-colors hover:text-foreground sm:px-4"
          >
            書籍一覧
          </Link>
          <Link
            href="/cards"
            className="rounded-full bg-accent px-3 py-1.5 font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:px-4"
          >
            格言カード
          </Link>
        </nav>
      </div>
    </header>
  );
}
