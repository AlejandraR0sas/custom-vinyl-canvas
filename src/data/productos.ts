import sudadera from "@/assets/prod-sudadera.jpg";

export type Producto = {
  slug: string;
  nombre: string;
  categoriaSlug: string;
  precio: number;
  precioAnterior?: number;
  descripcion: string;
  imagen: string;
  detalles: string[];
};

export const coloresVinil = [
  { id: "rosa", nombre: "Rosa pastel", hex: "#E7A6B4" },
  { id: "vino", nombre: "Vino", hex: "#7B2C3B" },
  { id: "dorado", nombre: "Dorado", hex: "#C9A227" },
  { id: "blanco", nombre: "Blanco", hex: "#FFFFFF" },
  { id: "negro", nombre: "Negro", hex: "#1E1B1A" },
  { id: "cocoa", nombre: "Cocoa", hex: "#6B4A3A" },
];

export const tiposLetra = [
  { id: "script", nombre: "Script", family: "'Pacifico', cursive" },
  { id: "serif", nombre: "Elegante", family: "'Playfair Display', serif" },
  { id: "moderna", nombre: "Moderna", family: "'Outfit', sans-serif" },
  { id: "condensada", nombre: "Impacto", family: "'Bebas Neue', sans-serif" },
];

export const tamanosDiseno = [
  { id: "s", nombre: "Pequeño", medida: "12 cm", escala: 0.55, extra: 0 },
  { id: "m", nombre: "Mediano", medida: "20 cm", escala: 0.8, extra: 25 },
  { id: "l", nombre: "Grande", medida: "28 cm", escala: 1, extra: 45 },
];

export const tallas = ["CH", "M", "G", "XG", "2XG"];

export const productos: Producto[] = [
  {
    slug: "sudadera-vinil-textil",
    nombre: "Sudadera Artesanal en Vinil Textil Premium",
    categoriaSlug: "vinil-textil",
    precio: 180,
    precioAnterior: 240,
    descripcion:
      "Sudadera de algodón cepillado con tu diseño cortado y prensado a mano en vinil textil premium. Suave al tacto, resistente al lavado y sin agrietarse.",
    imagen: sudadera,
    detalles: [
      "Vinil termoadherible de grado profesional",
      "Resiste más de 50 lavadas sin perder color",
      "Tejido 320 g/m², interior afelpado",
      "Confección y prensado a mano en el taller",
    ],
  },
];

export const getProducto = (slug: string) => productos.find((p) => p.slug === slug);
