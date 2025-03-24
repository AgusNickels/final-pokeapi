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
import { NotFound } from './Pokedex/notFound';

function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]); // Lista de favoritos
  const navigate = useNavigate();

  let sendSearch = (value) => { setSearch(value); };

  useEffect(() => {
    if (search !== "") { navigate("/pokemon/" + search); }
  }, [search, navigate]);

  // Función para manejar los favoritos
  const handleFavorite = (pkmon) => {
    // Verificar si el Pokémon ya está en favoritos
    if (favorites.some(fav => fav.name === pkmon.name)) {
      // Si ya está en favoritos, eliminarlo
      setFavorites(favorites.filter(fav => fav.name !== pkmon.name));
    } else {
      // Si no está, agregarlo a favoritos
      setFavorites([...favorites, pkmon]);
    }
    console.log(favorites);
  };
  

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Bienvenidos />} />
        <Route 
          path="/Pokedex" 
          element={
            <>
              <Search sendSearch={sendSearch} />
              <Pokedex favorites={favorites} handleFavorite={handleFavorite} />
            </>
          } 
        />
        <Route path="/favoritos" element={<Favoritos favorites={favorites} />} />
        <Route path="/registrate" element={<Formulario />} />
        <Route path="/pokemon/:id" element={<ListaPokemon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
