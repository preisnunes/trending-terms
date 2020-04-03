import React, {useState, useEffect} from 'react';
import { Chart } from 'react-charts';
import useTermsDataManager from '../hooks/FetchTermData.js';
import SearchItemsContextProvider from '../contexts/SearchItems.js';
import SearchItemsList from './SearchItems/List.js';
import NewSearchItem from './SearchItems/New.js';
import SelectTimeSpan from './SelectTimeSpan';

export default function TrendsChart() {
	
	const [data, add, remove] = useTermsDataManager();
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

	const addData = async (searchItems) => {
		setIsLoading(true);
		
		await add(searchItems).catch((err) => {
			setIsLoading(false);
			throw err;
		});
		
		setIsLoading(false);
	}
	
	return (
		<div id="trends-search-section-1">
			<div 
				className={`chart ${isLoading ? 'loading' : ''}`} 
				style={{
						width: '800px',
						height: '600px'
					}}
			>
				<Chart data={dataMemo} axes={axes}/>
			</div>
			<div className="items-time-window">
				<SelectTimeSpan span={timeSpan} setSpan={setTimeSpan}/>
			</div>
			<div className="items-search-list">	
				<SearchItemsContextProvider>
					<NewSearchItem />
					<SearchItemsList searchTerms={addData}/>
				</SearchItemsContextProvider>
			</div>
		</div>
	)
}

