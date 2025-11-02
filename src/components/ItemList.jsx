import Item from "./Item";

export default function ItemList({ items }) {
  if (!items?.length) return <p>No se encontraron productos en esta categoría.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
      }}
    >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
