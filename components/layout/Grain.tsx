/** Grano de película sobre todo el sitio. CSS puro, sin JS y sin imagen. */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay pointer-events-none fixed -inset-[120%] z-[65] opacity-[0.045]"
    />
  );
}
