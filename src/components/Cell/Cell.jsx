import React from 'react';
import './Cell.css';

class Cell extends React.Component {
	handlePlayersMove = () => {
		const { columnIndex, play } = this.props;
		play(columnIndex);
	};

	getCellColor() {
		if (this.props.value === 1) {
			return 'turquoise';
		} else if (this.props.value === 2) {
			return 'red';
		}
		return 'white';
	}

	render() {
		return (
			<td>
				<div className="cell" onClick={this.handlePlayersMove}>
					<div className={this.getCellColor()}></div>
				</div>
			</td>
		);
	}
}

export default Cell;
