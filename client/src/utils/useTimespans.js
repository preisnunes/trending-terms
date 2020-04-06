import {useState, useEffect} from 'react';

export default function useTimespans(url) {
    const [timespans, setTimespans] = useState([]);
    
    useEffect(() => {
        async function fetchTimeSpans() {
            const response = await fetch(url);
            const data = await response.json();
            setTimespans(data);
        }
        fetchTimeSpans();
    }, [url]);
    
    return {timespans};
}