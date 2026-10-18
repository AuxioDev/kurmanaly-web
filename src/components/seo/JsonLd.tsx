/** Встраивает структурированные данные schema.org (JSON-LD) в страницу. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" экранируем, чтобы данные не могли закрыть тег <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
