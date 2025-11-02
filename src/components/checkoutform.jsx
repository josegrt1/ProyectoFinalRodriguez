import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; 

export default function CheckoutForm({ items, total, onSuccess }) {
  const [buyer, setBuyer] = useState({ nombre: "", email: "", telefono: "" });
  const [saving, setSaving] = useState(false);

  const disabled =
    saving || !items?.length || !buyer.nombre.trim() || !buyer.email.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    try {
      setSaving(true);
      const order = {
        buyer,
        items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
        total,
        createdAt: serverTimestamp(),
      };

      const ref = await addDoc(collection(db, "orders"), order);
      onSuccess?.(ref.id);
    } catch (err) {
      console.error(err);
      alert("Hubo un problema creando tu orden. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: ".75rem", maxWidth: 480 }}>
      <label>Nombre y apellido
        <input
          required
          value={buyer.nombre}
          onChange={(e) => setBuyer((v) => ({ ...v, nombre: e.target.value }))}
          placeholder="Tu nombre"
        />
      </label>

      <label>Email
        <input
          required
          type="email"
          value={buyer.email}
          onChange={(e) => setBuyer((v) => ({ ...v, email: e.target.value }))}
          placeholder="tu@email.com"
        />
      </label>

      <label>Teléfono (opcional)
        <input
          value={buyer.telefono}
          onChange={(e) => setBuyer((v) => ({ ...v, telefono: e.target.value }))}
          placeholder="11-...."
        />
      </label>

      <button className="btn primary" disabled={disabled}>
        {saving ? "Procesando..." : "Confirmar compra"}
      </button>
    </form>
  );
}
