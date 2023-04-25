import './favorities.css'; // Importa los estilos CSS

const Favorites = ({ favorites, getComic, deleteFavorite }) => {

    return (
        <div className="favorites">
            <h2 className="favorites__title">
                <img src="/icons/favourites.png" alt="favorites icon" />My Favorites
            </h2>
            <div className="favorite-list">
                {favorites.map((favorite) => (
                    <div
                        key={favorite?.id}
                        className="favorite-card"
                    >
                        <img
                            src="/icons/btn-delete.png"
                            alt="trash icon"
                            className="favorite-card__delete"
                            onClick={() => deleteFavorite(favorite?.id)}
                        />
                        <img
                            className="favorite-card__image"
                            src={`${favorite?.thumbnail?.path}.${favorite?.thumbnail?.extension}`}
                            alt={favorite?.title}
                            onClick={() => getComic(favorite?.resourceURI)}
                        />
                        <h3 className="favorite-card__title">{favorite?.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;

