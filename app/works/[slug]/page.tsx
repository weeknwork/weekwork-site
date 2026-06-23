// app/works/[slug]/page.tsx
// -----------------------------------------------------------------------------
// Work detail page — fetches a single project from Sanity by slug.
// Renders fixed meta header + free-ordered modular blocks.
// -----------------------------------------------------------------------------

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "../../components/Footer";
import { client } from "../../../sanity/lib/client";
import {
  allProjectSlugsQuery,
  projectBySlugQuery,
  projectNeighboursQuery,
} from "../../../sanity/lib/queries";

// Pre-render every project at build time
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allProjectSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });
  if (!project) return { title: "Work Not Found | WEEK&WORK" };
  return {
    title: `${project.title} | WEEK&WORK`,
    description: project.description?.split("\n\n")[0],
  };
}

// --- types ------------------------------------------------------------------

type MediaItem = {
  kind: "image" | "video";
  src?: string;
  videoSrc?: string;
  alt?: string;
  aspect?: "3/4" | "4/3" | "1/1" | "16/9" | "4/5";
};

type Block =
  | { _type: "textBlock"; label?: string; body: string }
  | { _type: "mediaBlock"; layout: "single" | "pair" | "triple"; items: MediaItem[] };

type Project = {
  title: string;
  slug: string;
  brand: string;
  year: string;
  services: string[];
  description: string;
  heroImage: string;
  links?: { label: string; href: string }[];
  blocks: Block[];
};

// --- helpers ----------------------------------------------------------------

function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i} className={className}>
          {p}
        </p>
      ))}
    </>
  );
}

function Media({ item }: { item: MediaItem }) {
  const aspectClass: Record<NonNullable<MediaItem["aspect"]>, string> = {
    "3/4": "aspect-[3/4]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "16/9": "aspect-video",
    "4/5": "aspect-[4/5]",
  };
  const ratio = item.aspect ? aspectClass[item.aspect] : "aspect-[4/3]";
  const src = item.kind === "video" ? item.videoSrc : item.src;

  if (!src) return <div className={`relative w-full ${ratio} bg-canvas-alt border border-line`} />;

  return (
    <div className={`relative w-full ${ratio} overflow-hidden bg-canvas-alt border border-line`}>
      {item.kind === "video" ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} />
        </video>
      ) : (
        <Image
          src={src}
          alt={item.alt ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
      )}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  if (block._type === "textBlock") {
    return (
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-2xl">
          {block.label && <p className="label text-ink-muted mb-6">({block.label})</p>}
          <div className="flex flex-col gap-5 font-geist text-body-lg text-ink">
            <Paragraphs text={block.body} />
          </div>
        </div>
      </div>
    );
  }

  if (block._type === "mediaBlock") {
    if (block.layout === "single") {
      return (
        <div className="px-6 md:px-12 lg:px-24 py-8 md:py-12">
          <Media item={block.items[0]} />
        </div>
      );
    }
    const cols = block.layout === "pair" ? "md:grid-cols-2" : "md:grid-cols-3";
    return (
      <div className="px-6 md:px-12 lg:px-24 py-8 md:py-12">
        <div className={`grid grid-cols-1 ${cols} gap-6`}>
          {block.items.map((item, i) => (
            <Media key={i} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// --- page -------------------------------------------------------------------

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project: Project | null = await client.fetch(projectBySlugQuery, { slug });
  if (!project) notFound();

  // Fetch neighbours using the project's order field
  const neighbours = await client.fetch(projectNeighboursQuery, {
    slug,
    order: (project as any).order ?? 0,
  });

  const prev = neighbours?.prev;
  const next = neighbours?.next;

  return (
    <>
      {/* SECTION 1 — Hero image with title overlay */}
      <section data-nav-theme="dark" className="relative bg-canvas-dark">
        <div className="relative w-full h-[70vh] md:h-screen">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-24 pb-12 md:pb-16">
            <p className="label text-ink-light opacity-70 mb-4">{project.brand}</p>
            <h1 className="heading-hero text-ink-light leading-none">{project.title}</h1>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Meta header */}
      <section data-nav-theme="light" className="bg-canvas text-ink section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left — description */}
          <div className="md:col-span-7">
            <p className="label text-ink-muted mb-6">(THE PROJECT)</p>
            <div className="flex flex-col gap-5 font-geist text-body-lg text-ink">
              <Paragraphs text={project.description} />
            </div>
          </div>

          {/* Right — meta */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-10">
            <div>
              <p className="label text-ink-muted mb-3">(BRAND)</p>
              <p className="font-geist text-body text-ink">{project.brand}</p>
            </div>
            <div>
              <p className="label text-ink-muted mb-3">(YEAR)</p>
              <p className="font-geist text-body text-ink">{project.year}</p>
            </div>
            <div>
              <p className="label text-ink-muted mb-3">(SERVICES)</p>
              <ul className="flex flex-col gap-1">
                {project.services.map((s) => (
                  <li key={s} className="font-geist text-body text-ink">{s}</li>
                ))}
              </ul>
            </div>
            {project.links && project.links.length > 0 && (
              <div className="flex flex-col gap-3">
                {project.links.map((l) => (
                  <div key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-ink hover:text-accent transition-colors duration-200"
                    >
                      ({l.label}) &rarr;
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Modular blocks */}
      <section data-nav-theme="light" className="bg-canvas text-ink pb-16 md:pb-24">
        {project.blocks?.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </section>

      {/* SECTION 4 — Prev / Next */}
      {(prev || next) && (
        <section data-nav-theme="light" className="bg-canvas-alt text-ink section">
          <div className="grid grid-cols-2 gap-6">
            <div>
              {prev && (
                <Link href={`/works/${prev.slug}`} className="group flex flex-col gap-2">
                  <span className="label text-ink-muted">(PREVIOUS)</span>
                  <span className="font-sora text-h3 text-ink group-hover:text-accent transition-colors duration-200">
                    {prev.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="flex flex-col items-end text-right">
              {next && (
                <Link href={`/works/${next.slug}`} className="group flex flex-col gap-2 items-end">
                  <span className="label text-ink-muted">(NEXT)</span>
                  <span className="font-sora text-h3 text-ink group-hover:text-accent transition-colors duration-200">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

    </>
  );
}