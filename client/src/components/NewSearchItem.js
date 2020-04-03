import React, { useContext, useState } from 'react';
import { SearchItemsContext } from '../contexts/SearchItems.js';
import countryList from 'react-select-country-list'
import SearchItem from '../entity/SearchItem.js';
import {searchItems as searchItemsConfig} from '../config/defaults.js';

const countriesList = countryList().getData();

const NewSearchItemForm = ({config}) => {
    
    const {items, dispatch} = useContext(SearchItemsContext);
    const [term, setTerm] = useState('');
    const [geo, setGeo] = useState('');
    const [error, setError] = useState({message: null});

    if (config === undefined) {
        config = searchItemsConfig;
    }

    const isUnique = (itemToAdd) => {
        let isUnique = true;
        items.forEach((item) => {
            if (item.equals(itemToAdd)) {
                isUnique = false;
            }
        });

        return isUnique;
    }

    const setErrorMessage = (message) => {
        setError({message});
    } 

    const canBeSubmitted = (itemToAdd) => {
        if (items.length == config.limit) {
            setErrorMessage('You reach the limit of items that you can search for!');
            return false;
        }

        if (!isUnique(itemToAdd)) {
            setErrorMessage('This item search already exists in the list!');
            return false;
        }

        return true;
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const itemToAdd = new SearchItem(term, geo);
        if (!canBeSubmitted(itemToAdd)) {
            return;
        }
        
        dispatch({ type: 'ADD_ITEM', item: itemToAdd});
        setError({message: null});
        setTerm('');
        setGeo('');
    }

    return (
        <div className="add-search-item">
            <form onSubmit={handleSubmit}>
                <label>Term
                    <input type="text" name="term" value={term} onChange={(e) => setTerm(e.target.value)} required/>
                </label>
                <label>Geo
                    <select name="geo" value={geo} onChange={(e) => setGeo(e.target.value)}  >
                        <option value="">Worldwide</option>
                        {countriesList.map( country => 
                            <option value={country.value.toLowerCase()} >{country.label}</option>
                        )}
                    </select>
                </label>
                <input type="submit" value="add search" />
                { error.message &&
                <h3 className="error"> { error.message } </h3> }
            </form>
        </div>
    );
}
 
export default NewSearchItemForm;