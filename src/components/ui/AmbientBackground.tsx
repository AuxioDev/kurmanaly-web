export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-surface dark:bg-surface" />
      <div className="absolute inset-0 bg-ambient-radial opacity-100 dark:opacity-100" />
      <div className="absolute inset-0 bg-ambient-corner" />
      <div
        className="absolute -left-1/4 top-1/3 h-[50vh] w-[70vw] rounded-full blur-[120px]"
        style={{ background: "rgba(92, 10, 26, 0.35)" }}
      />
      <div
        className="absolute -right-1/4 bottom-0 h-[45vh] w-[60vw] rounded-full blur-[100px]"
        style={{ background: "rgba(91, 44, 143, 0.28)" }}
      />
      <div
        className="absolute left-1/2 top-2/3 h-[30vh] w-[40vw] -translate-x-1/2 rounded-full blur-[90px]"
        style={{ background: "rgba(139, 46, 107, 0.22)" }}
      />
    </div>
  );
}
