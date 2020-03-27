import React, {useState, useEffect} from 'react';
import { Chart } from 'react-charts';
import SearchRepeater from './SearchRepeater.js'
const API = 'api/v1/trends';

async function fetchTermData(term) {
	
	let results = await fetch(`${API}?q=${term}`);
	results = await results.json();
	
	let data = results.map(function(dataPoint){
		return [new Date(dataPoint.time), dataPoint.value];
	});
	
	return data;
}


export default function TrendsChart() {
	
	const [data, setData] = useState([{
		label: 'Plot 1',
		data: [[0,1]]
	}]);
	
	/**
	 * This function receives an array of terms to search for
	 * and fetch data for each one of them from the API
	 * @param {array} termsToSearch 
	 */
	async function fetchData(termsToSearch) {
		let results = await Promise.all(
			termsToSearch.map(async term => {
				return {
					label: term,
					data: await fetchTermData(term)
				}
			})
		);
		
		setData(results);
	}

	/*const getSeriesStyle = React.useCallback(
		series => {
		  console.log(series);
		},
		[]
	)*/

	useEffect(() => {
		fetchData(['python']);
	}, [])

	const axes = React.useMemo(
    	() => [
			{ primary: true, type: 'time', position: 'bottom'},
			{ type: 'linear', position: 'left', hardMin: 0, hardMax: 100}
    	],
    	[data]
  	);
	
	const dataMemo = React.useMemo(
		() => data,
		[data]
	);
	
	return (
		<div className="trends-search">
			<div 
				className="chart" 
				style={{
						width: '800px',
						height: '600px'
					}}
			>
				<Chart data={dataMemo} axes={axes}/>
			</div>
			<div className="search-terms-controller">
				<SearchRepeater fetchData={fetchData} />
			</div>
		</div>
	)
}

