import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Send, ShieldCheck, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pedido-a-medida")({
  head: () => ({
    meta: [
      { title: "Pide tu diseño a medida — PersonaliCraft" },
      {
        name: "description",
        content:
          "Solicita vasos de boda, playeras o etiquetas especiales: sube tu referencia, describe colores y tipografía y recibe tu cotización.",
      },
      { property: "og:title", content: "Cuéntanos tu idea: pedidos especiales a la medida" },
      {
        property: "og:description",
        content: "Bodas, celebraciones y eventos con muestra digital gratis antes de cortar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PedidoMedidaPage,
});

const tipos = ["Vaso / Termo / Copa", "Playera / Sudadera", "Etiqueta / Frasco", "Otro artículo"];

const pasosTaller = [
  { t: "Recibimos tu solicitud", d: "Revisamos indicaciones, colores de vinil y referencias visuales." },
  { t: "Propuesta y boceto digital", d: "Te enviamos una previsualización gráfica a escala, sin costo." },
  { t: "Apruebas y cortamos", d: "Cortamos con navaja de alta precisión y preparamos el transfer." },
  { t: "Enviamos a tu puerta", d: "Empaque artesanal protegido con guía de pegado paso a paso." },
];

function PedidoMedidaPage() {
  const [tipo, setTipo] = useState(tipos[0]!);
  const [archivo, setArchivo] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState(12);
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        to="/categoria/$slug"
        params={{ slug: "pedido-a-medida" }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Volver a Pedidos Personalizados
      </Link>

      <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-blush-soft px-3 py-1 text-xs uppercase tracking-wider text-secondary-foreground">
        Taller artesanal personalizado
      </span>
      <h1 className="mt-4 max-w-2xl text-3xl font-semibold text-foreground sm:text-4xl">
        Cuéntanos tu idea: creamos tu pedido especial a la medida
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Bodas, celebraciones, recuerdos familiares o eventos corporativos. Sin mínimos forzosos, con
        asesoría personal y muestra digital previa antes de cortar.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <form
          className="rounded-3xl border border-border bg-card p-6 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
        >
          <Field paso={1} titulo="Tipo de producto o soporte">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {tipos.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  className={cn(
                    "rounded-2xl border px-3 py-4 text-xs transition-colors",
                    t === tipo
                      ? "border-primary bg-blush-soft text-secondary-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-blush-soft/60",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>

          <Field paso={2} titulo="Adjunta imagen o boceto de referencia" hint="Opcional">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-blush-soft/50 px-6 py-8 text-center">
              <Upload className="size-5 text-primary" />
              <span className="mt-2 text-sm text-secondary-foreground">
                {archivo ?? "Haz clic para subir imagen"}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">PNG, JPG o PDF (máx. 25 MB)</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="sr-only"
                onChange={(e) => setArchivo(e.target.files?.[0]?.name ?? null)}
              />
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                <Upload className="size-3.5" /> Subir imagen
              </span>
            </label>
          </Field>

          <Field paso={3} titulo="Color o acabado del vinil deseado">
            <textarea
              rows={3}
              placeholder="Ej. Dos colores: rose gold para el nombre y blanco mate para la fecha…"
              className="w-full rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field paso={4} titulo="Tipografía o estilo de letras">
            <textarea
              rows={2}
              placeholder="Ej. Caligrafía romántica para los nombres, sans serif delgada para la fecha…"
              className="w-full rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field paso={5} titulo="Cantidad de piezas" hint="Sin mínimos exigidos">
            <input
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Number(e.target.value) || 1))}
              className="w-32 rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field paso={6} titulo="Notas adicionales" hint="Opcional">
            <textarea
              rows={4}
              placeholder="Ej. 'Son 15 termos para las damas de honor de mi boda, con el nombre en caligrafía…'"
              className="w-full rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-xs text-muted-foreground">
              Nombre y apellido *
              <input
                required
                placeholder="Tu nombre"
                className="mt-1.5 w-full rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block text-xs text-muted-foreground">
              WhatsApp o teléfono *
              <input
                required
                placeholder="+52 55 1234 5678"
                className="mt-1.5 w-full rounded-2xl border border-input bg-blush-soft/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <Send className="size-4" /> Enviar solicitud
          </button>

          {enviado ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-blush-soft px-4 py-3 text-sm text-secondary-foreground">
              <CheckCircle2 className="size-4 text-primary" /> ¡Solicitud registrada! Te contactaremos con
              tu boceto en menos de 24 horas.
            </p>
          ) : null}

          <p className="mt-4 text-xs text-muted-foreground">
            Tus datos son confidenciales y solo se usan para enviarte tu propuesta de diseño. Producto
            seleccionado: {tipo}.
          </p>
        </form>

        <aside className="grid content-start gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground">¿Cómo trabajamos tu pedido especial?</h2>
            <ol className="mt-4 grid gap-4">
              {pasosTaller.map((p, i) => (
                <li key={p.t} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blush-soft text-[11px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-secondary-foreground">{p.t}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{p.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex gap-3 rounded-3xl bg-blush-soft/70 p-6">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-sm text-secondary-foreground">
              Garantía sin compromiso
              <span className="mt-1 block text-xs text-muted-foreground">
                No pagarás nada hasta que apruebes el boceto digital definitivo de tu pedido.
              </span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
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
    <div className="mt-6 first:mt-0">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          {paso}
        </span>
        <h2 className="text-sm font-semibold text-secondary-foreground">{titulo}</h2>
        {hint ? <span className="ml-auto text-[11px] text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
