import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <article className="card" aria-label={item.name}>
      <div className="img-wrap">
        {item.img ? (
          <img src={item.img} alt={item.name} loading="lazy" />
        ) : (
          <span className="img-ph">IMG</span>
        )}
      </div>

      <h3>{item.name}</h3>
      <p className="muted">{item.desc}</p>
      <p>
        <strong>USD {item.price?.toLocaleString("es-AR")}</strong>
      </p>

      <Link
        className="btn link"
        to={`/item/${item.id}`}
        aria-label={`Ver detalle de ${item.name}`}
      >
        Ver detalle
      </Link>
    </article>
  );
}
