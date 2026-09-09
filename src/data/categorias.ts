import textil from "@/assets/cat-textil.jpg";
import decorativo from "@/assets/cat-decorativo.jpg";
import etiquetas from "@/assets/cat-etiquetas.jpg";

export type Categoria = {
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  imagen?: string;
};

export const categorias: Categoria[] = [
  {
    slug: "vinil-textil",
    nombre: "Vinil Textil",
    tagline: "Prendas & Accesorios",
    descripcion: "Playeras, tote bags y uniformes con acabado suave y duradero.",
    imagen: textil,
  },
  {
    slug: "vinil-decorativo",
    nombre: "Vinil Decorativo",
    tagline: "Hogar & Eventos",
    descripcion: "Tazas, vasos, cristales y detalles para tu casa o celebración.",
    imagen: decorativo,
  },
  {
    slug: "etiquetas-escolares",
    nombre: "Etiquetas Escolares",
    tagline: "Impermeables & Duraderas",
    descripcion: "Marca útiles, loncheras y termos sin que se despeguen.",
    imagen: etiquetas,
  },
  {
    slug: "pedido-a-medida",
    nombre: "Pide tu diseño a medida",
    tagline: "100% Personalizado",
    descripcion: "¿Tienes un boceto? Lo confeccionamos a mano, sin mínimos de compra.",
  },
];

export const getCategoria = (slug: string) => categorias.find((c) => c.slug === slug);
