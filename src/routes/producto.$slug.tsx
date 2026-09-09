import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Droplets, Heart, ShoppingBag, Sparkles, Star } from "lucide-react";
import {
  coloresVinil,
  getProducto,
  tallas,
  tamanosDiseno,
  tiposLetra,
} from "@/data/productos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const producto = getProducto(params.slug);
    if (!producto) throw notFound();
    return { producto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Producto no disponible — PersonaliCraft" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { nombre, descripcion } = loaderData.producto;
    return {
      meta: [
        { title: `${nombre} — PersonaliCraft` },
        { name: "description", content: descripcion },
        { property: "og:title", content: `${nombre} — PersonaliCraft` },
        { property: "og:description", content: descripcion },
      ],
    };
  },
  component: ProductoPage,
});

function ProductoPage() {
  const { producto } = Route.useLoaderData();

  const [color, setColor] = useState(coloresVinil[0]!);
  const [fuente, setFuente] = useState(tiposLetra[0]!);
  const [tamano, setTamano] = useState(tamanosDiseno[1]!);
  const [texto, setTexto] = useState("Mi Nombre");
  const [talla, setTalla] = useState(tallas[1]!);
  const [agregado, setAgregado] = useState(false);

  const total = useMemo(() => producto.precio + tamano.extra, [producto.precio, tamano.extra]);

  return (
    <div className="pb-28">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Link
          to="/categoria/$slug"
          params={{ slug: producto.categoriaSlug }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Volver a Vinil Textil
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-12">
        {/* Vista previa */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-3 shadow-soft">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                width={1200}
                height={1200}
                className="aspect-square w-full object-cover"
              />

              {/* Diseño en vinil sobre la prenda */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-[18%]">
                <span
                  className="max-w-full break-words text-center leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]"
                  style={{
                    color: color.hex,
                    fontFamily: fuente.family,
                    fontSize: `${tamano.escala * 2.6}rem`,
                  }}
                >
                  {texto || "Tu texto aquí"}
                </span>
              </div>

              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-[11px] font-medium text-secondary-foreground">
                <Sparkles className="size-3.5" /> Vista previa en tiempo real
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 px-1 pb-1 pt-3 text-center text-[11px] text-muted-foreground">
              <span className="rounded-xl bg-blush-soft px-2 py-2">
                <Droplets className="mx-auto mb-1 size-4 text-primary" /> Lavable
              </span>
              <span className="rounded-xl bg-blush-soft px-2 py-2">
                <Heart className="mx-auto mb-1 size-4 text-primary" /> Hecho a mano
              </span>
              <span className="rounded-xl bg-blush-soft px-2 py-2">
                <Star className="mx-auto mb-1 size-4 text-primary" /> Vinil premium
              </span>
            </div>
          </div>
        </div>

        {/* Opciones */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blush-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            Vinil Textil
          </span>
          <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            {producto.nombre}
          </h1>
          <div className="mt-3 flex items-baseline gap-3">
            <p className="text-3xl font-bold text-primary">${total} MXN</p>
            {producto.precioAnterior ? (
              <p className="text-sm text-muted-foreground line-through">
                ${producto.precioAnterior} MXN
              </p>
            ) : null}
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {producto.descripcion}
          </p>

          <Bloque titulo="1. Color de vinil" hint={color.nombre}>
            <div className="flex flex-wrap gap-3">
              {coloresVinil.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={c.nombre}
                  aria-pressed={c.id === color.id}
                  onClick={() => setColor(c)}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border-2 transition-transform hover:-translate-y-0.5",
                    c.id === color.id ? "border-primary" : "border-border",
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {c.id === color.id ? (
                    <Check
                      className="size-4"
                      style={{ color: c.id === "blanco" || c.id === "dorado" ? "#1E1B1A" : "#fff" }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </Bloque>

          <Bloque titulo="2. Tipo de letra" hint={fuente.nombre}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {tiposLetra.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFuente(f)}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-center transition-colors",
                    f.id === fuente.id
                      ? "border-primary bg-blush-soft"
                      : "border-border bg-card hover:bg-blush-soft/60",
                  )}
                >
                  <span
                    className="block truncate text-lg text-secondary-foreground"
                    style={{ fontFamily: f.family }}
                  >
                    Abc
                  </span>
                  <span className="mt-1 block text-[11px] text-muted-foreground">{f.nombre}</span>
                </button>
              ))}
            </div>
          </Bloque>

          <Bloque titulo="3. Texto personalizado" hint={`${texto.length}/20`}>
            <input
              value={texto}
              maxLength={20}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe tu nombre o frase"
              className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </Bloque>

          <Bloque titulo="4. Tamaño del diseño" hint={tamano.medida}>
            <div className="grid grid-cols-3 gap-3">
              {tamanosDiseno.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTamano(t)}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-center transition-colors",
                    t.id === tamano.id
                      ? "border-primary bg-blush-soft"
                      : "border-border bg-card hover:bg-blush-soft/60",
                  )}
                >
                  <span className="block text-sm font-medium text-secondary-foreground">
                    {t.nombre}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">
                    {t.medida}
                    {t.extra ? ` · +$${t.extra}` : ""}
                  </span>
                </button>
              ))}
            </div>
          </Bloque>

          <Bloque titulo="5. Talla de la prenda" hint={talla}>
            <div className="flex flex-wrap gap-2">
              {tallas.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTalla(t)}
                  className={cn(
                    "min-w-12 rounded-full border px-4 py-2 text-sm transition-colors",
                    t === talla
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-secondary-foreground hover:bg-blush-soft",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </Bloque>

          <ul className="mt-8 grid gap-2 rounded-3xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-card">
            {producto.detalles.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Barra fija */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-xs text-muted-foreground">
              {fuente.nombre} · {color.nombre} · {tamano.nombre} · Talla {talla}
            </p>
            <p className="text-lg font-semibold text-primary">${total} MXN</p>
          </div>
          <button
            type="button"
            onClick={() => setAgregado(true)}
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="size-4" />
            {agregado ? "Agregado" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Bloque({
  titulo,
  hint,
  children,
}: {
  titulo: string;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-foreground">
          {titulo}
        </h2>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </section>
  );
}
