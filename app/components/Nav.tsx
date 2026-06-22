"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
   const handleScroll = () => {
  const sections = document.querySelectorAll("main section[data-nav-theme]");
  // Check point = middle of the nav bar (h-16 = 64px, so midpoint = 32)
  const checkPoint = 32;
  let currentTheme = "light";

  sections.forEach((section) => {
    const rect = (section as HTMLElement).getBoundingClientRect();
    if (rect.top <= checkPoint && rect.bottom > checkPoint) {
      currentTheme = (section as HTMLElement).getAttribute("data-nav-theme") ?? "light";
    }
  });

  setInHero(currentTheme === "dark");
};

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${inHero ? "nav-hero" : "nav-adaptive"}`}>
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 h-16">
        <Link href="/" className="nav-wordmark font-sora text-base font-semibold tracking-tight">
          WEEK&amp;WORK
        </Link>
        <ul className="flex items-center gap-6 md:gap-10">
          <li>
            <Link href="/works" className="nav-link label">(WORKS)</Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link label">(CONTACT US)</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}