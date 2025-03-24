import './Footer.css';
import { SiPokemon } from "react-icons/si";

export function Footer() {
    return (
        <footer className="pokedex-footer">
            <div className="footer-content">
                <p>&copy; 2025 Trabajo Práctico Final de Agustín Nickels. Todos los derechos reservados.</p>
                <nav>
                    <a href="https://www.pokemon.com/el" target="_blank" rel="noopener noreferrer">Página Oficial</a>
                    <a href="https://www.linkedin.com/in/agus-nickels/" target="_blank" rel="noopener noreferrer">Contacto</a>
                    <a href="https://corporate.pokemon.com/es-mx/" target="_blank" rel="noopener noreferrer">
                        ¿Quiénes Somos? <SiPokemon aria-label="Ícono Pokémon" />
                    </a>
                </nav>
            </div>
        </footer>
    );
}
