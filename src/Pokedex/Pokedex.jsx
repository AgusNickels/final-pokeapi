import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Pokedex.css";

export function Pokedex({ handleFavorite, favorites }) {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Cargar datos de los Pokémon y configurar total de páginas
  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1`);
        const result = await response.json();
        const totalPokemon = result.count;
        setTotalPages(Math.ceil(totalPokemon / 20)); // Asumiendo 20 Pokémon por página
      } catch (error) {
        console.error("Error al cargar el total de Pokémon:", error);
      }
    };
    callAPI();
  }, []);

  // Cargar Pokémon para cada página
  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        const result = await response.json();
        setData(result.results); // Actualiza los Pokémon mostrados
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    callAPI();
  }, [offset]);

  // Manejo de la paginación
  const setPage = (value) => {
    if (value < 0 || value >= totalPages) return; // Validar límites de páginas
    setOffset(value * 20); // Actualiza el offset según la página
    setCurrentPage(value); // Actualiza la página actual
  };

  return (
    <>
      <section id="list">
        {data.length > 0 &&
          data.map((pkmon, i) => {
            let id = offset + i + 1;
            let idStr = id.toString().padStart(3, "0");
            let img = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${idStr}.png`;

            const isFavorite = favorites.some((fav) => fav.id === id); // Verificar si es favorito

            return (
              <div key={id} className="pokemon-card">
                <img src={img} alt={pkmon.name} />
                <p>{idStr}</p>
                <h2>{pkmon.name}</h2>
                <Link className="button" to={`/pokemon/${id}`}>
                  Ver más
                </Link>
                <button onClick={() => handleFavorite({id, name: pkmon.name})}>
                  {isFavorite ? (
                    <FaHeart size={24} color="red" />
                  ) : (
                    <FaRegHeart size={24} color="white" />
                  )}
                </button>
              </div>
            );
          })}
      </section>

      <div className="pagination">
        <button onClick={() => setPage(currentPage - 1)}>&lt;</button>
        <span>{currentPage + 1}</span>
        <button onClick={() => setPage(currentPage + 1)}>&gt;</button>
      </div>
    </>
  );
}
