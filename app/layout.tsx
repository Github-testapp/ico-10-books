import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const serif = Noto_Serif_JP({
  variable: "--font-serif",
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const sans = Noto_Sans_JP({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "十書の知恵 | 10 Books to Read",
  description:
    "論語・易経・道徳経など、ご先祖様が選ぶ良書10選から現代の暮らしに活かせる知恵を抽出。人生の局面ごとに最適な一言を引ける格言フラッシュカード。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F1E6",
};

const themeBootScript = `
(function () {
  try {
    var theme = localStorage.getItem("ico10books-theme");
    if (theme === "dark") document.documentElement.dataset.theme = "dark";
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
