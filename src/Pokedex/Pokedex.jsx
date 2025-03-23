import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pokedex.css";

export function Pokedex() {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 52; // Ajusta según la cantidad total de Pokémon por API

    useEffect(() => {
        const callAPI = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
                const result = await response.json();
                setData(result.results); // Reemplaza datos en cada carga
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        callAPI();
    }, [offset]); // Llama a la API cuando cambie el offset

    // Función para cargar la página específica
    const SetPage = (value) => {
        if (value < 0 || value >= totalPages) return; // Validar límites de página
        setData([]); // Limpia datos antes de cargar los nuevos
        setCurrentPage(value);
        setOffset(value * 20); // Actualiza el offset basado en la página
    };

    return (
        <>
            <section id="list">
                {data.length > 0 &&
                    data.map((pkmon, i) => {
                        let id = offset + i + 1;
                        let idStr = id.toString().padStart(3, "0");
                        let img = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${idStr}.png`;

                        return (
                            <div key={pkmon.name}>
                                <img src={img} alt={pkmon.name} />
                                <p>{idStr}</p>
                                <h2>{pkmon.name}</h2>
                                <Link className="button" to={`/pokemon/${id}`}>Ver más</Link>
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
