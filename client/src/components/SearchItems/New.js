import React, { useContext, useState } from 'react'
import { SearchItemsContext } from '../../contexts/SearchItems.js'
import SearchItem from '../../entities/SearchItem.js'
import {searchItems as searchItemsConfig} from '../../config/defaults.js'
import useErrorHandler from '../../hooks/ErrorHandler.js' 
import ErrorDisplay from '../ErrorDisplay.js'
import SelectGeoField from './SelectGeoField.js'

const NewSearchItemForm = ({config}) => {
    
    const {items, dispatch} = useContext(SearchItemsContext);
    const [term, setTerm] = useState('');
    const [geo, setGeo] = useState('');
    const [error, setError] = useErrorHandler();

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

    const canBeSubmitted = (itemToAdd) => {
        if (items.length == config.limit) {
            setError('You reach the limit of items that you can search for!');
            return false;
        }

        if (!isUnique(itemToAdd)) {
            setError('This item search already exists in the list!');
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
        setError(null);
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
                    <SelectGeoField geo={geo} setGeo={setGeo}/>
                </label>
                <input type="submit" value="add search" />
                <ErrorDisplay error={error}/>
            </form>
        </div>
    );
}
 
export default NewSearchItemForm;