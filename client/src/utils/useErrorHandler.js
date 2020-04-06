import { useState } from 'react';

export default function useErrorHandler() {
    const [error, setError] = useState({message: null});

    const setErrorMessage = (message) => {
        const messageTemp = {message}
        setError(messageTemp);
    }
    
    return [error, setErrorMessage];
}