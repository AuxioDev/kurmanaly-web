/** Глобальная 404 для адресов вне языковых сегментов (например, неизвестный язык). */
export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body className="flex min-h-screen items-center justify-center bg-canvas px-4 text-center font-sans text-fg">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-orange">404</p>
          <h1 className="mt-3 font-display text-5xl">Страница не найдена / Page not found</h1>
          <a
            href="/"
            className="mt-8 inline-flex min-h-11 items-center justify-center border border-red-deep bg-red-deep px-7 text-sm font-medium text-white"
          >
            kurmanaly.com
          </a>
        </div>
      </body>
    </html>
  );
}
