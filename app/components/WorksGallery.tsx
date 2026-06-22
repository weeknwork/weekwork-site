"use client";

// app/components/WorksGallery.tsx
// -----------------------------------------------------------------------------
// Auto-scrolling horizontal gallery. Projects passed as props from the parent
// server component (home page) which fetches from Sanity.
// -----------------------------------------------------------------------------

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type ProjectSummary = {
  slug: string;
  title: string;
  brand: string;
  services: string[];
  heroImage: string | null;
};

export default function WorksGallery({ projects }: { projects: ProjectSummary[] }) {
  // Duplicate for seamless loop
  const items = [...projects, ...projects];

  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const positionRef = useRef(0);
  const animationRef = useRef<number>(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);

  const touchStartXRef = useRef(0);
  const isTouchRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const scroll = () => {
      if (!isPausedRef.current && track) {
        positionRef.current += speed;
        const halfWidth = track.scrollWidth / 2;
        if (positionRef.current >= halfWidth) positionRef.current = 0;
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const scheduleResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 3000);
  };

  const handleMouseEnter = () => { if (!isTouchRef.current) isPausedRef.current = true; };
  const handleMouseLeave = () => {
    if (!isTouchRef.current) { isDraggingRef.current = false; isPausedRef.current = false; }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouchRef.current) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || isTouchRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const deltaX = dragStartXRef.current - e.clientX;
    dragStartXRef.current = e.clientX;
    positionRef.current = Math.max(0, positionRef.current + deltaX);
    const halfWidth = track.scrollWidth / 2;
    if (positionRef.current >= halfWidth) positionRef.current = 0;
    track.style.transform = `translateX(-${positionRef.current}px)`;
  };
  const handleMouseUp = () => { if (isTouchRef.current) return; isDraggingRef.current = false; scheduleResume(); };

  const handleTouchStart = (e: React.TouchEvent) => {
    isTouchRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const deltaX = touchStartXRef.current - e.touches[0].clientX;
    touchStartXRef.current = e.touches[0].clientX;
    positionRef.current = Math.max(0, positionRef.current + deltaX);
    const halfWidth = track.scrollWidth / 2;
    if (positionRef.current >= halfWidth) positionRef.current = 0;
    track.style.transform = `translateX(-${positionRef.current}px)`;
  };
  const handleTouchEnd = () => { scheduleResume(); };

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={trackRef} className="flex gap-6 w-max">
        {items.map((project, index) => (
          <Link
            key={`${project.slug}-${index}`}
            href={`/works/${project.slug}`}
            className="relative shrink-0 w-[320px] md:w-[400px] aspect-[3/4] bg-canvas-alt border border-line overflow-hidden group"
            draggable={false}
            onClick={(e) => { if (Math.abs(positionRef.current) > 5) e.preventDefault(); }}
          >
            {project.heroImage ? (
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="400px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-canvas-alt" />
            )}

            <div className="absolute inset-0 bg-canvas-dark opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="label text-ink-light opacity-70 mb-2">
                ({project.services[0]?.toUpperCase()})
              </p>
              <h3 className="font-sora text-h3 text-ink-light mb-1">{project.title}</h3>
              <p className="label text-ink-light opacity-70">{project.brand}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}