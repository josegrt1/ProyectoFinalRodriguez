import { useState } from "react";

export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const [qty, setQty] = useState(initial);

  const inc = () => setQty(q => Math.min(stock, q + 1));
  const dec = () => setQty(q => Math.max(1, q - 1));
  const canAdd = stock > 0 && qty >= 1 && qty <= stock;

  return (
    <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
      <button className="btn" onClick={dec} disabled={qty <= 1}>-</button>
      <span>{qty}</span>
      <button className="btn" onClick={inc} disabled={qty >= stock}>+</button>
      <button className="btn primary" disabled={!canAdd} onClick={() => onAdd?.(qty)}>
        Agregar
      </button>
      {stock === 0 && <em style={{ color: "#b00" }}>Sin stock</em>}
    </div>
  );
}
