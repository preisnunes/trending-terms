import React, {useState, useEffect} from 'react';
import { Chart } from 'react-charts';
import SearchRepeater from './SearchRepeater.js'
import useTermsDataManager from '../hooks/FetchTermData.js';

export default function TrendsChart() {
	
	const [data, add, remove] = useTermsDataManager();
	
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
				<SearchRepeater addData={add} removeData={remove}/>
			</div>
		</div>
	)
}

