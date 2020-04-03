import { useState } from 'react';

export default function useErrorHandler() {
    const [error, setError] = useState({message: null});

    const setErrorMessage = (message) => {
        const messageTemp = {message}
        setError(messageTemp);
    }
    
    return [error, setErrorMessage];

    /*return errors.message ? (
        <h3 className="error"> { error.message } </h3> 
    ): '';*/
}