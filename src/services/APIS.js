import axios from 'axios';

const BASE_URL = import.meta.env.VITE_MARVEL_API_BASE_URL;
const API_KEY = import.meta.env.VITE_MARVEL_API_KEY;
const HASH = import.meta.env.VITE_MARVEL_API_HASH;
const TIMESTAMP = import.meta.env.VITE_MARVEL_API_TIMESTAMP;

// Función para obtener todos los personajes de Marvel
export const getCharacters = async (offset) => {
    try {
        const response = await axios.get(`${BASE_URL}/characters`, {
            params: {
                limit: 10,
                offset: offset,
                ts: TIMESTAMP,
                apikey: API_KEY,
                hash: HASH
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error getting characters:', error);
        throw error;
    }
}

// Función para obtener un comic específico por url
export const getCharacterById = async (url) => {
    try {
        const response = await axios.get(url, {
            params: {
                ts: TIMESTAMP,
                apikey: API_KEY,
                hash: HASH
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting character by ID:', error);
        throw error;
    }
}

// Función para obtener todos los cómics de un personaje específico por su ID
export const getComicsByCharacterId = async (characterId) => {
    try {
        const response = await axios.get(`${BASE_URL}/characters/${characterId}/comics`, {
            params: {
                ts: TIMESTAMP,
                apikey: API_KEY,
                hash: HASH
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting comics by character ID:', error);
        throw error;
    }
}

// Función para obtener todos los personajes que empiecen por una letra específica
export const getCharactersByNameStartsWith = async (letter) => {
    try {
        const response = await axios.get(`${BASE_URL}/characters`, {
            params: {
                nameStartsWith: letter,
                limit: 10,
                offset: 0,
                ts: TIMESTAMP,
                apikey: API_KEY,
                hash: HASH
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error getting characters by name starts with:', error);
        throw error;
    }
}
