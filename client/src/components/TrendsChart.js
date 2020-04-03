import React, {useState, useEffect} from 'react';
import { Chart } from 'react-charts';
import useTermsDataManager from '../hooks/FetchTermData.js';
import SearchItemsContextProvider from '../contexts/SearchItems.js';
import SearchItemsList from '../components/SearchItemsList.js';
import NewSearchItem from '../components/NewSearchItem.js';

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
		<div id="trends-search-section-1">
			<div 
				className="chart" 
				style={{
						width: '800px',
						height: '600px'
					}}
			>
				<Chart data={dataMemo} axes={axes}/>
			</div>
			<SearchItemsContextProvider>
				<NewSearchItem />
				<SearchItemsList searchTerms={add}/>
        	</SearchItemsContextProvider>
		</div>
	)
}

