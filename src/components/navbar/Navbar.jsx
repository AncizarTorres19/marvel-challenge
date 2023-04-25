import { useState } from 'react'; // Importa useState desde React

import './navbar.css' // Importa el archivo css

import SearchBox from '../box-search/SearchBox'; // Importa el componente SearchBox

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false); // Define el estado para mostrar el menú

    // Define la función para mostrar el menú
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav className="navbar" id="navbar">
            <div className="container">
                <a className="brand" href="/">
                    <img className="logo" src="/images/marvel-logo.svg" alt="marvel logo" />
                </a>
                <div className="toggle" id="toggle" onClick={toggleMenu}>
                    <img className='toggle-img' src="/icons/menu-regular-24.png" alt="menu icon" />
                </div>
                <ul className={`nav-list ${showMenu ? "show" : ""}`}>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={toggleMenu}>
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/favorites" onClick={toggleMenu}>
                            Favorites
                        </a>
                    </li>
                </ul>
                <div className="search-box">
                    {/* Renderiza el componente SearchBox */}
                    <SearchBox />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
