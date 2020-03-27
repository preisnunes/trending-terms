import { useState, useEffect } from 'react';
import Search from './SearchBar.js'
const API = 'api/v1/trends';


export default function useFetchTermData(term) {
	
	const [data, setData] = useState([]);
	
	const fetchTermData = async function() {
		let results = await fetch(`${API}?q=${term}`);
		results = await results.json();
	
		let dataPoins = results.map(function(dataPoint){
			return [new Date(dataPoint.time), dataPoint.value];
		});
		
		setData(dataPoins);
	}

	useEffect( 
		() => {
			fetchTermData();
		},
		[]
	);

	return data;
}