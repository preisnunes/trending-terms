import React from 'react';

const SearchField = ({id, value, remove}) => {
    return (
        <div id={`search-field-${id}`}>
            <input
                value={value}
                type="text"
                readOnly
            />
            <button type="button" onClick={() => remove(id)}>Remove</button>
        </div>
    );
}

export default SearchField;