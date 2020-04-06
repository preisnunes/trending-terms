import React, {useState} from 'react';
import {searchItems as searchItemsConfig} from '../config/defaults.js'
import { Chart } from 'react-charts';
import useTermsTrendigStats from '../utils/useTermsTrendingStats.js';
import SearchItemsContextProvider from '../contexts/SearchItems.js';
import SearchItemsList from './SearchItems/List.js';
import NewSearchItem from './SearchItems/New.js';
import SelectTimeSpan from './SelectTimeSpan';


const chartStyle = {
	width: '800px',
	height: '600px',
	display: 'block',
	marginLeft: 'auto',
	marginRight: 'auto'
};

const searchTimespan = {
	marginTop: '40px',
	textAlign: 'center'
}

const searchItems = {
	justifyItems: 'center',
	marginTop: '40px',
	textAlign: 'center'
}

export default function TrendsSearchBlock() {
	
	const [data, setData] = useTermsTrendigStats();
	const [isLoading, setIsLoading] = useState(false);
	const [timeSpan, setTimeSpan] = useState('-1m');

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

	const submitData = async (searchItems) => {
		setIsLoading(true);
		
		await setData(searchItems, timeSpan).catch((err) => {
			setIsLoading(false);
			throw err;
		});
		
		setIsLoading(false);
	}
	
	return (
		<div id="trends-search-section">
			<div 
				className={`chart${isLoading ? 'loading' : ''}`} 
				style={chartStyle}
			>
				<Chart data={dataMemo} axes={axes}/>
			</div>
			<div className="search-timespan" style={searchTimespan}>
				<SelectTimeSpan span={timeSpan} setSpan={setTimeSpan}/>
			</div>
			<div style={searchItems} className="items-search-list">	
				<SearchItemsContextProvider>
					<NewSearchItem itemsLimit={searchItemsConfig.limit}/>
					<SearchItemsList searchTerms={submitData}/>
				</SearchItemsContextProvider>
			</div>
		</div>
	)
}

