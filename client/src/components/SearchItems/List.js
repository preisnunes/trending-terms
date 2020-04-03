import React, {useContext} from 'react';
import { SearchItemsContext } from '../../contexts/SearchItems.js';
import SearchItem from './Item.js';
import useErrorHandler from '../../hooks/ErrorHandler.js'; 
import ErrorDisplay from '../ErrorDisplay.js';

const SearchItemsList = ({searchTerms}) => {

    const { items } = useContext(SearchItemsContext);
    const [error, setError] = useErrorHandler();

    const submitSearch = async () => {
        await searchTerms(items).catch(err => setError(err.message));
    }

    return items.length ? (
        <div className="search-items-list">
            {items.map((item, idx) => {
                return (<SearchItem id={idx} item={item} />);
            })}
            <input type="button" onClick={() => submitSearch()} value="Submit Search"></input>
            <ErrorDisplay error={error} />
        </div>
    ) : (
        <div className="empty-list">There are not any items to search for!!</div>
        
    );
}

export default SearchItemsList;