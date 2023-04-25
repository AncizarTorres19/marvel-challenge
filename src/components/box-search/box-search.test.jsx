

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';
import { ComicsContext } from '../../App';
import { getCharactersByNameStartsWith } from '../../services/APIS';

jest.mock('../../services/APIS', () => ({
    getCharactersByNameStartsWith: jest.fn(),
}));

describe('SearchBox', () => {
    let setSearch;
    let setCharacters;

    beforeEach(() => {
        setSearch = jest.fn();
        setCharacters = jest.fn();
    });

    it('should render', () => {
        const { getByPlaceholderText } = render(
            <ComicsContext.Provider value={{ setSearch, setCharacters }}>
                <SearchBox />
            </ComicsContext.Provider>
        );

        const searchInput = getByPlaceholderText('Search character...');

        expect(searchInput).toBeInTheDocument();
    });

    it('should call setSearch and setCharacters on valid form', async () => {
        const { getByPlaceholderText } = render(
            <ComicsContext.Provider value={{ setSearch, setCharacters }}>
                <SearchBox />
            </ComicsContext.Provider>
        );

        const searchInput = getByPlaceholderText('Search character...');

        fireEvent.change(searchInput, { target: { value: 'Iron Man' } });
        fireEvent.input(searchInput);

        expect(setSearch).toHaveBeenCalledWith('Iron Man');
        expect(setCharacters).toHaveBeenCalled();
        expect(getCharactersByNameStartsWith).toHaveBeenCalledWith('Iron Man');
    });

    it('should not call setSearch and setCharacters on empty form', async () => {
        const { getByPlaceholderText } = render(
            <ComicsContext.Provider value={{ setSearch, setCharacters }}>
                <SearchBox />
            </ComicsContext.Provider>
        );

        const searchInput = getByPlaceholderText('Search character...');

        fireEvent.change(searchInput, { target: { value: '' } });
        fireEvent.input(searchInput);

        expect(setSearch).not.toHaveBeenCalled();
        expect(setCharacters).not.toHaveBeenCalled();
        expect(getCharactersByNameStartsWith).not.toHaveBeenCalled();
    });
});


