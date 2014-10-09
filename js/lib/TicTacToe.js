define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	var TicTacToe = Backbone.Model.extend({

		initialize: function initialize(player1, player2) {
			this.set({
				player1: player1,
				player2: player2
			});
		},

		reset: function reset() {
			this.set({
				board: [
					['-', '-', '-'],
					['-', '-', '-'],
					['-', '-', '-']
				],
				isPlayer1: true
			});
		},

		run: function run() {

			this.reset();

			var currentPlayer,
				hasWinner = false;

			// While the game is not fulfilled or nobody won yet
			while(!this.isFull() && !hasWinner) {

				if(this.get('isPlayer1')) {
					currentPlayer = this.get('player1');
				}
				else {
					currentPlayer = this.get('player2');
				}

				this.togglePlayer();

				this.turn(currentPlayer);

				hasWinner = this.hasWinner();
			}

			// Says to the winner that it won,
			// so it can learn with the victory.
			// Also says to the loser that it was defeated,
			// so it can learn with the lost (poetic, hun?).
			if(hasWinner) {
				if(this.get('isPlayer1')) {
					this.get('player2').onWin(this.get('board'), this.get('player1'));
					this.get('player1').onLose(this.get('board'), this.get('player2'));

					// console.log('Player 2 won');
				}
				else {
					this.get('player1').onWin(this.get('board'), this.get('player2'));
					this.get('player2').onLose(this.get('board'), this.get('player1'));

					// console.log('Player 1 won');
				}
			}
			else {
				this.get('player1').onDraw(this.get('board'), this.get('player2'));
				this.get('player2').onDraw(this.get('board'), this.get('player1'));
				// console.log('Nobody won');
			}

			this.trigger('end');

		},

		turn: function turn(player) {

			var turn = player.getTurn(this.get('board'));

			this.get('board')[turn.row][turn.column] = player.getSymbol();

			this.trigger('update', {
				row: turn.row,
				column: turn.column,
				player: player
			});
		},

		isFull: function isFull() {

			var board = this.get('board');

			for(var i = 0; i < 3; i++) {
				for(var j = 0; j < 3; j++) {
					if(board[i][j] === '-') {
						return false;
					}
				}
			}

			return true;
		},

		togglePlayer: function togglePlayer() {
			var playerFlag = this.get('isPlayer1');

			this.set('isPlayer1', !playerFlag);
		},

		hasWinner: function hasWinner() {

			var board = this.get('board');

			// First three rows and first three columns
			if (this.check(0, 1, board)
				|| this.check(1, 1, board)
				|| this.check(2, 1, board)

				|| this.check(0, 2, board)
				|| this.check(1, 2, board)
				|| this.check(2, 2, board)) {

				return true;

			}

			// First diagonal

			var i = 0,
				j = 0;

			if (board[i][j] == board[i+1][j+1]
			&& board[i+1][j+1] == board[i+2][j+2]
			&& board[i][j] !== '-') {
				return true;
			}

			// Second diagonal
			if (board[i][j] == board[i+1][j-1]
			&& board[i+1][j-1] == board[i+2][j-2]
			&& board[i][j] !== '-') {
				return true;
			}


			return false;
		},


		/**
		 * @param  {Number} i    
		 * @param  {Number} j    
		 * @param  {Number} type says what kind of verification must be done
		 *                       1 => same row
		 *                       Otherwise => same column
		 *                       
		 * @return {Boolean}      
		 */
		check: function check(i, type, board) {
			if (type == 1) {
				if (board[i][0] == board[i][1]
				&& board[i][1] == board[i][2]
				&& board[i][0] !== '-') {

					return true;
				}
			}

			if (board[0][i] === board[1][i]
			&& board[1][i] === board[2][i]
			&& board[0][i] !== '-') {

				return true;
			}

			return false;
		}

	});

	return TicTacToe;

});