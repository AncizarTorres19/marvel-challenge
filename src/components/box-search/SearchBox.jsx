import { useContext, useState } from "react"; // Importa useContext y useState desde React

import './search-box.css' // Importa el archivo css

import { ComicsContext } from "../../App"; // Importa el contexto

import { getCharactersByNameStartsWith } from "../../services/APIS"; // Importa la función de la API

const SearchBox = () => {

    const [formValid, setFormValid] = useState(false); // Define el estado para validar el formulario

    const { setCharacters, setSearch, search } = useContext(ComicsContext); // Accede a los valores del contexto

    // Define la función para buscar los personajes
    const handleChange = (event) => {
        setSearch(event.target.value);
        setFormValid(event.target.value !== "");
        searchCharacter(event.target.value);
    };

    // Define la función para buscar los personajes por nombre
    const searchCharacter = async (event) => {
        if (event === "") return;
        try {
            // Llama a la función getCharactersByNameStartsWith para obtener los personajes
            const { data } = await getCharactersByNameStartsWith(event);
            // Setea los resultados en el estado de characters
            setCharacters(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="form-search">
            <input
                type="search"
                value={search}
                onChange={handleChange}
                placeholder="Search character..."
                autoComplete="off"
            />
            <img
                className={formValid && "hidden"}
                src="/icons/search.png"
                alt="search icon"
            />
        </form>
    );
};

export default SearchBox;
