import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3 sm:px-8 sm:py-3.5">
        <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent font-serif-jp text-sm font-bold">
            十
          </span>
          <span className="truncate font-serif-jp text-sm font-bold tracking-wide sm:text-lg">
            十書の知恵
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1 text-sm sm:gap-2.5">
          <Link
            href="/"
            className="hidden rounded-full px-3 py-1.5 text-muted transition-colors hover:text-foreground sm:inline-block sm:px-4"
          >
            書籍一覧
          </Link>
          <Link
            href="/cards"
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:px-4 sm:text-sm"
          >
            格言カード
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
