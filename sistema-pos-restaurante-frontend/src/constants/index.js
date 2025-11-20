import arrozPollo from "@/assets/images/arroz-de-pollo.webp";
import bandejaPaisa from "@/assets/images/bandeja-paisa.webp";
import caldoCostilla from "@/assets/images/caldo-costilla.webp";
import churrasco from "@/assets/images/churrasco.webp";
import costillasBBQ from "@/assets/images/costillas-bbq.webp";
import hamburguesa from "@/assets/images/hamburguesa.webp";
import mojarraFrita from "@/assets/images/mojarra-frita.webp";
import pastaBolonesa from "@/assets/images/pasta-bolonesa.webp";
import polloAjillo from "@/assets/images/pollo-ajillo.webp";
import polloGuisado from "@/assets/images/pollo-guisado.webp";
import puntaAnca from "@/assets/images/punta-anca.webp";


export const popularDishesData = [
  {
    id: 1,
    name: "Bandeja Paisa",
    price: "$28.000",
    image: bandejaPaisa
  },
  {
    id: 2,
    name: "Caldo de Costilla",
    price: "$18.000",
    image: caldoCostilla
  },
  {
    id: 3,
    name: "Churrasco",
    price: "$35.000",
    image: churrasco
  },
  {
    id: 4,
    name: "Mojarra Frita",
    price: "$32.000",
    image: mojarraFrita
  },
  {
    id: 5,
    name: "Pollo al Ajillo",
    price: "$25.000",
    image: polloAjillo
  },
  {
    id: 6,
    name: "Costillas BBQ",
    price: "$30.000",
    image: costillasBBQ
  },
  {
    id: 7,
    name: "Arroz de Pollo",
    price: "$22.000",
    image: arrozPollo
  },
  {
    id: 8,
    name: "Hamburguesa",
    price: "$15.000",
    image: hamburguesa
  },
  {
    id: 9,
    name: "Punta de Anca",
    price: "$40.000",
    image: puntaAnca
  },
  {
    id: 10,
    name: "Pasta a la Boloñesa",
    price: "$20.000",
    image: pastaBolonesa
  },
  {
    id: 11,
    name: "Pollo Guisado",
    price: "$24.000",
    image: polloGuisado
  }
];


export const tables = [
    { id: 1, name: "Mesa 1", status: "Reservado", initial: "AM", seats: 4 },
    { id: 2, name: "Mesa 2", status: "Disponible", initial: "MB", seats: 6 },
    { id: 3, name: "Mesa 3", status: "Reservado", initial: "JS", seats: 2 },
    { id: 4, name: "Mesa 4", status: "Disponible", initial: "HR", seats: 4 },
    { id: 5, name: "Mesa 5", status: "Reservado", initial: "PL", seats: 3 },
    { id: 6, name: "Mesa 6", status: "Disponible", initial: "RT", seats: 4 },
    { id: 7, name: "Mesa 7", status: "Reservado", initial: "LC", seats: 5 },
    { id: 8, name: "Mesa 8", status: "Disponible", initial: "DP", seats: 5 },
    { id: 9, name: "Mesa 9", status: "Reservado", initial: "NK", seats: 6 },
    { id: 10, name: "Mesa 10", status: "Disponible", initial: "SB", seats: 6 },
    { id: 11, name: "Mesa 11", status: "Reservado", initial: "GT", seats: 4 },
    { id: 12, name: "Mesa 12", status: "Disponible", initial: "JS", seats: 6 },
    { id: 13, name: "Mesa 13", status: "Reservado", initial: "EK", seats: 2 },
    { id: 14, name: "Mesa 14", status: "Disponible", initial: "QN", seats: 6 },
    { id: 15, name: "Mesa 15", status: "Reservado", initial: "TW", seats: 3 }
  ];


export const startersItem = [
  {
    id: 1,
    name: "Empanadas",
    price: 3500,
    category: "Vegetariano"
  },
  {
    id: 2,
    name: "Chicharrón",
    price: 8000,
    category: "No Vegetariano"
  },
  {
    id: 3,
    name: "Arepas con Queso",
    price: 4500,
    category: "Vegetariano"
  },
  {
    id: 4,
    name: "Patacones",
    price: 5000,
    category: "Vegetariano"
  },
  {
    id: 5,
    name: "Buñuelos",
    price: 3000,
    category: "Vegetariano"
  },
  {
    id: 6,
    name: "Aborrajados",
    price: 6000,
    category: "Vegetariano"
  }
  ];
  
