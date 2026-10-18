/** Плавное появление страницы при каждом переходе. Чистый CSS, не зависит от гидратации. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
