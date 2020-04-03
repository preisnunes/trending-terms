import { useState } from 'react';
import {trendsAPI} from '../config/defaults.js';

export default function useTermsDataManager() {
	
	const [data, setData] = useState([{
		label: 'test',
		data: [[0,0]]
	}]);
	
	const fetchItems = async (items) => {
		const itemsAsQueryParameter = encodeURI(JSON.stringify(items));
		
		const response = await fetch(`${trendsAPI}?items=${itemsAsQueryParameter}`);
		if (!response.ok) {
			throw Error('Something happened. It was not possible to load your search!')
		}
		
		const results = await response.json();
		let resultsParsed = Array(items.length).fill().map(()=>Array().fill());
		results.forEach((result) => {
			let timestamp = new Date(result.time);
			let value = result.value;
			for (let i = 0; i < value.length; ++i) {
				resultsParsed[i].push([timestamp, value[i]]);
			}
		});
		
		return resultsParsed;
	}
	
	const add = async (searchItems) => {
		let searchResults = await fetchItems(searchItems).catch((err) => {
			throw err;
		});
		const data = searchItems.map((item, idx) => {
			return {
				label: item.getId(),
				data: searchResults[idx]
			}
		});
		setData(data);
	}
	
	return [data, add];
}