export const mainCourse = [
  {
  id: 1,
  name: "Bandeja Paisa",
  price: 28000,
  category: "No Vegetariano"
  },
  {
  id: 2,
  name: "Ajiaco Santafereño",
  price: 20000,
  category: "No Vegetariano"
  },
  {
  id: 3,
  name: "Lechona Tolimense",
  price: 25000,
  category: "No Vegetariano"
  },
  {
  id: 4,
  name: "Sancocho de Gallina",
  price: 22000,
  category: "No Vegetariano"
  },
  {
  id: 5,
  name: "Arroz con Pollo",
  price: 18000,
  category: "No Vegetariano"
  },
  {
  id: 6,
  name: "Sobrebarriga al Horno",
  price: 32000,
  category: "No Vegetariano"
  }
];

export const beverages = [
  {
  id: 1,
  name: "Agua de Panela",
  price: 3000,
  category: "Caliente"
  },
  {
  id: 2,
  name: "Limonada Natural",
  price: 5000,
  category: "Fría"
  },
  {
  id: 3,
  name: "Jugo de Lulo",
  price: 6000,
  category: "Fría"
  },
  {
  id: 4,
  name: "Café Colombiano",
  price: 4000,
  category: "Caliente"
  },
  {
  id: 5,
  name: "Jugo de Maracuyá",
  price: 6000,
  category: "Fría"
  },
  {
  id: 6,
  name: "Avena Colombiana",
  price: 5000,
  category: "Fría"
  }
];

export const soups = [
  {
  id: 1,
  name: "Caldo de Costilla",
  price: 18000,
  category: "No Vegetariano"
  },
  {
  id: 2,
  name: "Ajiaco",
  price: 20000,
  category: "No Vegetariano"
  },
  {
  id: 3,
  name: "Sancocho Trifásico",
  price: 22000,
  category: "No Vegetariano"
  },
  {
  id: 4,
  name: "Mute Santandereano",
  price: 19000,
  category: "No Vegetariano"
  },
  {
  id: 5,
  name: "Sopa de Mondongo",
  price: 20000,
  category: "No Vegetariano"
  },
  {
  id: 6,
  name: "Changua",
  price: 12000,
  category: "Vegetariano"
  }
];

export const desserts = [
  {
  id: 1,
  name: "Arequipe",
  price: 8000,
  category: "Vegetariano"
  },
  {
  id: 2,
  name: "Obleas",
  price: 5000,
  category: "Vegetariano"
  },
  {
  id: 3,
  name: "Postre de Natas",
  price: 10000,
  category: "Vegetariano"
  },
  {
  id: 4,
  name: "Brevas con Arequipe",
  price: 12000,
  category: "Vegetariano"
  }
];

export const pizzas = [
  {
  id: 1,
  name: "Pizza Hawaiana",
  price: 25000,
  category: "No Vegetariano"
  },
  {
  id: 2,
  name: "Pizza Vegetariana",
  price: 22000,
  category: "Vegetariano"
  },
  {
  id: 3,
  name: "Pizza Mexicana",
  price: 28000,
  category: "No Vegetariano"
  }
];

export const alcoholicDrinks = [
  {
  id: 1,
  name: "Aguardiente",
  price: 15000,
  category: "Alcohólico"
  },
  {
  id: 2,
  name: "Ron Viejo de Caldas",
  price: 12000,
  category: "Alcohólico"
  },
  {
  id: 3,
  name: "Cerveza Club Colombia",
  price: 6000,
  category: "Alcohólico"
  },
  {
  id: 4,
  name: "Cerveza Póker",
  price: 5000,
  category: "Alcohólico"
  },
  {
  id: 5,
  name: "Canelazo",
  price: 8000,
  category: "Alcohólico"
  },
  {
  id: 6,
  name: "Cóctel de Corozo",
  price: 10000,
  category: "Alcohólico"
  }
];

