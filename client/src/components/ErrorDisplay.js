import React from 'react';

const ErrorDisplay = ({error}) => {
    return error.message ? (
        <div className="error">
            <h3 > { error.message } </h3> 
        </div>
    ) : '';
}   

export default ErrorDisplay;