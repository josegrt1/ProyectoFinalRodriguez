# 🛫 Proyecto Final – *Vuelos y Más* ✈️  
**E-commerce SPA desarrollada con React + Vite, Firebase y Context API.**  

Este proyecto constituye la **entrega final del curso de React (Front End)**, donde se desarrolla una aplicación web de tipo e-commerce con conexión a Firestore para el manejo de productos y órdenes de compra.  

---

## 🧭 Descripción General

**Vuelos y Más** es una Single Page Application (SPA) que simula una tienda de viajes y experiencias.  
Permite navegar entre distintas categorías, visualizar el detalle de cada producto, agregar al carrito, y finalizar la compra con un formulario de checkout que genera una orden en Firebase.

---

## 🧱 Tecnologías Utilizadas

- ⚛️ **React 18 + Vite**
- 🧭 **React Router DOM**
- 🧩 **Context API** (para el estado global del carrito)
- 🔥 **Firebase / Firestore**
- 💅 **CSS personalizado** + soporte opcional de **Bootstrap**
- 🧹 **ESLint** y **Prettier** para buenas prácticas

---

## 📦 Funcionalidades Principales

| Sección | Descripción |
|----------|--------------|
| **Catálogo** | Listado dinámico de productos desde Firestore, filtrados por categoría. |
| **Detalle de producto** | Vista individual con descripción, precio, y selector de cantidad. |
| **ItemCount** | Permite elegir unidades, validando stock y límites. |
| **Carrito** | Visualiza los productos agregados, subtotales y total general. |
| **Checkout** | Formulario para ingresar datos del comprador y confirmar compra. |
| **Orden en Firestore** | Al confirmar, se crea un documento en Firestore con todos los datos. |
| **Renderizado condicional** | Mensajes de “sin stock”, “carrito vacío”, loaders y confirmaciones. |

---

## 💾 Variables de entorno

Crea un archivo `.env` basado en el ejemplo `.env.example` e inserta tus credenciales de Firebase:

```bash
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=

🧩 Estructura del Proyecto
css
Copiar código
src/
 ├─ components/
 │   ├─ ItemListContainer.jsx
 │   ├─ ItemList.jsx
 │   ├─ ItemDetailContainer.jsx
 │   ├─ ItemDetail.jsx
 │   ├─ ItemCount.jsx
 │   ├─ NavBar.jsx
 │   ├─ Cart.jsx
 │   ├─ CartItem.jsx
 │   ├─ CartWidget.jsx
 │   └─ CheckoutForm.jsx
 │
 ├─ context/
 │   └─ cartcontext.jsx
 │
 ├─ data/
 │   └─ products.js
 │
 ├─ firebase.js
 ├─ App.jsx
 ├─ main.jsx
 ├─ index.css
 └─ App.css

🧰 Repositorio: https://github.com/josegrt1/ProyectoFinalRodriguez

👨‍💻 Autor
José Rodríguez
📍 buenos aires
🎓 Curso de Desarrollo Web – React JS
🗓️ Año: 2025

