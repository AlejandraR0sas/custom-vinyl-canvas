import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Gift, Leaf, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Carrito de Creaciones — PersonaliCraft" },
      {
        name: "description",
        content:
          "Revisa tus productos personalizados, detalles de vinil y total antes de proceder al pago en PersonaliCraft.",
      },
      { property: "og:title", content: "Tu Carrito de Creaciones Artesanales" },
      {
        property: "og:description",
        content: "Vinil textil, decorativo, etiquetas escolares y solicitudes a medida en un solo lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarritoPage,
});

type Item = {
  id: string;
  tipo: string;
  nombre: string;
  detalles: string[];
  precio: number | null;
  estatus?: string;
  cantidad: number;
};

const items: Item[] = [
  {
    id: "1",
    tipo: "Vinil Textil",
    nombre: "Sudadera Cuello Redondo Orgánica",
    detalles: [
      'Frase: “Wildflower Soul” · Tipografía Serif Romántica',
      "Talla M · Color tela: Crema Marfil · Vinil Rose Gold",
    ],
    precio: 480,
    cantidad: 1,
  },
  {
    id: "2",
    tipo: "Etiquetas Escolares",
    nombre: "Kit Escolar Completo Estrella (112 pzs)",
    detalles: [
      "Valentina Ramos · 2º Primaria · Salón 12",
      "Temática Arcoíris · +20 termo-adhesivas incluidas",
    ],
    precio: 495,
    cantidad: 1,
  },
  {
    id: "3",
    tipo: "Vinil Decorativo",
    nombre: "Vaso de Vidrio con Tapa de Bambú",
    detalles: ['Diseño “Wellness Journey” · Vinil Blanco Nieve Mate', "Incluye popote y funda de lino"],
    precio: 320,
    cantidad: 2,
  },
  {
    id: "4",
    tipo: "Solicitud a Medida",
    nombre: "15 Copas de Cristal para Despedida",
    detalles: ["1 copa “Bride to Be” + 14 con nombres", "Foil tornasol iridiscente + Rose Gold"],
    precio: null,
    estatus: "En cotización",
    cantidad: 1,
  },
];

function CarritoPage() {
  const subtotal = items.reduce((s, i) => s + (i.precio ?? 0) * i.cantidad, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Seguir explorando diseños
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-foreground sm:text-4xl">
        Tu Carrito de Creaciones Artesanales
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Revisa cada detalle, tipografía y corte personalizado antes de enviar tus piezas al taller.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-3xl border border-border bg-card p-4 shadow-card"
            >
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-blush-soft text-[10px] font-medium uppercase tracking-wider text-secondary-foreground">
                {item.tipo.split(" ")[0]}
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-blush-soft px-3 py-1 text-[11px] text-secondary-foreground">
                  {item.tipo}
                </span>
                <h2 className="mt-2 text-base font-semibold text-foreground">{item.nombre}</h2>
                <ul className="mt-2 grid gap-1 text-xs text-muted-foreground">
                  {item.detalles.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">Cantidad: {item.cantidad}</p>
              </div>
              <div className="shrink-0 text-right">
                {item.precio === null ? (
                  <span className="rounded-full bg-blush-soft px-3 py-1 text-[11px] text-secondary-foreground">
                    {item.estatus}
                  </span>
                ) : (
                  <p className="text-sm font-semibold text-primary">
                    ${item.precio * item.cantidad} MXN
                  </p>
                )}
              </div>
            </article>
          ))}

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Garantía de adherencia", d: "Máxima fijación resistente a lavados." },
              { icon: Leaf, t: "Empaque kraft ecológico", d: "Cajas rígidas con viruta biodegradable." },
              { icon: Gift, t: "Revisión humana", d: "Revisamos ortografía y vectores antes de cortar." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl bg-blush-soft/60 p-4">
                <Icon className="size-4 text-primary" />
                <p className="mt-2 text-sm font-medium text-secondary-foreground">{t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground">Resumen de tu Pedido</h2>
            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal ({items.filter((i) => i.precio !== null).length} artículos listos)</dt>
                <dd className="text-secondary-foreground">${subtotal} MXN</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Envío nacional</dt>
                <dd className="text-primary">Gratis</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Solicitud a medida</dt>
                <dd>Por cotizar</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-medium text-secondary-foreground">Total a pagar hoy</span>
              <span className="text-2xl font-bold text-primary">${subtotal} MXN</span>
            </div>
            <Link
              to="/pedido/$id"
              params={{ id: "PC-84920" }}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Lock className="size-4" /> Proceder al Pago <ArrowRight className="size-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pago cifrado · Puedes seguir agregando personalizaciones
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
