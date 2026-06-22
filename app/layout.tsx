import type { Metadata } from "next";
import { Sora, Geist } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",   // changed
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",  // changed
  display: "swap",
});

export const metadata: Metadata = {
  title: "WEEK&WORK | Multi-disciplinary Creative Studio",
  description:
    "WEEK&WORK is a multi-disciplinary creative studio focusing on developing a scalable brand. Backed by data and research, only serving the finest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${geist.variable}`}>
      <body className="bg-canvas text-ink font-geist antialiased" suppressHydrationWarning>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}