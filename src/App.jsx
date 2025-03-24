import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from './Header/Header';
import { Bienvenidos } from './Bienvenidos/Bienvenidos';
import { Pokedex } from './Pokedex/Pokedex';
import { ListaPokemon } from './Pokedex/ListaPokemon';
import { Favoritos } from './Pokedex/Favoritos';
import { Formulario } from './Formulario/Formulario';
import { Footer } from './Footer/Footer';
import { Search } from './Pokedex/Search';
import NotFound from './Pokedex/notFound';

function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Función para actualizar el estado de búsqueda
  const sendSearch = (value) => { 
    setSearch(value); 
  };

  // useEffect para redirigir a la página de detalles del Pokémon si la búsqueda cambia
  useEffect(() => {
    if (search) {
      navigate("/pokemon/" + encodeURIComponent(search));
    }
  }, [search, navigate]);

  // Manejo de la adición/eliminación de favoritos
  const handleFavorite = (pokemon) => {
    const isFavorite = favorites.some(fav => fav.id === pokemon.id);

    const updatedFavorites = isFavorite
      ? favorites.filter(fav => fav.id !== pokemon.id)  // Eliminar de favoritos
      : [...favorites, pokemon];  // Agregar a favoritos

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));  // Guardar en localStorage
  };

  // Recuperar los favoritos del localStorage cuando la app se carga
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Bienvenidos />} />
        
        {/* Rutas para Pokedex y Search */}
        <Route 
          path="/Pokedex" 
          element={
            <>
              <Search sendSearch={sendSearch} />
              <Pokedex handleFavorite={handleFavorite} favorites={favorites} />
            </>
          } 
        />
        
        <Route 
          path="/favoritos" 
          element={<Favoritos favorites={favorites} />} />

        
        <Route path="/registrate" element={<Formulario />} />
        <Route path="/pokemon/:id" element={<ListaPokemon />} />
        
        {/* Ruta para manejo de error */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;


