import React, {useState, useEffect} from 'react';
import { Chart } from 'react-charts';
import Search from './SearchBar.js'
const API = 'api/v1/trends';

async function fetchTermData(term) {
	
	const terms = ['java', 'ruby'];

	let termsResults = await Promise.all(
		terms.map(async termValue => {
			let results = await fetch(`${API}?q=${termValue}`);
			results = await results.json()
			return results.map(function(dataPoint){
				return [new Date(dataPoint.time), dataPoint.value];
				});
		})
	)
	
	return termsResults;

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
	
	async function fetchData(searchValue) {
		const results = await fetchTermData(searchValue);
		setData([
			{
				label: 'java',
				data: results[0]
			},
			{
				label: 'ruby',
				data: results[1]
			}
		]);
	}

	const searchCallback = async termToSearch => {
		await fetchData(termToSearch);
	};

	const getSeriesStyle = React.useCallback(
		series => {
		  console.log(series);
		},
		[]
	)

	useEffect(() => {
		fetchData('python');
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
			<Search search={searchCallback} />
			
			<div className="charts-section">
				<div
					className="trends-chart"
					style={{
						width: '800px',
						height: '600px'
					}}
				>
					<Chart data={dataMemo} axes={axes} getSeriesStyle={getSeriesStyle}/>
				</div>
			</div>
		</div>
	)
}

