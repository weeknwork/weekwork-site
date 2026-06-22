import Link from "next/link";
import ServicesAccordion from "./components/ServicesAccordion";
import WorksGallery from "./components/WorksGallery";
import { client } from "../sanity/lib/client";
import { allProjectsQuery } from "../sanity/lib/queries";

export default async function Home() {
  const projects = await client.fetch(allProjectsQuery);
    return (
    <>
      {/* ============================================ */}
      {/* SECTION 1 — HERO                              */}
      {/* ============================================ */}
      <section data-nav-theme="dark" className=" bg-hero text-ink-light min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-32 pb-12">

        {/* Top label */}
        <div className="flex justify-between items-start">
          <p className="label text-ink-light opacity-70 max-w-xs">
            (MULTI-DISCIPLINARY CREATIVE STUDIO)
          </p>
          <p className="label text-ink-light opacity-70 text-right">
            MALANG, ID
          </p>
        </div>

        {/* Stacked wordmark */}
        <div className="flex-1 flex flex-col justify-center -mt-12">
          <h1 className="heading-hero text-ink-light leading-none">
            WEEK&amp;
          </h1>
          <h1 className="heading-hero text-ink-light leading-none">
            WORK
          </h1>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <p className="font-geist text-body-lg text-ink-light max-w-md">
            We build scalable brands. Through identity, commercial film, and content built for how people actually consume today.
          </p>
          <p className="label text-ink-light opacity-70">
            (SCROLL) &darr;
          </p>
        </div>

      </section>

      {/* ============================================ */}
      {/* SECTION 2 — WHO WE ARE                        */}
      {/* ============================================ */}
      <section data-nav-theme="light" className="bg-canvas-alt text-ink px-6 md:px-12 lg:px-24 py-32 md:py-48">

        <p className="label text-ink-muted mb-16">(WHO WE ARE)</p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <h2 className="heading-section text-ink mb-12">
              A brand that cannot scale is just a moment.
            </h2>
          </div>

          <div className="md:col-span-5 md:col-start-8 flex flex-col gap-6">
            <p className="font-geist text-body-lg text-ink">
              WEEK&amp;WORK is a creative studio building brands that survive beyond the moment.
            </p>
            <p className="font-geist text-body text-ink-muted">
              We work across three layers. Identity sets the foundation. Commercial film shapes the message. UGC drives the traction. Each layer feeds the next.
            </p>
            <p className="font-geist text-body text-ink-muted">
              Backed by data, research, and a creative system built for how attention actually moves today.
            </p>
          </div>
        </div>

      </section>

      {/* ============================================ */}
      {/* SECTION 3 — (OUR )SERVICES                    */}
      {/* ============================================ */}
<section data-nav-theme="light" className="bg-canvas text-ink section">

  <div className="mb-16 md:mb-24">
    <p className="label text-ink-muted mb-8">(WHAT WE DO)</p>
    <h2 className="heading-section text-ink">
      <span className="text-ink-muted">(OUR)</span> SERVICES
    </h2>
  </div>

  <ServicesAccordion />

</section>

      {/* ============================================ */}
      {/* SECTION 4 — (OUR )WORKS                       */}
      {/* ============================================ */}
      <section data-nav-theme="light" className="bg-canvas-alt text-ink py-32 md:py-48">

        {/* Section header */}
        <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
          <p className="label text-ink-muted mb-8">(PROJECT HIGHLIGHTS)</p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <h2 className="heading-section text-ink mb-6">
                <span className="text-ink-muted">(OUR )</span>WORKS
              </h2>
              <p className="font-geist text-body-lg text-ink-muted max-w-lg">
                Selected projects across brand identity, commercial film, and UGC content production.
              </p>
            </div>
            <Link
              href="/works"
              className="label text-ink hover:text-accent transition-colors duration-200 shrink-0"
            >
              (SEE ALL PROJECTS) &rarr;
            </Link>
          </div>
        </div>

        {/* Full-bleed gallery — no horizontal padding */}
        <WorksGallery projects={projects} />

      </section>
      {/* ============================================ */}
      {/* SECTION 5 — (WHAT WE BELIEVE IN) — DARK       */}
      {/* ============================================ */}
      <section data-nav-theme="dark" className="bg-canvas-dark text-ink-light section">

        {/* Section header */}
        <div className="mb-24 md:mb-32">
          <p className="label text-ink-light opacity-70 mb-8">(WHAT WE BELIEVE IN)</p>
          <h2 className="heading-section text-ink-light max-w-4xl">
            Creative work is the output of a system. Not the exception to it.
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          <div className="border-t border-line-dark pt-8">
            <p className="label text-ink-light opacity-70 mb-6">(01)</p>
            <h3 className="font-sora text-h3 text-ink-light mb-4">
              Scale or it&apos;s nothing.
            </h3>
            <p className="font-geist text-body text-ink-light opacity-70">
              A brand that cannot scale is a moment, not a brand. We build for what survives beyond the launch.
            </p>
          </div>

          <div className="border-t border-line-dark pt-8">
            <p className="label text-ink-light opacity-70 mb-6">(02)</p>
            <h3 className="font-sora text-h3 text-ink-light mb-4">
              Systems make craft work.
            </h3>
            <p className="font-geist text-body text-ink-light opacity-70">
              Intuition without structure cannot be replicated. Systems are what make creativity scalable, consistent, and measurable.
            </p>
          </div>

          <div className="border-t border-line-dark pt-8">
            <p className="label text-ink-light opacity-70 mb-6">(03)</p>
            <h3 className="font-sora text-h3 text-ink-light mb-4">
              Performance over decoration.
            </h3>
            <p className="font-geist text-body text-ink-light opacity-70">
              Beauty without business impact is expensive decoration. Quality is measured by what the work actually does.
            </p>
          </div>

          <div className="border-t border-line-dark pt-8">
            <p className="label text-ink-light opacity-70 mb-6">(04)</p>
            <h3 className="font-sora text-h3 text-ink-light mb-4">
              Foundation first, always.
            </h3>
            <p className="font-geist text-body text-ink-light opacity-70">
              Identity sets the foundation. Message shapes the story. Traction drives the scale. In that order, never reversed.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}