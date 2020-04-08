import React from 'react';
import useTimespans from '../utils/useTimespans.js';
import {timespansAPI} from '../config/defaults.js';

const SelectTimeSpan = ({span, setSpan}) => {
    const {timespans} = useTimespans(timespansAPI); 
    
    return (
        <div className="trends-time-span">
            <select name="timespan" value={span} onChange={(e) => setSpan(e.target.value)}  >
                {timespans.map(span => 
                    <option key={span.code} value={span.code} >{span.name}</option>
                )}
            </select>
        </div> 
    )
}

export default SelectTimeSpan;