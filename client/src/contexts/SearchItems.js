import React, {createContext, useReducer} from 'react';
import {searchItemReducer} from '../reducers/searchItem.js';

export const SearchItemsContext = createContext();

const SearchItemsContextProvider = (props) => {
    
    const [items, dispatch] = useReducer(searchItemReducer, []);
    
    return (
        <SearchItemsContext.Provider value={{ items, dispatch }}>
            {props.children}
        </SearchItemsContext.Provider>
    );
}
 
export default SearchItemsContextProvider;