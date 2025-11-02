import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase"; 
import ItemList from "./ItemList";
import Hero from "./hero";
import OfferHeader from "./offerheader";
import FeaturedSection from "./featuredSection";

export default function ItemListContainer({ greeting = "Catálogo" }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      console.log("PROJECT:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
      setLoading(true);
      try {
        const ref = collection(db, "products");
        const q = categoryId ? query(ref, where("category", "==", categoryId)) : ref;
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setItems([]); 
        
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId]);

  return (
    <section>
      {!categoryId && <Hero />}
      {!categoryId && <OfferHeader />}
      {!categoryId && <FeaturedSection />}

      <div id="catalogo" style={{ marginTop: categoryId ? 0 : "1rem" }}>
        <h1 style={{ marginBottom: ".25rem" }}>
          {categoryId ? `Categoría: ${categoryId}` : greeting}
        </h1>

        {loading ? (
          <div className="grid-cards">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card skeleton" />
            ))}
          </div>
        ) : (
          <ItemList items={items} />
        )}
      </div>
    </section>
  );
}
