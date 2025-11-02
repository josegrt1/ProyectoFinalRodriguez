import { useState } from "react";
import ItemCount from "./ItemCount";

import { useCart } from "../context/cartcontext";
export default function ItemDetail({ item }) {
  const { addItem } = useCart();
  const [addedQty, setAddedQty] = useState(0);

  const onAdd = (qty) => {

    addItem(
      { id: item.id, name: item.name, price: item.price, stock: item.stock },
      qty
    );
    setAddedQty(qty);

  };

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        alignItems: "start",
      }}
    >
      <div
        style={{
          aspectRatio: "4 / 3",
          background: "#111",
          display: "grid",
          placeItems: "center",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {item.img ? (
          <img
            src={item.img}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#fff" }}>IMG</span>
        )}
      </div>

      <div>
        <h2>{item.name}</h2>
        <p style={{ opacity: 0.85 }}>{item.desc}</p>

        <p>
          <strong>USD {item.price?.toLocaleString("es-AR")}</strong>
        </p>
        <p style={{ marginTop: -6, color: "#666" }}>
          Stock: <strong>{item.stock ?? 0}</strong>
        </p>

        {}
        {addedQty === 0 ? (
          <ItemCount stock={item.stock ?? 0} initial={1} onAdd={onAdd} />
        ) : (
          <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem" }}>
            <a className="btn" href="/">
              Seguir comprando
            </a>
            <a className="btn primary" href="/cart">
              Ir al carrito
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
