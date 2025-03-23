import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export function ListaPokemon() {
    let { id } = useParams();

    const [data, setData] = useState({});
    const [evolutionData, setEvolutionData] = useState([]);
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const TranslateType = (value) => {
        const translations = {
            normal: "Normal",
            fire: "Fuego",
            water: "Agua",
            grass: "Planta",
            electric: "Electrico",
            ice: "Hielo",
            fighting: "Lucha",
            poison: "Veneno",
            ground: "Tierra",
            flying: "Volador",
            psychic: "Psiquico",
            bug: "Bicho",
            rock: "Roca",
            ghost: "Fantasma",
            dragon: "Dragón",
            dark: "Siniestro",
            steel: "Acero",
            fairy: "Hada",
        };
        return translations[value] || value;
    };

    const fetchPokemonData = async () => {
        const response = await fetch(API_URL);
        const pokemonData = await response.json();
        setData(pokemonData);

        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const evolutionChain = [];
        let current = evolutionData.chain;

        while (current) {
            const name = current.species.name;
            const id = current.species.url.split('/').slice(-2, -1)[0]; // Extraer ID del URL
            evolutionChain.push({ name, id });
            current = current.evolves_to.length ? current.evolves_to[0] : null;
        }

        setEvolutionData(evolutionChain);
    };

    useEffect(() => {
        fetchPokemonData();
    }, [id]);

    // Formatear el ID a 3 dígitos (001, 002, ..., 999)
    const formattedId = id.toString().padStart(3, "0");

    return (
        <>
            {Object.keys(data).length > 0 && (
                <>
                    <Link to="/">Volver</Link>
                    <div className="item">
                        <h2>
                            {data.name} <span>N.° {formattedId}</span>
                        </h2>
                        <div className="grid-2-complete">
                            {/* Imagen principal */}
                            <div className="left-content">
                                <img
                                    src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${formattedId}.png`}
                                    alt={data.name}
                                    className="pokemon-main-image"
                                />
                            </div>

                            {/* Información principal */}
                            <div className="right-content">
                                <h3>Habilidades</h3>
                                <div className="grid-2">
                                    {data.abilities.map((ability, index) => (
                                        <p key={index}>{ability.ability.name}</p>
                                    ))}
                                </div>

                                <h3>Tipos</h3>
                                <div className="grid-2">
                                    {data.types.map((type, index) => (
                                        <p key={index}>{TranslateType(type.type.name)}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Evoluciones con imágenes */}
                        <h3>Evoluciones</h3>
                        <div className="evolution-list">
                            {evolutionData.map((evo, index) => (
                                <div key={index} className="evolution-item">
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${evo.id}.gif`}
                                        alt={`${evo.name} sprite`}
                                    />
                                    <p>{evo.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
