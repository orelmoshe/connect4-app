import React from 'react';
import Board from './components/Board';
import './App.css';

function App() {
	return (
		<div className="App">
			<div className="header"> 4 in a Row </div>
			<div className="Game">
				<Board />
			</div>
		</div>
	);
}

export default App;
