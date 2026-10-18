import { notFound } from "next/navigation";

/** Любой неизвестный адрес внутри языка показывает локализованную 404 в общем layout. */
export default function CatchAll() {
  notFound();
}
