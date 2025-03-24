import './Favoritos.css';

export function Favoritos({ favorites }) {
  return (
    <div className="favoritos-container">
      <h1>Favoritos</h1>
      <div className="favoritos-list">
        {favorites.length === 0 ? (
          <p>No tienes favoritos aún.</p>
        ) : (
          favorites.map((pkmon, i) => {
            let id = pkmon.id  // Si no tiene ID, usamos el índice
            let idStr = id.toString().padStart(3, "0");
            let img = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${idStr}.png`;

            return (
              <div key={pkmon.name} className="pokemon-card">
                <img src={img} alt={pkmon.name} />
                <p>{idStr}</p>
                <h2>{pkmon.name}</h2>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}



