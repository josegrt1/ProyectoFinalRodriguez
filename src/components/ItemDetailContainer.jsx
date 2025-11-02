import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; 
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "products", id));
        if (snap.exists()) {
          setItem({ id: snap.id, ...snap.data() });
        } else {
          setItem(null);
        }
      } catch (err) {
        console.error("Error cargando detalle:", err);
        setItem(null);
    } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!item) return <p>No se encontró el producto.</p>;

  return <ItemDetail item={item} />;
}
