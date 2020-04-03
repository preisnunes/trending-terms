import React from 'react';
import {timeWindows as timeSpansConfig} from '../config/defaults.js';

const SelectTimeSpan = ({span, setSpan}) => {
    return (
        <div className="trends-time-span">
            <select name="timeSpan" value={span} onChange={(e) => setSpan(e.target.value)}  >
                {timeSpansConfig.map(span => 
                    <option value={span.id} >{span.name}</option>
                )}
            </select>
        </div> 
    )
}

export default SelectTimeSpan;