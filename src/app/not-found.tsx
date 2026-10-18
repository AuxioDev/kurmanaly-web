import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center sm:py-32">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-3 text-5xl sm:text-7xl">Страница не найдена</h1>
      <p className="mx-auto mt-5 max-w-md leading-relaxed text-fg-soft">
        Возможно, ссылка устарела. Вернитесь на главную или посмотрите проекты.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">На главную</Link>
        <Link href="/projects" className="btn-outline">Проекты</Link>
      </div>
    </section>
  );
}
