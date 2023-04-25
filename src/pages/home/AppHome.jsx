import { useContext, useState, useEffect } from 'react'; // Importa el hook useEffect

import './app-home.css' // Importa el archivo de estilos del componente

import { Paginator, DialogComic, Favorites } from '../../components'; // Importa los componentes

import { ComicsContext } from '../../App'; // Importa el contexto

import { getCharacterById, getCharacters, getComicsByCharacterId } from '../../services/APIS'; // Importa las funciones de la API

const AppHome = () => {

    const [page, setPage] = useState(0); // Define el estado para la página actual
    const [pages, setPages] = useState(0); // Define el estado para el total de páginas
    const [showDialog, setShowDialog] = useState(false); // Define el estado para mostrar el diálogo
    const [comic, setComic] = useState(null); // Define el estado para el cómic seleccionado
    const [favorites, setFavorites] = useState([]); // Define el estado para los favoritos de los cómics

    const { characters, search, setCharacters } = useContext(ComicsContext); // Accede a los valores del contexto

    // Define la función para guardar los favoritos en el localStorage
    const goToPage = (pageIndex) => {
        setPage(pageIndex);
        console.log('entre')
        localStorage.setItem('page', pageIndex);
    };

    //Funcion para guardar los characters en su esaado y setear el total de paginas
    const getComics = (data) => {
        setCharacters(data.results);
        setPages(Math.ceil(data?.total / data?.limit));
    };

    // Funcion para abrir el dialogo del comic
    const openDialogComic = (comic) => {
        setComic(comic);
        setShowDialog(true);
    };

    // Funcion para cerrar el dialogo del comic
    const closeDialogComic = () => {
        setShowDialog(false);
    };

    // Funcion para guardar los favoritos en el localStorage y en el estado
    const addComicToFavorites = (comic) => {
        setFavorites([...favorites, comic]);
        saveFavorites([...favorites, comic]);
    };

    //Llamar a la función getComicsByCharacterId en el efecto de montaje del componente
    const addRandomComicToFavorites = async () => {
        let characterIds = [];
        let comicsArry = [];
        characters.map((character) => {
            characterIds.push(character.id);
        });

        let comicsCount = 0; // Contador de cómics agregados
        while (comicsCount < 3) {
            let characterId = characterIds[Math.floor(Math.random() * characterIds.length)];
            const { data } = await getComicsByCharacterId(characterId, saveFavorites);
            if (data.results.length > 0) {
                let comic = data.results[Math.floor(Math.random() * data.results.length)];
                // Validar si el cómic ya está en los favoritos
                if (!favorites.some((favorite) => favorite.id === comic.id)) {
                    setFavorites(prev => [...prev, comic])
                    comicsArry.push(comic);
                    comicsCount++; // Aumentar el contador de cómics agregados
                }
            }
        }
        localStorage.setItem('favorites', JSON.stringify(comicsArry)); // Guardar los favoritos en el localStorage
    };

    // Funcion para eliminar los favoritos del localStorage y del estado
    const deleteFavorite = (comicId) => {
        setFavorites(favorites.filter((favorite) => favorite.id !== comicId));
        saveFavorites(favorites.filter((favorite) => favorite.id !== comicId));
    };

    // Funcion para obtener el cómic por su url
    const getComic = async (resourceURI) => {
        try {
            const { data } = await getCharacterById(resourceURI);
            openDialogComic(data.results[0]);
        } catch (error) {
            console.log(error);
        }
    };

    // Funcion para buscar los personajes o characters cuando se borra el texto del input de búsqueda y caundo se crea el componente
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                // Llama a la función getCharacters para obtener los personajes
                const { data } = await getCharacters(page * 10);
                // Setea los resultados en el estado de characters
                getComics(data);
            } catch (error) {
                console.log(error);
            }
        };
        // Llama a la función fetchCharacters cuando el componente se monta
        if (search !== "") return
        fetchCharacters();
    }, [page, search]);

    //Funcion para verificar si el comic esta en favoritos
    const findFavoriteComicById = (id) => {
        return favorites.find((item) => item?.id === id) || false;
    };

    // Funcion para obtener o guardar los favoritos del localStorage
    useEffect(() => {
        if (!localStorage.getItem('favorites')) {
            setFavorites([]);
            localStorage.setItem('favorites', JSON.stringify([]));
        } else {
            setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
        }
    }, []);

    const saveFavorites = (favorites) => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    return (
        <main className="home container">

            <div className="character">

                <h2 className="character__title">
                    <img src="/icons/characters.png" alt="character icon" />
                    <span>Characters</span>
                    <button className="button" onClick={() => addRandomComicToFavorites()}>
                        ADD 3 COMICS TO FAVORITES
                    </button>
                </h2>

                {characters && (
                    <div className="character-list">

                        {characters.map((characters) => (
                            <div className="character-card" key={characters.id}>
                                <img
                                    className="image"
                                    src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
                                    alt={characters.name}
                                />

                                <div className="info">
                                    <h3 className="title">{characters.name}</h3>
                                    <p className="description">
                                        {characters.description || 'No description found'}
                                    </p>
                                    {characters.comics && characters.comics.items.length > 0 ? (
                                        characters.comics.items.slice(0, 1).map((comic) => (
                                            <button
                                                key={comic.id}
                                                className="button"
                                                onClick={() => getComic(comic.resourceURI)}
                                            >
                                                VIEW MORE
                                            </button>
                                        ))
                                    ) : (
                                        <ul className="related-comics-list">
                                            <h5>No comics found</h5>
                                        </ul>
                                    )}
                                </div>


                                <div className="related-comics-container">
                                    <h4>Related comics</h4>
                                    {characters.comics?.items?.length > 0 && (
                                        <ul className="related-comics-list">
                                            {characters.comics.items.slice(0, 4).map((comic) => (
                                                <li key={comic.id} onClick={() => getComic(comic.resourceURI)}>
                                                    {comic.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>


                            </div>
                        ))}
                    </div>
                )}
                {/* Paginador */}
                <Paginator
                    page={page}
                    pages={pages}
                    goToPage={goToPage}
                />

            </div>

            {/* Favorites */}
            <Favorites
                favorites={favorites}
                getComic={getComic}
                deleteFavorite={deleteFavorite}
            />

            {/* Dialog Comic */}
            {showDialog && (<DialogComic
                showDialog={showDialog}
                comic={comic}
                findFavoriteComicById={findFavoriteComicById}
                closeDialogComic={closeDialogComic}
                addComicToFavorites={addComicToFavorites}
            />)}


        </main>
    );
};

export default AppHome;
