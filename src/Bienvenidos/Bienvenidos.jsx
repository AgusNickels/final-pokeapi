import './Bienvenidos.css';

export function Bienvenidos() {
  return (
    <div className="pokedex-container">
      <header className="pokedex-header">
        <h1>Bienvenido al Mundo Pokémon</h1>
      </header>

      <main className="pokedex-content">
        <a className="pokedex-link" href="http://localhost:5173/pokedex">"Prepárate para convertirte en el mejor Maestro Pokémon."</a>
      </main>

      <footer className="pokedex-footer">
        <p>¡Atrápalos a todos!</p>
      </footer>
    </div>
  );
}
