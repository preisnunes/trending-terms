import React from 'react';

const SearchField = (props) => {
    return (
        <div id={`search-field-${props.id}`}>
            <input
                value={props.value}
                type="text"
                readOnly
            />
            <button type="button" onClick={() => props.remove(props.id)}>Remove</button>
        </div>
    );
}

export default SearchField;