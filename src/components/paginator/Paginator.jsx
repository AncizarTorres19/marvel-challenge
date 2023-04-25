import './paginator.css' // Importa los estilos CSS

const Paginator = ({ page, pages, goToPage }) => {

    // Crea un array con el número de páginas
    const counter = (num) => {
        return new Array(num).fill(0).map((_, index) => index);
    };

    return (
        <div className="paginator">
            <div className="button-list">
                <div className="button-page" onClick={() => goToPage(page - 1)}>
                    {"<"}
                </div>
                {counter(pages).slice(0, 5).map((pageIndex) => (
                    <div
                        key={pageIndex}
                        className={`button-page ${page === pageIndex ? "active" : ""}`}
                        onClick={() => goToPage(pageIndex)}
                    >
                        {pageIndex + 1}
                    </div>
                ))}
                <div className="button-page" onClick={() => goToPage(page + 1)}>
                    {">"}
                </div>
            </div>
        </div>
    );
};

export default Paginator;
