// app/works/page.tsx
// -----------------------------------------------------------------------------
// Works index — fetches all projects from Sanity, ordered by `order` field.
// -----------------------------------------------------------------------------

import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import { client } from "../../sanity/lib/client";
import { allProjectsQuery } from "../../sanity/lib/queries";

export const metadata = {
  title: "OUR WORKS | WEEK&WORK",
};

type ProjectSummary = {
  _id: string;
  title: string;
  slug: string;
  brand: string;
  year: string;
  services: string[];
  heroImage: string | null;
};

export default async function Works() {
  const projects: ProjectSummary[] = await client.fetch(allProjectsQuery);

  return (
    <>
      {/* ============================================ */}
      {/* HEADER                                       */}
      {/* ============================================ */}
      <section data-nav-theme="light" className="bg-canvas text-ink section pt-32 md:pt-48">
        <p className="label text-ink-muted mb-8">(CURATED PROJECTS)</p>
        <div className="flex flex-col gap-4">
          <h1 className="heading-hero text-accent leading-none">
            OUR
          </h1>
          <h1 className="heading-hero text-ink leading-none">
            WORKS
          </h1>
        </div>
      </section>

      {/* ============================================ */}
      {/* WORKS GRID                                   */}
      {/* ============================================ */}
      <section data-nav-theme="light" className="bg-canvas text-ink px-6 md:px-12 lg:px-24 pb-32 md:pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-0">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/works/${project.slug}`}
              className={`group ${index % 2 === 1 ? "md:mt-32" : ""}`}
            >
              {/* Image */}
              <div className={`${"aspect-[3/4]"} bg-canvas-alt border border-line overflow-hidden relative mb-6`}>
                {project.heroImage ? (
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-canvas-alt" />
                )}
              </div>

              {/* Meta */}
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-sora text-h3 text-ink group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="label text-ink-muted whitespace-nowrap">{project.year}</p>
              </div>
              <p className="label text-ink-muted mt-2">
                {project.services[0]?.toUpperCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER CTA                                   */}
      {/* ============================================ */}
      <section data-nav-theme="dark" className="bg-hero text-ink-light section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <p className="label text-ink-light opacity-70 mb-8">(HAVE A PROJECT IN MIND?)</p>
            <h2 className="heading-section text-ink-light max-w-3xl">
              Let&apos;s build something that scales.
            </h2>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <Link
              href="/contact"
              className="label text-ink-light hover:opacity-70 transition-opacity duration-200"
            >
              (TELL US MORE) &rarr;
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}