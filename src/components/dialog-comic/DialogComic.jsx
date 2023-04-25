import './dialog-comic.css' // importamos el css

const DialogComic = ({ showDialog, comic, findFavoriteComicById, closeDialogComic, addComicToFavorites }) => {
    return (
        <div className={`modal-comic ${showDialog ? "show" : ""}`}>
            <div className="content">
                <div className="wrapper">
                    <img
                        className="button-close"
                        src="/icons/btn-close.png"
                        alt="button close icon"
                        onClick={closeDialogComic}
                    />
                    <img
                        className="image"
                        src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
                        alt={comic?.title}
                    />
                    <div className="info">
                        <h1 className="title">{comic?.title}</h1>
                        <p
                            className="description"
                            dangerouslySetInnerHTML={{
                                __html: comic?.description || "No description found",
                            }}
                        ></p>
                    </div>
                </div>
                <div className="buttons">
                    <button
                        className={`btn-add-favorite ${findFavoriteComicById(comic?.id) ? "favorite" : ""}`}
                        disabled={findFavoriteComicById(comic?.id)}
                        onClick={() => addComicToFavorites(comic)}
                    >
                        <img
                            className="default"
                            src="/icons/btn-favourites-default.png"
                            alt="favorite icon"
                            style={{ display: findFavoriteComicById(comic?.id) ? "none" : "block" }}
                        />
                        <img
                            className="primary"
                            src="/icons/btn-favourites-primary.png"
                            alt="favorite icon"
                            style={{ display: findFavoriteComicById(comic?.id) ? "block" : "none" }}
                        />
                        {findFavoriteComicById(comic?.id) ? "ADDED TO FAVOURITES" : "ADD TO FAVOURITES"}
                    </button>
                    <button className="btn-add-cart">
                        <img src="/icons/shopping-cart-primary.png" alt="cart icon" />
                        BUY {/* FOR $ {comic?.prices[1]?.price || 0} */} FOR $3.99
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DialogComic;
