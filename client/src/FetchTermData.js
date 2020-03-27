import { useState, useEffect } from 'react';
const API = 'api/v1/trends';

async function fetchTermData(term) {
	
	let results = await fetch(`${API}?q=${term}`);
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
	
	const add = async (term) => {
		if (termExists(term)) {
			return
		}
		const termData = await fetchTermData(term);
		const dataTmp = [...data];
		dataTmp.push({
			label: term,
			data: termData
		});
		setData(dataTmp);
	}
	
	return [data, add, remove];
}