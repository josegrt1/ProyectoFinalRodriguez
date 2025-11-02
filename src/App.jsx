import { Routes, Route, Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import NotFound from './components/NotFound'
import CartView from './components/cartview'
import Footer from './components/footer'
import Checkout from './components/checkout' 

function Layout() {
  return (
    <>
      <NavBar />
      <main className="container" role="main" style={{ padding: '1rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a Vuelos y Más Store!" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/checkout" element={<Checkout />} /> {}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
