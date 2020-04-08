import React, {useContext} from 'react';
import { SearchItemsContext } from '../../contexts/SearchItems.js';
import SearchItem from './Item.js';
import useErrorHandler from '../../utils/useErrorHandler.js'; 
import ErrorDisplay from '../ErrorDisplay.js';

const itemsList = {
    marginTop: '20px',
    textAlign: 'center'
}

const SearchItemsList = ({searchTerms}) => {

    const { items } = useContext(SearchItemsContext);
    const [error, setError] = useErrorHandler();

    const submitSearch = async () => {
        setError(null);
        await searchTerms(items).catch((err) => {
            setError(err.message)
        });
    }

    return items.length ? (
        <div style={itemsList} className="search-items-list">
            
            {items.map((item, idx) => {
                return (<SearchItem id={idx} key={item.getId()} item={item} />);
            })}
            <input style={itemsList} type="button" onClick={() => submitSearch()} value="Submit Search"></input>
            <ErrorDisplay error={error} />
        </div>
    ) : (
        <div style={itemsList} className="search-items-list empty">No items to search for!</div>
        
    );
}

export default SearchItemsList;