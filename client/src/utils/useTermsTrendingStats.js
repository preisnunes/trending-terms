import { useState } from 'react';
import {trendsAPI} from '../config/defaults.js';

export default function useTermsTrendigStats() {
	
	const [data, setData] = useState([{
		label: 'test',
		data: [[0,0]]
	}]);
	
	const fetchItems = async (items, timeSpan) => {
		const itemsAsQueryParameter = encodeURI(JSON.stringify(items));
		
		const response = await fetch(`${trendsAPI}?items=${itemsAsQueryParameter}&span=${timeSpan}`);
		if (!response.ok) {
			throw Error('Something happened. It was not possible to load your search!')
		}
		
		const results = await response.json();
		let resultsParsed = (new Array(items.length)).fill().map(()=>[].fill());
		results.forEach((result) => {
			let timestamp = new Date(result.time);
			let value = result.value;
			for (let i = 0; i < value.length; ++i) {
				resultsParsed[i].push([timestamp, value[i]]);
			}
		});
		
		return resultsParsed;
	}
	
	const add = async (searchItems, timeSpan) => {
		let searchResults = await fetchItems(searchItems, timeSpan).catch((err) => {
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