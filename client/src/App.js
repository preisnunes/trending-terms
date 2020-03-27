import React from 'react';
import SearchRepeater from './SearchRepeater.js'
import TrendsChart from './TrendsChart.js';
import './App.css';


export default function App() {
	
	return (
		<div className="app">
			{TrendsChart()}
		</div>
	)
	
}

