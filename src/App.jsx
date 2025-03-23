import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from './Header/Header';
import { Bienvenidos } from './Bienvenidos/Bienvenidos';
import { Pokedex } from './Pokedex/Pokedex';
import { ListaPokemon } from './Pokedex/ListaPokemon';
import { Favoritos } from './Favoritos/Favoritos';
import { Formulario } from './Formulario/Formulario';
import { Footer } from './Footer/Footer';
import { Search } from './Pokedex/Search';
import { NotFound } from './Pokedex/notFound';

function App() {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  let sendSearch = (value) => { setSearch(value); }

  useEffect(() => {
    if(search !== "") { navigate("/pokemon/" + search); }
  }, [search, navigate]);

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
              <Pokedex />
            </>
          } 
        />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/registrate" element={<Formulario />} />
        <Route path="/pokemon/:id" element={<ListaPokemon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
