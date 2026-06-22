"use client";

import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Brand Identity Development",
    description:
      "The foundation layer. Brand strategy, visual identity, and messaging that define how the brand looks, sounds, and behaves.",
    items: ["Brand Strategy", "Visual Identity System", "Messaging Framework", "Brand Guidelines"],
  },
  {
    number: "02",
    title: "Commercial Video & Photo",
    description:
      "The message layer. End-to-end campaign production built to communicate clearly and convert.",
    items: ["Research", "Scripting", "Storyboarding", "Talent Scouting", "Production", "Editing"],
  },
  {
    number: "03",
    title: "UGC Content Production",
    description:
      "The traction layer. High-volume UGC-style content engineered for digital velocity and performance.",
    items: ["Concept Variants", "Aesthetic Direction", "High-Volume Production", "Distribution-Ready"],
  },
];

export default function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="border-t border-line">
      {services.map((service, index) => {
        const isOpen = activeIndex === index;
        return (
          <div key={service.number} className="border-b border-line">

            {/* Row header */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-6 py-8 md:py-10 text-left group"
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="label text-ink-muted shrink-0">({service.number})</span>
                <h3 className="font-sora text-h3 md:text-h2 text-ink leading-none group-hover:text-accent transition-colors duration-200">
                  {service.title}
                </h3>
              </div>
              <span
                className={`label text-ink-muted shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                (+)
              </span>
            </button>

            {/* Expandable content */}
            <div
              className="grid transition-all duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="flex gap-6 md:gap-10 pb-10 md:pb-12 pt-2">

                  {/* Invisible spacer — matches number label width */}
                  <div className="label opacity-0 select-none shrink-0">(00)</div>

                  {/* Content */}
                  <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-16 flex-1">
                    <div className="md:col-span-6 flex flex-col gap-6">
                      <p className="font-geist text-body text-ink-muted">
                        {service.description}
                      </p>
                      <p className="label text-ink">
                        {service.items.join("  /  ")}
                      </p>
                    </div>
                    <div className="md:col-span-4 md:col-start-9 aspect-[2/1] bg-canvas-alt border border-line" />
                  </div>

                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}