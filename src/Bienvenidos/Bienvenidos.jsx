import { Link } from 'react-router-dom';
import './Bienvenidos.css';

export function Bienvenidos() {
  return (
    <div className="pokedex-container">
      <header className="pokedex-header">
        <h1>Bienvenido al Mundo Pokémon</h1>
      </header>

      <main className="pokedex-content">
        {/* Usamos Link de react-router-dom en vez de un 'a' */}
        <Link className="pokedex-link" to="/Pokedex">"Prepárate para convertirte en el mejor Maestro Pokémon."</Link>
      </main>

      <footer className="pokedex-footer">
        <p>¡Atrápalos a todos!</p>
      </footer>
    </div>
  );
}
