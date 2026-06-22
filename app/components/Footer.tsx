import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-canvas border-t border-line px-6 md:px-12 lg:px-24 pt-20 pb-12">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-20">

        {/* Left — contact block */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <a
              href="/"
              className="font-sora text-h2 font-medium text-ink hover:text-accent transition-colors duration-200 leading-none"
            >
              WEEK&amp;<br></br>WORK
            </a>
          </div>

          <p className="label text-ink-muted">
            MALANG, INDONESIA
          </p>
        </div>

        {/* Right — CTA block */}
        <div className="flex flex-col gap-6 md:items-end md:text-right">
          <p className="label text-ink-muted">HAVE A PROJECT IN MIND?</p>

          <Link
            href="/contact"
            className="font-sora text-h3 font-medium text-ink hover:text-accent transition-colors duration-200 leading-tight inline-block"
          >
            TELL US MORE &rarr;
          </Link>

          {/* Socials */}
          <div className="flex gap-6 md:justify-end mt-2">
            <a
              href="https://instagram.com/weekn.work"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-ink-muted hover:text-ink transition-colors duration-200"
            >
              (INSTAGRAM)
            </a>
            <a
              href="mailto:business@weekn.work"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-ink-muted hover:text-ink transition-colors duration-200"
            >
              (EMAIL)
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-line">
        <p className="label text-ink-muted">
          &copy; {year} PT WAHANA NALAR WIGUNA. ALL RIGHTS RESERVED.
        </p>

        <div className="flex gap-6">
          <Link
            href="/privacy"
            className="label text-ink-muted hover:text-ink transition-colors duration-200"
          >
            (PRIVACY POLICY)
          </Link>
          <Link
            href="/terms"
            className="label text-ink-muted hover:text-ink transition-colors duration-200"
          >
            (TERMS)
          </Link>
        </div>
      </div>

    </footer>
  );
}