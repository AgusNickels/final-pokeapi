import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';

export function Search({ sendSearch }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar valor de búsqueda de la URL al cargar el componente
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const querySearch = queryParams.get('search');

    if (querySearch) {
      setSearch(querySearch);
      sendSearch(querySearch.toLowerCase()); // Mandar el valor al padre
    } else {
      setSearch(""); // Si no hay término de búsqueda, limpiar el campo de búsqueda
      sendSearch(""); // Limpiar la búsqueda en el padre
    }
  }, [location.search, sendSearch]);

  const changeSearch = (e) => {
    e.preventDefault();
    if (search) {
      sendSearch(search.toLowerCase());
      // Actualizar la URL con el término de búsqueda
      navigate(`?search=${search}`);
    }
  };

  return (
    <form onSubmit={changeSearch} className="search-form">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar Pokémon por nombre o ID"
      />
    </form>
  );
}

