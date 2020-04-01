import React, { useContext } from 'react';
import { SearchItemsContext } from '../contexts/SearchItems.js';
import countryList from 'react-select-country-list'

const countriesList = countryList().getData();

const SearchItem = ({id, item}) => {
    const { dispatch } = useContext(SearchItemsContext);
    
    return (
        <div id={`item-${id}`} data-testid="list-item">
            <input type="text" value={item.term} readOnly/>
            <select value={item.geo} readOnly>
                <option value="">Worldwide</option>
                {countriesList.map( country => 
                    <option value={country.value.toLowerCase()}>{country.label}</option>
                )}
            </select>
            <input type="button" onClick={() => dispatch({ type: 'REMOVE_ITEM', id: id })} value="Remove"></input>
        </div>
    );
}

export default SearchItem;