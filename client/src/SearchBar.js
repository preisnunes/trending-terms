import React, {useState} from 'react';

const Search = (props) => {

    const [termToSearch, setSearchTerm] = useState('python');
    
    const handleSearchInputOnChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const resetInputField = () => {
        setSearchTerm('');
    }
    
    const searchCallback = event => {
        event.preventDefault();
        props.search(termToSearch);
        resetInputField()
    }

    return (
        <form className="search-bar">
            <input
                value={termToSearch}
                onChange={handleSearchInputOnChange}
                type="text"
            />
            <input onClick={searchCallback} type="submit" value="Search" />
        </form>
    );
};

export default Search;

