import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
    catch { return []; }
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);


  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(it => it.id === product.id);
      if (i !== -1) {
        const next = [...prev];
        next[i] = {
          ...next[i],
          qty: Math.min((product.stock ?? Infinity), next[i].qty + qty),
        };
        return next;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(it => it.id !== id));
  const clear = () => setItems([]);
  const updateQty = (id, qty) =>
    setItems(prev => prev.map(it => (it.id === id ? { ...it, qty } : it)));


  const totalQty = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((s, it) => s + it.qty * (it.price || 0), 0),
    [items]
  );


  const add = (item) => addItem(item, 1);
  const dec = (id) => {
    const current = items.find(i => i.id === id)?.qty ?? 1;
    updateQty(id, Math.max(1, current - 1));
  };
  const remove = (id) => removeItem(id);
  const total = totalPrice;

  const value = {

    items,

    addItem, removeItem, clear, updateQty,
    totalQty, totalPrice,

    add, dec, remove, total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
 