export const salads = [
  {
  id: 1,
  name: "Ensalada César",
  price: 15000,
  category: "Vegetariano"
  },
  {
  id: 2,
  name: "Ensalada Mixta",
  price: 12000,
  category: "Vegetariano"
  },
  {
  id: 3,
  name: "Ensalada de Frutas Tropicales",
  price: 10000,
  category: "Vegetariano"
  },
  {
  id: 4,
  name: "Ensalada con Pollo",
  price: 18000,
  category: "No Vegetariano"
  },
  {
  id: 5,
  name: "Ensalada de Aguacate",
  price: 14000,
  category: "Vegetariano"
  }
];


export const menus = [
  { id: 1, name: "Entradas", bgColor: "#b73e3e" ,icon: "🍲", items: startersItem },
  { id: 2, name: "Platos Fuertes", bgColor: "#5b45b0" ,icon: "🍛", items: mainCourse },
  { id: 3, name: "Bebidas", bgColor: "#7f167f" ,icon: "🍹", items: beverages },
  { id: 4, name: "Sopas", bgColor: "#735f32" ,icon: "🍜", items: soups },
  { id: 5, name: "Postres", bgColor: "#1d2569" ,icon: "🍰", items: desserts },
  { id: 6, name: "Pizzas", bgColor: "#285430" ,icon: "🍕", items: pizzas },
  { id: 7, name: "Bebidas Alcohólicas", bgColor: "#b73e3e" ,icon: "🍺", items: alcoholicDrinks },
  { id: 8, name: "Ensaladas", bgColor: "#5b45b0" ,icon: "🥗", items: salads }
]

export const metricsData = [
  { title: "Ingresos", value: "$50.846.900", percentage: "12%", color: "#025cca", isIncrease: false },
  { title: "Clics Salientes", value: "10.342", percentage: "16%", color: "#02ca3a", isIncrease: true },
  { title: "Total Clientes", value: "19.720", percentage: "10%", color: "#f6b100", isIncrease: true },
  { title: "Conteo de Eventos", value: "20.000", percentage: "10%", color: "#be3e3f", isIncrease: false },
];

export const itemsData = [
  { title: "Total Categorías", value: "8", percentage: "12%", color: "#5b45b0", isIncrease: false },
  { title: "Total Platos", value: "50", percentage: "12%", color: "#285430", isIncrease: true },
  { title: "Pedidos Activos", value: "12", percentage: "12%", color: "#735f32", isIncrease: true },
  { title: "Total Mesas", value: "10", color: "#7f167f"}
];

// Estados de órdenes (mapeado a inglés para backend, pero mostrado en español)
export const ORDER_STATUS = {
  IN_PROGRESS_EN: "In Progress",
  READY_EN: "Ready",
  IN_PROGRESS_ES: "En Progreso",
  READY_ES: "Listo"
};

// Función auxiliar para traducir estados
export const translateOrderStatus = (status) => {
  if (status === ORDER_STATUS.IN_PROGRESS_EN) return ORDER_STATUS.IN_PROGRESS_ES;
  if (status === ORDER_STATUS.READY_EN) return ORDER_STATUS.READY_ES;
  return status;
};

export const orders = [
  {
  id: "101",
  customer: "Carlos Ramírez",
  status: "Listo",
  dateTime: "Enero 18, 2025 08:32 PM",
  items: 8,
  tableNo: 3,
  total: 250000,
  },
  {
  id: "102",
  customer: "María González",
  status: "En Progreso",
  dateTime: "Enero 18, 2025 08:45 PM",
  items: 5,
  tableNo: 4,
  total: 180000,
  },
  {
  id: "103",
  customer: "Andrés López",
  status: "Listo",
  dateTime: "Enero 18, 2025 09:00 PM",
  items: 3,
  tableNo: 5,
  total: 120000,
  },
  {
  id: "104",
  customer: "Laura Martínez",
  status: "En Progreso",
  dateTime: "Enero 18, 2025 09:15 PM",
  items: 6,
  tableNo: 6,
  total: 220000,
  },
];



  