import { Link } from "react-router-dom";
import { useCart } from "../context/cartcontext.jsx"; 

export default function CartView() {
  const { items, totalPrice, total, dec, add, remove, clear, updateQty } = useCart();
  const grandTotal = (total ?? totalPrice) || 0;


  if (!items || items.length === 0) {
    return (
      <section>
        <h1>Tu carrito está vacío</h1>
        <p>Explora destinos y agrega tu viaje.</p>
        <Link className="btn" to="/">Volver al catálogo</Link>
      </section>
    );
  }


  return (
    <section>
      <h1>Carrito</h1>

      <ul style={{ padding: 0, listStyle: "none", display: "grid", gap: ".75rem" }}>
        {items.map((i) => (
          <li
            key={i.id}
            className="card"
            style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}
          >
            <div>
              <strong>{i.name}</strong>
              <div style={{ color: "#555" }}>
                x{i.qty} · ${Number(i.price || 0).toLocaleString("es-AR")}
              </div>

              <div style={{ marginTop: ".5rem", display: "flex", gap: ".5rem", alignItems: "center" }}>
                <button className="btn" onClick={() => dec(i.id)}>-</button>
                <button className="btn" onClick={() => add(i)}>+</button>

                <input
                  aria-label="Cantidad"
                  type="number"
                  min={1}
                  value={i.qty}
                  onChange={(e) => updateQty(i.id, e.target.value)}
                  style={{ width: 64, textAlign: "center" }}
                />

                <button className="btn" onClick={() => remove(i.id)}>Eliminar</button>
              </div>
            </div>

            <div>
              <strong>${(i.qty * (i.price || 0)).toLocaleString("es-AR")}</strong>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
        <button className="btn" onClick={clear}>Vaciar carrito</button>

        <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
          <strong>Total: ${grandTotal.toLocaleString("es-AR")}</strong>
          <Link className="btn primary" to="/checkout">Ir a Checkout</Link>
        </div>
      </div>
    </section>
  );
}
