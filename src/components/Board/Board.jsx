import React from 'react';
import Cell from '../Cell';
import './Board.css';

// Create a blank 6x7 matrix
const COL = 7;
const ROW = 6;

class Board extends React.Component {
	state = {
		player1: 1,
		player2: 2,
		board: [],
		currentPlayer: 1,
		gameOver: false,
	};

	initBoard() {
		let board = [];
		for (let r = 0; r < ROW; r++) {
			let row = [];
			for (let c = 0; c < COL; c++) {
				row.push(null);
			}
			board.push(row);
		}
		this.setState({ board: board });
		this.onUpdate(board);
	}

	componentWillMount() {
		this.initBoard();
	}

	togglePlayer() {
		return this.state.currentPlayer === this.state.player1 ? this.state.player2 : this.state.player1;
	}

	resetGame(board, message) {
		this.setState({ board, gameOver: true });
		setTimeout(() => {
			alert(message);
			this.initBoard();
		}, 1000);
	}

	play = (c) => {
		if (this.state.gameOver) {
			return;
		}
		// Place piece on board
		let { board } = this.state;
		for (let r = ROW - 1; r >= 0; r--) {
			if (!board[r][c]) {
				board[r][c] = this.state.currentPlayer;
				break;
			}
		}

		// Check status of board
		let result = this.checkAll(board);
		if (result === this.state.player1) {
			this.resetGame(board, 'Player 1 (Turquoise) wins!');
		} else if (result === this.state.player2) {
			this.resetGame(board, 'Player 2 (Red) wins!');
		} else if (result === 'draw') {
			this.resetGame(board, 'Draw game');
		} else {
			this.setState({ board, currentPlayer: this.togglePlayer() });
		}
	};

	checkVertical(board) {
		// Check only if row is 3 or greater
		for (let r = 3; r < ROW; r++) {
			for (let c = 0; c < COL; c++) {
				if (board[r][c]) {
					if (board[r][c] === board[r - 1][c] && board[r][c] === board[r - 2][c] && board[r][c] === board[r - 3][c]) {
						return board[r][c];
					}
				}
			}
		}
	}

	checkHorizontal(board) {
		// Check only if column is 3 or less
		for (let r = 0; r < ROW; r++) {
			for (let c = 0; c < 4; c++) {
				if (board[r][c]) {
					if (board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] && board[r][c] === board[r][c + 3]) {
						return board[r][c];
					}
				}
			}
		}
	}

	checkDiagonalRight(board) {
		// Check only if row is 3 or greater AND column is 3 or less
		for (let r = 3; r < ROW; r++) {
			for (let c = 0; c < 4; c++) {
				if (board[r][c]) {
					if (board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3]) {
						return board[r][c];
					}
				}
			}
		}
	}

	checkDiagonalLeft(board) {
		// Check only if row is 3 or greater AND column is 3 or greater
		for (let r = 3; r < ROW; r++) {
			for (let c = 3; c < COL; c++) {
				if (board[r][c]) {
					if (board[r][c] === board[r - 1][c - 1] && board[r][c] === board[r - 2][c - 2] && board[r][c] === board[r - 3][c - 3]) {
						return board[r][c];
					}
				}
			}
		}
	}

	checkDraw(board) {
		for (let r = 0; r < ROW; r++) {
			for (let c = 0; c < COL; c++) {
				if (board[r][c] === null) {
					return null;
				}
			}
		}
		return 'draw';
	}

	checkAll(board) {
		return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
	}

	onUpdate = (newBoard) => {
		this.setState({ board: newBoard, gameOver: false, currentPlayer: 1 });
	};

	render() {
		return (
			<div className="game-container">
				<div className="player">Turn Player : {this.state.currentPlayer}</div>

				<div className="Board">
					<table>
						<tbody>
							{this.state.board.map((row, indexRow) => (
								<tr key={indexRow}>
									{row.map((cell, indexCell) => (
										<Cell key={indexCell} value={cell} columnIndex={indexCell} play={this.play} />
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Board;
