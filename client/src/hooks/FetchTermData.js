import { useState, useEffect } from 'react';
const API = 'api/v1/trends';

async function fetchTermData(searchItem) {
	
	let results = await fetch(`${API}?q=${searchItem.term}&geo=${searchItem.geo}`);
	results = await results.json();
	
	let data = results.map(function(dataPoint){
		return [new Date(dataPoint.time), dataPoint.value];
	});
	
	return data;
}

export default function useTermsDataManager() {
	
	const [data, setData] = useState([]);
	
	const getTermIndex = (term) => {
		const labels = data.map((dataset) =>{
			return dataset.label;
		});
		return labels.indexOf(term)
	}

	const termExists = (term) => {
		return getTermIndex(term) >= 0 ? true : false;
	}

	const remove = (term) => {
		const index = getTermIndex(term);
		const dataTmp = [...data];
		dataTmp.splice(index, 1);
		setData(dataTmp);
	}
	
	const add = async (searchItems) => {
		
		let newData = await Promise.all(
			searchItems.map(async item => {
				let itemData = await fetchTermData(item)
				return {
					label: item.getId(),
					data: itemData
				}
			})
		);

		setData(newData);
	}
	
	return [data, add, remove];
}