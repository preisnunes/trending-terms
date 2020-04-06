import React, {useReducer} from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {SearchItemsContext} from '../contexts/SearchItems.js'
import SearchItemsContextProvider from '../contexts/SearchItems.js'
import NewSearchItem from '../components/SearchItems/New.js'
import SearchItemsList from '../components/SearchItems/List.js'
import SearchItem from '../entities/SearchItem.js'
import "@babel/polyfill"

test("If there are any search items to search for, a message should be displayed", () => {
    const items = [];
    render(
        <SearchItemsContext.Provider value={{items}}>
            <NewSearchItem itemsLimit={10}/>
            <SearchItemsList searchTerms={() =>{}}/>
        </SearchItemsContext.Provider>
    );
    expect(screen.getByText('No items to search for!')).toBeDefined();
    expect(screen.queryByText('Submit Search')).toBe(null);
});


test("If there are any search items to search for, the button to submit the search is not rendered", () => {
    const items = [];
    render(
        <SearchItemsContext.Provider value={{items}}>
            <NewSearchItem itemsLimit={10}/>
            <SearchItemsList searchTerms={() =>{}}/>
        </SearchItemsContext.Provider>
    );
    expect(screen.queryByText('Submit Search')).toBe(null);
});


test("It is not possible to add a new search item, if there is a equal one in the list", () => {
    
    const items = [new SearchItem('aaaa', 'US')];
    
    render(
        <SearchItemsContext.Provider value={{items}}>
            <NewSearchItem itemsLimit={10}/>
        </SearchItemsContext.Provider>
    );
    
    const term = screen.getByLabelText('Term');
    fireEvent.change(term, { target: { value: 'aaaa' } })

    const geo = screen.getByLabelText('Geo');
    fireEvent.change(geo, { target: { value: 'US' } })
    
    fireEvent.click(screen.getByText('add search'));
    
    expect(screen.getByText('This item already exists in the list!')).toBeDefined();
});


test("An item is not appended, if the limit of search items has been reached", () => {
    
    const items = [
        new SearchItem('aaaa', 'us'), 
        new SearchItem('bbbb', 'us')
    ];
    
    render(
        <SearchItemsContext.Provider value={{items}}>
            <NewSearchItem itemsLimit={2}/>
        </SearchItemsContext.Provider>
    );
    
    const term = screen.getByLabelText('Term');
    fireEvent.change(term, { target: { value: 'cccc' } })

    const geo = screen.getByLabelText('Geo');
    fireEvent.change(geo, { target: { value: 'us' } })
    
    fireEvent.click(screen.getByText('add search'));
    expect(screen.getByText('You reach the limit of items that you can search!')).toBeDefined();
});


test("Adding an item that is not present in the list, then the search item is appended to the list", () => {
    
    const items = [new SearchItem('aaaa', 'us')];
    render(
        <SearchItemsContextProvider>
            <NewSearchItem itemsLimit={10}/>
            <SearchItemsList searchTerms={() =>{}}/>
        </SearchItemsContextProvider>
    );
    
    const term = screen.getByLabelText('Term');
    fireEvent.change(term, { target: { value: 'bbbb' } })

    const geo = screen.getByLabelText('Geo');
    fireEvent.change(geo, { target: { value: 'us' } })
    
    fireEvent.click(screen.getByText('add search'));
    expect(screen.getAllByTestId('list-item').length).toBe(1);
});