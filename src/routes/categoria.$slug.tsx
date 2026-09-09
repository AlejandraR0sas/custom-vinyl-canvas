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
  const items = productos.filter((p) => p.categoriaSlug === categoria.slug);

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

        {items.length === 0 ? (
          <>
            <p className="mt-10 font-display text-2xl text-secondary-foreground">Próximamente</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Estamos preparando el catálogo y la personalización de esta categoría.
            </p>
          </>
        ) : null}
      </div>

      {items.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.slug}
              to="/producto/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-card transition-transform hover:-translate-y-1"
            >
              <img
                src={p.imagen}
                alt={p.nombre}
                width={1200}
                height={1200}
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="px-2 pb-2 pt-4">
                <h2 className="text-base font-semibold text-foreground">{p.nombre}</h2>
                <p className="mt-1 text-lg font-bold text-primary">${p.precio} MXN</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Personalizar{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
