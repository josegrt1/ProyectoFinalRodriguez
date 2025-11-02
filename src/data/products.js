export const PRODUCTS = [
  { id: '1', title: 'Carry-on A320', price: 120, category: 'equipaje', stock: 10, description: 'Valija de cabina 40L', img: '/img/carryon.png' },
  { id: '2', title: 'Etiqueta TSA',  price: 25,  category: 'accesorios', stock: 50, description: 'Etiqueta seguridad TSA', img: '/img/tsa.webp' },
  { id: '3', title: 'Mochila Pilot',  price: 85,  category: 'equipaje', stock: 15, description: 'Mochila para cabina', img: '/img/mochila.jpg' },
  { id: '4', title: 'Almohada cuello',price: 18,  category: 'confort',   stock: 40, description: 'Almohada memory foam', img: '/img/almohada.jpg' },
]

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export async function getProducts(categoryId) {
  await delay(600)
  return categoryId ? PRODUCTS.filter(p => p.category === categoryId) : PRODUCTS
}

export async function getProductById(id) {
  await delay(600)
  return PRODUCTS.find(p => p.id === id)
}

export const CATEGORIES = [
  { id: "equipaje",   label: "Promo" },  
  { id: "accesorios", label: "Puntos" },  
  { id: "confort",    label: "Confort" },
];

