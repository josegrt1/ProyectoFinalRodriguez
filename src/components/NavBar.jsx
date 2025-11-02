
import { Link, NavLink } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import CartWidget from "./CartWidget";
import logo from "../assets/logo.svg";

export default function NavBar() {
  return (
    <header className="navbar" role="banner">
      <nav className="nav-inner" aria-label="Principal">
        {}
        <Link to="/" aria-label="Inicio" className="brand">
          <img src={logo} alt="Logo de Vuelos y Más" />
        </Link>

        {}
        <ul className="tabs">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Catálogo
            </NavLink>
          </li>

          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <NavLink
                to={`/category/${c.id}`}
                className={({ isActive }) => (isActive ? "tab active" : "tab")}
              >
                {c.label}
              </NavLink>
            </li>
          ))}

          {}
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Carrito
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/checkout"
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Checkout
            </NavLink>
          </li>
        </ul>

        {}
        <div className="nav-right">
          <CartWidget />
        </div>
      </nav>
    </header>
  );
}
