import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Box, CalendarClock, CheckCircle2, PackageCheck, Scissors, Truck } from "lucide-react";

export const Route = createFileRoute("/pedido/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Seguimiento del pedido ${params.id} — PersonaliCraft` },
      {
        name: "description",
        content:
          "Sigue en tiempo real la confección artesanal de tu pedido: recibido, en producción, listo y enviado.",
      },
      { property: "og:title", content: "Seguimiento de tu pedido artesanal" },
      {
        property: "og:description",
        content: "Etapas del taller, fecha estimada de entrega y detalle de tus piezas personalizadas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SeguimientoPage,
});

const etapas = [
  {
    icon: CheckCircle2,
    titulo: "Pedido Recibido & Verificado",
    fecha: "20 Oct · 09:30 hrs",
    detalle: "Revisión humana de ortografía, vectores y corte de vinil aprobada por el maestro artesano.",
    estado: "hecho" as const,
  },
  {
    icon: Scissors,
    titulo: "En Producción en Taller",
    fecha: "Hoy · 11:15 hrs",
    detalle: "Corte de vinil a plotter milimétrico y termo-estampado a 160 °C sobre prendas y accesorios.",
    estado: "activo" as const,
  },
  {
    icon: Box,
    titulo: "Listo & Empaque Artesanal",
    fecha: "Programado: mañana",
    detalle: "Inspección final, papel tissue libre de ácido, viruta kraft y lacre de cera personalizado.",
    estado: "pendiente" as const,
  },
  {
    icon: Truck,
    titulo: "Enviado & En Ruta de Entrega",
    fecha: "24 de Octubre",
    detalle: "Entrega al transportista con guía protegida y alertas por WhatsApp.",
    estado: "pendiente" as const,
  },
];

const articulos = [
  { nombre: "Sudadera Orgánica Cuello Redondo", detalle: "Vinil Rose Gold · Talla M", precio: 590 },
  { nombre: "Kit Escolar Completo Estrella", detalle: "Valentina Ramos · 112 pzs", precio: 385.5 },
  { nombre: "Vaso de Vidrio c/ Tapa Bambú", detalle: "Vinil Blanco Mate · Inicial “V”", precio: 190 },
];

function SeguimientoPage() {
  const { id } = Route.useParams();
  const total = articulos.reduce((s, a) => s + a.precio, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        to="/carrito"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Volver al carrito
      </Link>

      <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-blush-soft px-3 py-1 text-xs text-secondary-foreground">
        Taller activo · Hecho a mano · Pedido #{id}
      </span>
      <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
        ¡Tu pedido está en manos expertas!
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Sigue la confección, el corte milimétrico de vinil y la preparación de tus piezas artesanales.
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-blush-soft/60 p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-card text-primary">
            <CalendarClock className="size-5" />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Fecha estimada de entrega
            </p>
            <p className="text-xl font-semibold text-foreground">Jueves, 24 de Octubre</p>
            <p className="text-xs text-muted-foreground">Ventana preferencial: 10:00 AM – 4:00 PM</p>
          </div>
          <span className="ml-auto rounded-full bg-card px-4 py-2 text-xs font-medium text-primary">
            En producción
          </span>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progreso del taller: 52% completado</span>
            <span>Siguiente: inspección y empaque</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-card">
            <div className="h-full w-[52%] rounded-full bg-primary" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground">Etapas del Pedido</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Transparencia artesanal desde el trazo hasta tu puerta.
          </p>
          <ol className="mt-6 grid gap-6">
            {etapas.map(({ icon: Icon, titulo, fecha, detalle, estado }, i) => (
              <li key={titulo} className="relative flex gap-4 pb-1">
                {i < etapas.length - 1 ? (
                  <span className="absolute left-5 top-11 h-full w-px bg-border" aria-hidden />
                ) : null}
                <span
                  className={
                    estado === "pendiente"
                      ? "z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground"
                      : estado === "activo"
                        ? "z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                        : "z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-blush-soft text-primary"
                  }
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-secondary-foreground">{titulo}</h3>
                    <span className="ml-auto text-[11px] text-muted-foreground">{fecha}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{detalle}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="grid content-start gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <PackageCheck className="size-5 text-primary" /> Artículos en este pedido
            </h2>
            <ul className="mt-4 grid gap-4">
              {articulos.map((a) => (
                <li key={a.nombre} className="flex gap-3">
                  <span className="size-12 shrink-0 rounded-xl bg-blush-soft" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-secondary-foreground">{a.nombre}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{a.detalle}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-primary">
                    ${a.precio.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm">
              <span className="font-medium text-secondary-foreground">Total pagado</span>
              <span className="font-bold text-primary">${total.toFixed(2)} MXN</span>
            </div>
          </div>

          <div className="rounded-3xl bg-blush-soft/70 p-6">
            <h2 className="text-sm font-semibold text-secondary-foreground">¿Dudas con tu diseño?</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Si necesitas ajustar el color de vinil o añadir una dedicatoria antes del empaque, escríbenos.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Respuesta habitual: menos de 5 minutos · Lun-Sáb 9:00 – 18:00 hrs
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
