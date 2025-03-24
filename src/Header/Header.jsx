import './Header.css';
import { MdAssignmentInd, MdFavorite , MdCottage, MdOutlineCatchingPokemon } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
    let [select, setSelect] = useState(0);

    let navigation = [
        { text: 'Bienvenidos', icono: <MdCottage />, url: "/", ariaLabel: "Página principal" },
        { text: 'Pokedex', icono: <MdOutlineCatchingPokemon />, url: "/pokedex", ariaLabel: "Ir a la Pokedex" },
        { text: 'Favoritos', icono: <MdFavorite />, url: "/favoritos", ariaLabel: "Ver tus favoritos" },
        { text: 'Registrate', icono: <MdAssignmentInd />, url: "/registrate", ariaLabel: "Registrarse" },
    ];

    let clicNav = (i) => setSelect(i);

    return (
        <header>
            <nav>
                {navigation.map((nav, i) => (
                    <Link 
                        to={nav.url} 
                        onClick={() => clicNav(i)} 
                        key={nav.text} 
                        className={select === i ? "select" : ""}
                        aria-label={nav.ariaLabel}
                        aria-current={select === i ? "page" : undefined}
                    > 
                        {nav.icono}
                        <span>{nav.text}</span>
                    </Link>
                ))}
            </nav>
        </header>
    );
}
