import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favoritos.css";

export function Favoritos({ favorites }) {
  return (
    <div className="favoritos-list">
      {favorites.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        favorites.map((pkmon) => {
          const id = pkmon.id || 0;
          const idStr = id.toString().padStart(3, "0");
          const imgSrc = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${idStr}.png`;
        
          return (
            <div key={`${id}-${pkmon.name}`} className="pokemon-card">
              <img src={imgSrc} alt={pkmon.name} />
              <p>{idStr}</p>
              <h2>{pkmon.name}</h2>
              <Link className="button" to={`/pokemon/${id}`}>
                Ver más
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
