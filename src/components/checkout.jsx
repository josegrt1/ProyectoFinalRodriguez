import { useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/cartcontext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { items, clear } = useCart();


  const total = items.reduce((acc, it) => acc + Number(it.price ?? 0) * Number(it.qty ?? it.quantity ?? 1), 0);


  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false); 

  async function handleSubmit(e) {
    e.preventDefault();

    
    if (sendingRef.current) return;
    sendingRef.current = true;

    
    if (!items.length) {
      alert("Tu carrito está vacío.");
      sendingRef.current = false;
      return;
    }

    
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const buyer = {
      name: (fd.get("name") || "").trim(),
      email: (fd.get("email") || "").trim(),
      phone: (fd.get("phone") || "").trim(),
    };

    if (!buyer.name || !buyer.email) {
      alert("Por favor completa nombre y email.");
      sendingRef.current = false;
      return;
    }

    
    const sanitizedItems = items
      .map((it) => ({
        id: String(it.id ?? ""),
        name: String(it.name ?? it.title ?? "(sin nombre)"),
        price: Number(it.price ?? 0),
        qty: Number(it.qty ?? it.quantity ?? 1),
      }))
      .filter((it) => it.id);

    const order = {
      buyer,
      items: sanitizedItems,
      total,
      createdAt: serverTimestamp(),
    };

    try {
      setSending(true);
      const ref = await addDoc(collection(db, "orders"), order);
      alert(`✅ ¡Gracias por tu compra! ID: ${ref.id}`);
      clear();
      formEl.reset();            
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Hubo un problema creando tu orden. Intenta de nuevo.");
    } finally {
      setSending(false);
      sendingRef.current = false; 
    }
  }

  return (
    <section style={{ maxWidth: 560, margin: "0 auto" }}>
      <h1>Checkout</h1>
      <p>
        Total a pagar: <strong>${total.toLocaleString()}</strong>
      </p>

      {!items.length && (
        <p>
          Tu carrito está vacío. <Link to="/">Volver al catálogo</Link>
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Nombre y apellido</label>
        <input name="name" type="text" required placeholder="Tu nombre" />

        <label>Email</label>
        <input name="email" type="email" required placeholder="tu@email.com" />

        <label>Teléfono (opcional)</label>
        <input name="phone" type="tel" placeholder="1123456789" />

        <button type="submit" className="btn" disabled={sending || !items.length}>
          {sending ? "Enviando..." : "Confirmar compra"}
        </button>
      </form>
    </section>
  );
}
