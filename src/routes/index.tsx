import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Droplets, Heart, MapPin, PenLine, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/hero-taller.jpg";
import { categorias } from "@/data/categorias";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PersonaliCraft — Vinil textil, decorativo y etiquetas" },
      {
        name: "description",
        content:
          "Personalización de alta calidad en vinil textil, vinil decorativo y etiquetas escolares resistentes al agua. Hecho a mano en nuestro taller.",
      },
      { property: "og:title", content: "PersonaliCraft — Tus ideas, hechas realidad con amor y vinil" },
      {
        property: "og:description",
        content: "Vinil textil, vinil decorativo, etiquetas escolares y pedidos a medida.",
      },
    ],
  }),
  component: Index,
});

const beneficios = [
  { icon: Sparkles, label: "Acabados premium" },
  { icon: MapPin, label: "Envíos a todo el país" },
  { icon: Droplets, label: "100% resistentes" },
  { icon: Heart, label: "Atención cercana" },
];

function Index() {
  return (
    <>
      <section className="bg-blush-soft/70">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground shadow-card">
              <Heart className="size-3.5" /> Detalles hechos con amor y precisión
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] text-foreground sm:text-6xl">
              Tus ideas, hechas
              <br />
              <span className="text-primary">realidad con amor</span> &amp; vinil.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Personalización de alta calidad en vinil textil, vinil decorativo y etiquetas
              escolares resistentes al agua. Cada pieza se confecciona a mano en nuestro taller.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/categoria/$slug"
                params={{ slug: "vinil-textil" }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Explorar catálogo <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/categoria/$slug"
                params={{ slug: "pedido-a-medida" }}
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-ring bg-card px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-blush-soft"
              >
                <PenLine className="size-4" /> Cotizar a medida
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-3">
              {beneficios.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-medium text-secondary-foreground"
                >
                  <Icon className="size-4 text-primary" /> {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-3 shadow-soft">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={heroImg}
                alt="Taller creativo artesanal con máquina de corte y rollos de vinil pastel"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs text-secondary-foreground">
                Taller creativo artesanal
              </span>
              <span className="absolute bottom-3 right-3 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                Corte a milímetro
              </span>
            </div>
            <div className="flex items-center gap-3 px-3 py-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-blush text-secondary-foreground">
                <Star className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">+2,400 proyectos</p>
                <p className="text-xs text-muted-foreground">Entregados con 5 estrellas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Descubre nuestras creaciones
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Colecciones destacadas
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Materiales seleccionados que resisten el paso del tiempo, lavados continuos y el uso
            cotidiano sin perder color ni adherencia.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-card transition-transform hover:-translate-y-1"
            >
              {c.imagen ? (
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={c.imagen}
                    alt={c.nombre}
                    width={800}
                    height={800}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-medium text-secondary-foreground">
                    {c.tagline}
                  </span>
                </div>
              ) : (
                <div className="relative flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl bg-blush-soft text-center">
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground">
                    {c.tagline}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <PenLine className="size-5" />
                  </span>
                  <p className="font-display text-lg font-semibold text-primary">
                    ¿Tienes un boceto?
                  </p>
                  <p className="text-xs text-muted-foreground">Sin mínimos de compra</p>
                </div>
              )}
              <div className="px-2 pb-2 pt-4">
                <h3 className="text-base font-semibold text-foreground">{c.nombre}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {c.descripcion}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Ver más <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
