import React from 'react';

const ErrorDisplay = ({error}) => {
    return error.message ? (
        <h3 className="error"> { error.message } </h3> 
    ) : '';
}   

export default ErrorDisplay;