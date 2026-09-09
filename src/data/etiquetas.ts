export const tonosVinil = [
  { id: "rosa", nombre: "Rosa pastel", hex: "#E7A6B4" },
  { id: "crema", nombre: "Crema", hex: "#F2E6C9" },
  { id: "menta", nombre: "Menta", hex: "#CFE5DA" },
  { id: "cielo", nombre: "Cielo", hex: "#CBDCEC" },
  { id: "lila", nombre: "Lila", hex: "#DCD0EC" },
];

export const formatosEtiqueta = [
  { id: "rect", nombre: "Rectangular Multiusos", medida: "6x1.5 cm", ratio: "6 / 1.5" },
  { id: "circ", nombre: "Circular Termos", medida: "Ø 4 cm", ratio: "1 / 1" },
  { id: "mini", nombre: "Mini Lápiz", medida: "4x0.8 cm", ratio: "4 / 0.8" },
  { id: "tag", nombre: "Tag Mochila", medida: "7x3 cm", ratio: "7 / 3" },
];

export const estilosTipograficos = [
  { id: "dulce", nombre: "Dulce Sans", family: "'Outfit', sans-serif" },
  { id: "aventurera", nombre: "Aventurera", family: "'Bebas Neue', sans-serif" },
  { id: "caligrafia", nombre: "Caligrafía", family: "'Pacifico', cursive" },
  { id: "minimal", nombre: "Minimal Clean", family: "'DM Sans', sans-serif" },
];

export type Tematica = { id: string; nombre: string; emoji: string };

export const tematicas: Tematica[] = [
  { id: "arcoiris", nombre: "Arcoíris", emoji: "🌈" },
  { id: "dinosaurio", nombre: "Dinosaurio", emoji: "🦕" },
  { id: "osito", nombre: "Osito", emoji: "🧸" },
  { id: "cohete", nombre: "Cohete", emoji: "🚀" },
  { id: "florcita", nombre: "Florcita", emoji: "🌸" },
  { id: "carrito", nombre: "Carrito", emoji: "🚗" },
  { id: "unicornio", nombre: "Unicornio", emoji: "🦄" },
  { id: "estrella", nombre: "Estrella", emoji: "⭐" },
];

export const paquetes = [
  {
    id: "basico",
    nombre: "Kit Básico (64 piezas)",
    detalle: "Ideal para guardería o preescolar: 30 para lápices, 18 termos/tuppers, 16 libros.",
    precio: 290,
  },
  {
    id: "estrella",
    nombre: "Kit Completo Estrella (112 piezas)",
    detalle: "Para primaria: 60 mini lápiz, 28 termos/lonchera, 22 libros + 2 tags mochila.",
    precio: 420,
    precioAnterior: 490,
    recomendado: true,
  },
  {
    id: "mega",
    nombre: "Mega Kit Escolar (180 piezas)",
    detalle: "Para todo el ciclo: 90 mini lápiz, 45 térmicas, 30 libros, 12 zapatos + 3 llaveros tag.",
    precio: 580,
  },
];

export const complementos = [
  {
    id: "termo",
    nombre: "+ 20 Termo-adhesivas para ropa y suéter",
    detalle: "Se fijan con plancha casera en 15 seg.",
    precio: 75,
  },
  {
    id: "llavero",
    nombre: "+ Llavero rígido de acrílico grabado",
    detalle: "Ideal para cierre de mochila o lonchera.",
    precio: 45,
  },
];

export const medidas = [
  { uso: "Para Lápices y Colores", medida: "4 × 0.8 cm" },
  { uso: "Para Termos y Tuppers", medida: "6 × 1.8 cm" },
  { uso: "Cuadernos y Carpetas", medida: "7 × 3.2 cm" },
  { uso: "Circulares Botellas", medida: "Ø 4.0 cm" },
];

export const pasosAplicacion = [
  "Limpia la superficie con alcohol isopropílico para retirar grasitud o polvo.",
  "Desprende el vinil y presiona firmemente desde el centro hacia las orillas con la yema del pulgar.",
  "Deja reposar 24 horas antes del primer ciclo de lavado o microondas para curar el adhesivo.",
];

export const faqs = [
  {
    q: "¿Se borra el nombre al lavarse?",
    a: "No. Usamos tintas de curado UV selladas bajo película de vinil mate extra-gruesa. No se raya ni se desvanece.",
  },
  {
    q: "¿Puedo poner 2 nombres en un kit?",
    a: "Cada paquete se corta con 1 solo diseño/nombre para conservar la calibración y el tiempo de entrega express.",
  },
];
