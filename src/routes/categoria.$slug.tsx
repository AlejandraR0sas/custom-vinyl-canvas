import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { getCategoria } from "@/data/categorias";
import { productos } from "@/data/productos";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const categoria = getCategoria(params.slug);
    if (!categoria) throw notFound();
    return { categoria };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Categoría no disponible — PersonaliCraft" }, { name: "robots", content: "noindex" }],
      };
    }
    const { nombre, descripcion } = loaderData.categoria;
    return {
      meta: [
        { title: `${nombre} — PersonaliCraft` },
        { name: "description", content: descripcion },
        { property: "og:title", content: `${nombre} — PersonaliCraft` },
        { property: "og:description", content: descripcion },
      ],
    };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { categoria } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Volver al inicio
      </Link>

      <div className="mt-8 rounded-3xl border border-border bg-card p-10 shadow-card sm:p-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-blush-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
          <Sparkles className="size-3.5" /> {categoria.tagline}
        </span>
        <h1 className="mt-5 text-4xl font-semibold text-primary sm:text-5xl">{categoria.nombre}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{categoria.descripcion}</p>
        <p className="mt-10 font-display text-2xl text-secondary-foreground">Próximamente</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Estamos preparando el catálogo y la personalización de esta categoría.
        </p>
      </div>
    </div>
  );
}
