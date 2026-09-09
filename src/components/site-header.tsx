import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { categorias } from "@/data/categorias";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-blush text-secondary-foreground">
            <Heart className="size-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-primary">
            PersonaliCraft
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-blush-soft hover:text-secondary-foreground"
              activeProps={{ className: "bg-blush-soft text-secondary-foreground" }}
            >
              {c.nombre}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Ver carrito"
          className="ml-auto flex size-10 items-center justify-center rounded-full border border-border bg-card text-secondary-foreground transition-colors hover:bg-blush-soft"
        >
          <ShoppingBag className="size-5" />
        </button>
      </div>
    </header>
  );
}
