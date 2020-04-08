import React, {useContext, useEffect} from 'react';
import { SearchItemsContext } from '../../contexts/SearchItems.js';
import SearchItem from './Item.js';
import useErrorHandler from '../../utils/useErrorHandler.js'; 
import ErrorDisplay from '../ErrorDisplay.js';

const itemsList = {
    marginTop: '20px',
    textAlign: 'center'
}

const SearchItemsList = ({searchTerms}) => {
    console.log(searchTerms);
    const { items } = useContext(SearchItemsContext);
    const [error, setError] = useErrorHandler();

    useEffect(() => {
        async function doTermsSearch() {
            await searchTerms(items).catch((err) => {
                setError(err.message)
            });
        }
        setError(null);
        doTermsSearch();
    }, [items]);

    return items.length ? (
        <div style={itemsList} className="search-items-list">
            {items.map((item, idx) => {
                return (<SearchItem id={idx} key={item.getId()} item={item}/>);
            })}
            <ErrorDisplay error={error} />
        </div>
    ) : (
        <div style={itemsList} className="search-items-list empty">No items to search for!</div>
        
    );
}

export default SearchItemsList;