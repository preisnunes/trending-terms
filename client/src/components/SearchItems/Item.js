import React, { useContext } from 'react';
import { SearchItemsContext } from '../../contexts/SearchItems.js';
import SelectGeoField from './SelectGeoField.js'


const SearchItem = ({id, item}) => {
    
    const { dispatch } = useContext(SearchItemsContext);
    
    return (
        <div id={`item-${id}`} data-testid="list-item">
            <input type="text" value={item.term} readOnly/>
            <SelectGeoField geo={item.geo} setGeo={() => {}}/>
            <input type="button" onClick={() => dispatch({ type: 'REMOVE_ITEM', id: id })} value="Remove"></input>
        </div>
    );
}

export default SearchItem;