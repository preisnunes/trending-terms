import React, {useState} from 'react';
import SearchField from './SearchField.js';

const SearchRepeater = () => {

    const [terms, setTerms] = useState([]);
    const [newTerm, setNewTerm] = useState('');

    const handleNewTermOnChange = event => {
        event.preventDefault();
        setNewTerm(event.target.value);
    }

    /**
     * Checks if a term already exists in the state 
     * @param {string} termToSearch 
     */
    const exists = (termToSearch) => {
        let exists = false;
        terms.forEach((term) => {
            if (term.value === termToSearch) {
                exists = true;
                return;
            }
        });
        return exists;
    }

    /**
     * Checks if a string is valid to be added to state
     * @param {string} term 
     */
    const isValid = (term) => {
        if (!newTerm) {
            return false;
        }

        return !exists(term);
    }

    /**
     * Add a new term to the repeater
     */
    const add = () => {
        if (!isValid(newTerm)) {
            return;
        }
        const values = [...terms];
        values.push({value: newTerm})
        setNewTerm('');
        setTerms(values);
    }

    const remove = (idx) => {
        const values = [...terms];
        values.splice(idx, 1);
        setTerms(values);
    }

    return (
        <div className="search-repeater">
            <div className="searched-terms">
            {terms.map((term, idx) => {
                return (
                    <SearchField id={idx} value={term.value} remove={remove} />
                );
            })}
            </div>
            <div className="term-to-search">
                <input value={newTerm} type="text" onChange={handleNewTermOnChange}></input>
                <input type="button" value="Add" onClick={() => add()} />
            </div>
        </div>
    );
}

export default SearchRepeater;