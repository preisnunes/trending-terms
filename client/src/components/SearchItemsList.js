import React, {useContext} from 'react';
import { SearchItemsContext } from '../contexts/SearchItems.js';
import SearchItem from './SearchItem.js';

const SearchItemsList = ({searchTerms}) => {

    const { items } = useContext(SearchItemsContext);
    
    const submitSearch = () => {
        console.log('Submit!');
        console.log(items);
        searchTerms(items);
    }

    return items.length ? (
        <div className="search-items-list">
            {items.map((item, idx) => {
                return (<SearchItem id={idx} item={item} />);
            })}
            <input type="button" onClick={() => submitSearch()} value="Submit Search"></input>
        </div>
    ) : (
        <div className="empty-list">There are not any items to search for!!</div>
    );
}

export default SearchItemsList;