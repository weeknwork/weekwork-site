// app/studio/layout.tsx
// Bare layout for the Studio — no nav, no footer, full viewport.

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}