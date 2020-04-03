import countryList from 'react-select-country-list'
import React from 'react';

const SelectGeoField = ({geo, setGeo}) => {
    
    const countriesList = countryList().getData();

    return (
        <select name="geo" value={geo} onChange={(e) => setGeo(e.target.value)}  >
            <option value="">Worldwide</option>
            {countriesList.map(country => 
                <option value={country.value} >{country.label}</option>
            )}
        </select>
    )
}

export default SelectGeoField;