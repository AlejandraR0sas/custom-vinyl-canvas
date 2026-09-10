import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Coffee, Frame, PanelTop, Shapes, ShoppingBag, Sparkles } from "lucide-react";
import vaso from "@/assets/prod-vaso.jpg";
import { tiposLetra } from "@/data/productos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vinil-decorativo")({
  head: () => ({
    meta: [
      { title: "Personaliza tu Vinil Decorativo — PersonaliCraft" },
      {
        name: "description",
        content:
          "Diseña vinil decorativo para vasos, tazas, espejos y paredes: elige superficie, texto, color y tamaño con vista previa en vivo.",
      },
      { property: "og:title", content: "Vinil Decorativo Personalizado" },
      {
        property: "og:description",
        content: "Vasos, tazas, espejos y paredes con tu frase en vinil premium.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VinilDecorativoPage,
});

const superficies = [
  { id: "vaso", nombre: "Vaso / Taza", icon: Coffee, base: 320, detalle: "Vidrio, acrílico o cerámica" },
  { id: "espejo", nombre: "Espejo", icon: Frame, base: 290, detalle: "Frases y siluetas para tocador" },
  { id: "pared", nombre: "Pared / Ventana", icon: PanelTop, base: 420, detalle: "Murales y letreros de evento" },
  { id: "otro", nombre: "Otro", icon: Shapes, base: 260, detalle: "Cajas, laptops, cristales" },
];

const colores = [
  { id: "rose-gold", nombre: "Rosa dorado", hex: "#C9899B" },
  { id: "blanco", nombre: "Blanco nieve", hex: "#FFFFFF" },
  { id: "negro", nombre: "Negro carbón", hex: "#1E1B1A" },
  { id: "dorado", nombre: "Dorado espejo", hex: "#C9A227" },
];

const tamanos = [
  { id: "chico", nombre: "Chico", medida: "6 cm", escala: 0.7, extra: 0 },
  { id: "mediano", nombre: "Mediano", medida: "12 cm", escala: 1, extra: 40 },
  { id: "grande", nombre: "Grande", medida: "20 cm", escala: 1.35, extra: 85 },
];

function VinilDecorativoPage() {
  const [superficie, setSuperficie] = useState(superficies[0]!);
  const [texto, setTexto] = useState("Mariana");
  const [color, setColor] = useState(colores[0]!);
  const [letra, setLetra] = useState(tiposLetra[0]!);
  const [tamano, setTamano] = useState(tamanos[1]!);

  const total = useMemo(() => superficie.base + tamano.extra, [superficie.base, tamano.extra]);

  return (
    <div className="pb-28">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Link
          to="/categoria/$slug"
          params={{ slug: "vinil-decorativo" }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Volver a Vinil Decorativo
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2">
        {/* Vista previa */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-secondary-foreground">
              <Sparkles className="size-4 text-primary" /> Vista previa en vivo
            </span>
            <div className="relative mt-4 overflow-hidden rounded-2xl bg-blush-soft/60">
              <img
                src={vaso}
                alt={`Vista previa de ${superficie.nombre} con vinil decorativo`}
                width={1024}
                height={1024}
                className="aspect-square w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-10">
                <span
                  className="max-w-full truncate text-center drop-shadow-sm"
                  style={{
                    color: color.hex,
                    fontFamily: letra.family,
                    fontSize: `${2.1 * tamano.escala}rem`,
                    lineHeight: 1.2,
                  }}
                >
                  {texto || "Tu frase"}
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {superficie.nombre} · {color.nombre} · {tamano.nombre} ({tamano.medida})
            </p>
          </div>
        </div>

        {/* Opciones */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Vinil Decorativo Personalizado
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Corte fino en vinil permanente para vasos, tazas, espejos, ventanas y superficies decorativas.
          </p>
          <p className="mt-3 text-3xl font-bold text-primary">${total} MXN</p>

          <Section paso={1} titulo="Tipo de superficie">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {superficies.map(({ id, nombre, icon: Icon, detalle }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSuperficie(superficies.find((s) => s.id === id)!)}
                  className={cn(
                    "rounded-2xl border p-3 text-center transition-colors",
                    id === superficie.id
                      ? "border-primary bg-blush-soft"
                      : "border-border bg-card hover:bg-blush-soft/60",
                  )}
                >
                  <Icon className="mx-auto size-5 text-primary" />
                  <span className="mt-2 block text-xs font-medium text-secondary-foreground">{nombre}</span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">{detalle}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section paso={2} titulo="Nombre o frase personalizada">
            <input
              value={texto}
              maxLength={22}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ej. Mariana · Bride to Be"
              className="w-full rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="mt-4 text-xs text-muted-foreground">Tipografía</p>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              {tiposLetra.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setLetra(t)}
                  style={{ fontFamily: t.family }}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                    t.id === letra.id
                      ? "border-primary bg-blush-soft text-secondary-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-blush-soft/60",
                  )}
                >
                  {t.nombre}
                </button>
              ))}
            </div>
          </Section>

          <Section paso={3} titulo="Color de vinil">
            <div className="flex flex-wrap items-center gap-4">
              {colores.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={c.nombre}
                  aria-pressed={c.id === color.id}
                  onClick={() => setColor(c)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span
                    className={cn(
                      "size-9 rounded-full border-2 transition-transform hover:-translate-y-0.5",
                      c.id === color.id ? "border-primary" : "border-border",
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[11px] text-muted-foreground">{c.nombre}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section paso={4} titulo="Tamaño del diseño">
            <div className="grid grid-cols-3 gap-3">
              {tamanos.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTamano(t)}
                  className={cn(
                    "rounded-2xl border p-4 text-center transition-colors",
                    t.id === tamano.id
                      ? "border-primary bg-blush-soft"
                      : "border-border bg-card hover:bg-blush-soft/60",
                  )}
                >
                  <span className="block text-sm font-medium text-secondary-foreground">{t.nombre}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{t.medida}</span>
                  <span className="mt-1 block text-[11px] text-primary">
                    {t.extra ? `+$${t.extra}` : "Incluido"}
                  </span>
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-secondary-foreground">{superficie.nombre}</p>
            <p className="truncate text-xs text-muted-foreground">
              “{texto || "—"}” · {color.nombre} · {tamano.nombre}
            </p>
          </div>
          <p className="ml-auto text-xl font-bold text-primary">${total} MXN</p>
          <Link
            to="/carrito"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="size-4" /> Agregar al Carrito
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  paso,
  titulo,
  children,
}: {
  paso: number;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          {paso}
        </span>
        <h2 className="text-sm font-semibold text-secondary-foreground">{titulo}</h2>
      </div>
      {children}
    </section>
  );
}
