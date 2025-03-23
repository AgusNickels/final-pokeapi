import './Header.css';
import { MdAssignmentInd, MdFavorite , MdCottage, MdOutlineCatchingPokemon } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header () {
    let [select,setSelect] = useState(0);

    let navigation = [
        { text: 'Bienvenidos', icono: <MdCottage />, url: "/" },
        { text: 'Pokedex', icono: <MdOutlineCatchingPokemon />, url: "/pokedex" },
        { text: 'Favoritos', icono: <MdFavorite />, url: "/favoritos" },
        { text: 'Registrate', icono: <MdAssignmentInd />, url: "/registrate" },
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
                    > 
                        {nav.icono}
                        <span>{nav.text}</span>
                    </Link>
                ))}
            </nav>
        </header>
    );
}
