import { createContext, useState } from 'react'; // Importa createContext y useState desde React

import './App.css' // Importa el archivo css

import Navbar from './components/navbar/Navbar'; // Importa el componente Navbar
import AppHome from './pages/home/AppHome'; // Importa el componente AppHome


// Crea el contexto
export const ComicsContext = createContext();

const App = () => {

  const [characters, setCharacters] = useState(null); // Define el estado para los personajes
  const [search, setSearch] = useState(""); // Define el estado para la búsqueda

  return (
    <>
      <ComicsContext.Provider value={{
        characters,
        search,
        setCharacters,
        setSearch,
      }}>
        <>
          {/* Renderiza el componente Navbar */}
          <Navbar />
          {/* Renderiza el componente AppHome */}
          <AppHome />
        </>
      </ComicsContext.Provider>
    </>
  );
}

export default App;
