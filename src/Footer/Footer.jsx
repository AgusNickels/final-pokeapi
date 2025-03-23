import './Footer.css';
import { SiPokemon } from "react-icons/si";

export function Footer() {
    return(
        <footer>
            <div className="footer-content">
                <p>&copy; 2025 Trabajo Practico Final de Agustín Nickels. Todos los derechos reservados.</p>
                <nav>
                    <a href="https://www.pokemon.com/el">Pagina Oficial</a>
                    <a href="https://www.linkedin.com/in/agus-nickels/">Contacto</a>
                    <a href="https://corporate.pokemon.com/es-mx/">¿Quienes Somos? <SiPokemon/></a>
                    </nav>
            </div>
        </footer>
    )
}