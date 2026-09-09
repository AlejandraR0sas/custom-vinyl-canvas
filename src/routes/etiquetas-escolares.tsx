import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Droplets,
  HelpCircle,
  Hourglass,
  Minus,
  PenLine,
  Plus,
  Ruler,
  ShoppingBag,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import {
  complementos,
  estilosTipograficos,
  faqs,
  formatosEtiqueta,
  medidas,
  paquetes,
  pasosAplicacion,
  tematicas,
  tonosVinil,
} from "@/data/etiquetas";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/etiquetas-escolares")({
  head: () => ({
    meta: [
      { title: "Etiquetas Escolares Personalizadas — PersonaliCraft" },
      {
        name: "description",
        content:
          "Personaliza etiquetas escolares resistentes al agua: nombre, grado, ícono y paquete, con vista previa en tiempo real.",
      },
      { property: "og:title", content: "Kit de Etiquetas Escolares Resistentes al Agua" },
      {
        property: "og:description",
        content: "Nombre, grado, ícono y cantidad por paquete con vista previa en vivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EtiquetasPage,
});

function EtiquetasPage() {
  const [formato, setFormato] = useState(formatosEtiqueta[0]!);
  const [tono, setTono] = useState(tonosVinil[0]!);
  const [nombre, setNombre] = useState("Valentina Ramos");
  const [grado, setGrado] = useState("2º Primaria · Salón 12");
  const [estilo, setEstilo] = useState(estilosTipograficos[0]!);
  const [tematica, setTematica] = useState(tematicas[0]!);
  const [paquete, setPaquete] = useState(paquetes[1]!);
  const [extras, setExtras] = useState<string[]>([]);
  const [cantidad, setCantidad] = useState(1);

  const total = useMemo(() => {
    const extrasTotal = complementos
      .filter((c) => extras.includes(c.id))
      .reduce((s, c) => s + c.precio, 0);
    return (paquete.precio + extrasTotal) * cantidad;
  }, [paquete.precio, extras, cantidad]);

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="pb-28">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Link
          to="/categoria/$slug"
          params={{ slug: "etiquetas-escolares" }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Volver a Etiquetas Escolares
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1fr] lg:py-10">
        {/* Vista previa */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-secondary-foreground">
                <PenLine className="size-4 text-primary" /> Vista Previa Artesanal en Vivo
              </span>
              <span className="rounded-full bg-blush-soft px-3 py-1 text-[11px] text-secondary-foreground">
                Render 1:1 Escala Real
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {formatosEtiqueta.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormato(f)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs transition-colors",
                    f.id === formato.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-secondary-foreground hover:bg-blush-soft",
                  )}
                >
                  {f.nombre} ({f.medida})
                </button>
              ))}
            </div>

            <div className="mt-4 flex min-h-64 items-center justify-center rounded-2xl bg-blush-soft/70 p-8">
              <div
                className="flex w-full max-w-xs items-center gap-3 rounded-2xl border border-border/70 px-5 py-4 shadow-card"
                style={{ backgroundColor: tono.hex }}
              >
                <span className="text-2xl leading-none">{tematica.emoji}</span>
                <span className="min-w-0">
                  <span
                    className="block truncate text-lg text-[#4A2B31]"
                    style={{ fontFamily: estilo.family }}
                  >
                    {nombre || "Tu nombre"}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-[#7B5B60]">
                    {grado || "Grado escolar"}
                  </span>
                </span>
                <Sparkles className="ml-auto size-4 shrink-0 text-[#7B5B60]" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 rounded-full bg-card px-4 py-2 text-xs text-muted-foreground">
              Tono de vinil:
              <span className="flex gap-2">
                {tonosVinil.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={t.nombre}
                    aria-pressed={t.id === tono.id}
                    onClick={() => setTono(t)}
                    className={cn(
                      "size-6 rounded-full border-2 transition-transform hover:-translate-y-0.5",
                      t.id === tono.id ? "border-primary" : "border-border",
                    )}
                    style={{ backgroundColor: t.hex }}
                  />
                ))}
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-blush-soft/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Acabado premium · Sin burbujas
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Se adhieren perfectamente a loncheras texturizadas, botellas de agua fría, reglas y
                lápices. Resistentes a lavados continuos sin decoloración.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-secondary-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1">
                  <Droplets className="size-3.5 text-primary" /> 100% Lavables
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1">
                  <Check className="size-3.5 text-primary" /> Eco-Solvente No Tóxico
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Opciones */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Kit de Etiquetas Escolares Resistentes al Agua
          </h1>
          <div className="mt-3 flex items-baseline gap-3">
            <p className="text-3xl font-bold text-primary">${paquete.precio} MXN</p>
            {paquete.precioAnterior ? (
              <>
                <p className="text-sm text-muted-foreground line-through">
                  ${paquete.precioAnterior} MXN
                </p>
                <span className="rounded-full bg-blush-soft px-3 py-1 text-[11px] text-secondary-foreground">
                  Ahorras{" "}
                  {Math.round((1 - paquete.precio / paquete.precioAnterior) * 100)}%
                </span>
              </>
            ) : null}
          </div>

          <Card paso={1} titulo="Datos del Estudiante" hint="Paso 1 de 4">
            <label className="block text-xs text-muted-foreground">
              Nombre y Apellido del Niño(a)
              <input
                value={nombre}
                maxLength={24}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="mt-4 block text-xs text-muted-foreground">
              Grado Escolar / Grupo o Teléfono de Contacto
              <input
                value={grado}
                maxLength={32}
                onChange={(e) => setGrado(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <p className="mt-4 text-xs text-muted-foreground">Estilo Tipográfico Infantil</p>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              {estilosTipograficos.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setEstilo(e)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                    e.id === estilo.id
                      ? "border-primary bg-blush-soft text-secondary-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-blush-soft/60",
                  )}
                  style={{ fontFamily: e.family }}
                >
                  {e.nombre}
                </button>
              ))}
            </div>
          </Card>

          <Card paso={2} titulo="Elige la Temática o Ilustración" hint={`${tematicas.length} opciones`}>
            <div className="grid grid-cols-4 gap-3">
              {tematicas.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTematica(t)}
                  className={cn(
                    "rounded-2xl border px-2 py-3 text-center transition-colors",
                    t.id === tematica.id
                      ? "border-primary bg-blush-soft"
                      : "border-border bg-card hover:bg-blush-soft/60",
                  )}
                >
                  <span className="block text-xl leading-none">{t.emoji}</span>
                  <span className="mt-1.5 block text-[11px] text-muted-foreground">{t.nombre}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card paso={3} titulo="Tamaño del Paquete" hint="Más Popular">
            <div className="grid gap-3">
              {paquetes.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaquete(p)}
                  className={cn(
                    "flex gap-3 rounded-2xl border p-4 text-left transition-colors",
                    p.id === paquete.id
                      ? "border-primary bg-blush-soft/70"
                      : "border-border bg-card hover:bg-blush-soft/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-1 size-4 shrink-0 rounded-full border-2",
                      p.id === paquete.id ? "border-primary bg-primary" : "border-border",
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-secondary-foreground">
                      {p.nombre}
                      {p.recomendado ? (
                        <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase text-primary-foreground">
                          Recomendado
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{p.detalle}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-sm font-semibold text-primary">${p.precio} MXN</span>
                    {p.precioAnterior ? (
                      <span className="block text-xs text-muted-foreground line-through">
                        ${p.precioAnterior}
                      </span>
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card paso={4} titulo="Complementos Adicionales" hint="Opcional">
            <div className="grid gap-3">
              {complementos.map((c) => (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-blush-soft/40"
                >
                  <input
                    type="checkbox"
                    checked={extras.includes(c.id)}
                    onChange={() => toggleExtra(c.id)}
                    className="size-4 accent-[#B4566B]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-secondary-foreground">{c.nombre}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{c.detalle}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-primary">+${c.precio} MXN</span>
                </label>
              ))}
            </div>
          </Card>

          <div className="mt-6 flex items-start gap-3 rounded-3xl bg-blush-soft/70 p-5">
            <Hourglass className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-sm text-secondary-foreground">
              <span className="font-semibold">Fabricación Artesanal en 24 a 48 Horas Hábiles</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                Revisamos cada trazo e impresión con cariño en nuestro taller antes de empacar.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-3">
        <InfoCard icon={Ruler} titulo="Desglose de Medidas">
          <p className="text-xs text-muted-foreground">
            Diseñadas al milímetro para el material escolar real:
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            {medidas.map((m) => (
              <li
                key={m.uso}
                className="flex justify-between gap-3 rounded-xl bg-blush-soft/60 px-3 py-2 text-secondary-foreground"
              >
                <span>{m.uso}</span>
                <span className="font-medium text-primary">{m.medida}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard icon={ThumbsUp} titulo="Guía de Aplicación Perfecta">
          <p className="text-xs text-muted-foreground">
            Garantiza una vida útil de años siguiendo estos 3 pasos:
          </p>
          <ol className="mt-3 grid gap-3 text-sm text-muted-foreground">
            {pasosAplicacion.map((p, i) => (
              <li key={p} className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blush-soft text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </InfoCard>

        <InfoCard icon={HelpCircle} titulo="Preguntas Frecuentes">
          <div className="grid gap-4">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-sm font-medium text-secondary-foreground">{f.q}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Barra fija */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-secondary-foreground">{paquete.nombre}</p>
            <p className="truncate text-xs text-muted-foreground">
              Para: {nombre || "—"} · {grado || "—"} · {tematica.nombre}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1.5">
            <button
              type="button"
              aria-label="Quitar uno"
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              className="rounded-full p-1 text-secondary-foreground hover:bg-blush-soft"
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-6 text-center text-sm font-medium">{cantidad}</span>
            <button
              type="button"
              aria-label="Agregar uno"
              onClick={() => setCantidad((c) => Math.min(20, c + 1))}
              className="rounded-full p-1 text-secondary-foreground hover:bg-blush-soft"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Total estimado
            </p>
            <p className="text-xl font-bold text-primary">${total} MXN</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="size-4" /> Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({
  paso,
  titulo,
  hint,
  children,
}: {
  paso: number;
  titulo: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          {paso}
        </span>
        <h2 className="text-sm font-semibold text-secondary-foreground">{titulo}</h2>
        {hint ? <span className="ml-auto text-[11px] text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </section>
  );
}

function InfoCard({
  icon: Icon,
  titulo,
  children,
}: {
  icon: typeof Ruler;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <span className="flex size-9 items-center justify-center rounded-xl bg-blush-soft text-primary">
        <Icon className="size-4" />
      </span>
      <h2 className="mt-4 text-base font-semibold text-foreground">{titulo}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
