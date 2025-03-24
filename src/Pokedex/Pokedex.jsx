import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import "./Pokedex.css";

export function Pokedex({ favorites, handleFavorite }) {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 52;

  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        const result = await response.json();
        setData(result.results);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    callAPI();
  }, [offset]);

  const SetPage = (value) => {
    if (value < 0 || value >= totalPages) return;
    setData([]);
    setCurrentPage(value);
    setOffset(value * 20);
  };

  return (
    <>
      <section id="list">
        {data.length > 0 &&
          data.map((pkmon, i) => {
            let id = offset + i + 1;
            let idStr = id.toString().padStart(3, "0");
            let img = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${idStr}.png`;

            const isFavorite = favorites.some(fav => fav.name === pkmon.name);

            return (
              <div key={pkmon.name} className="pokemon-card">
                <img src={img} alt={pkmon.name} />
                <p>{idStr}</p>
                <h2>{pkmon.name}</h2>
                <Link className="button" to={`/pokemon/${id}`}>Ver más</Link>
                <button className="favorite-button" onClick={() => handleFavorite(pkmon)}>
                  {isFavorite ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} />}
                </button>
              </div>
            );
          })}
      </section>

      <div className="pagination">
        <a onClick={() => SetPage(currentPage - 1)}>
          <FaChevronLeft size={24} color="#ffffff" />
        </a>
        {currentPage > 0 && (
          <a onClick={() => SetPage(currentPage - 1)}>{currentPage}</a>
        )}
        <a className="current-page">{currentPage + 1}</a>
        {currentPage + 1 < totalPages && (
          <a onClick={() => SetPage(currentPage + 1)}>{currentPage + 2}</a>
        )}
        {currentPage + 2 < totalPages && (
          <a onClick={() => SetPage(currentPage + 2)}>{currentPage + 3}</a>
        )}
        <a onClick={() => SetPage(currentPage + 1)}>
          <FaChevronRight size={24} color="#ffffff" />
        </a>
      </div>
    </>
  );
}

