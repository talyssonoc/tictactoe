define([], function() {

	var TicTacToe = function TicTacToe(player1, player2, output) {
		this.player1 = player1;
		this.player2 = player2;
		this.output = output;

		this.isPlayer1 = true;
		this.board = [
			['-', '-', '-'],
			['-', '-', '-'],
			['-', '-', '-']
		];
	};

	TicTacToe.prototype = {
		
		run: function run() {

			var currentPlayer,
				hasWinner = false;

			// While the game is not fulfilled or nobody won yet
			while(!this.isFull() && !hasWinner) {

				if(this.isPlayer1) {
					currentPlayer = this.player1;
				}
				else {
					currentPlayer = this.player2;
				}

				this.isPlayer1 = !this.isPlayer1;

				this.turn(currentPlayer);

				hasWinner = this.hasWinner();
			}

			// Says to the winner that it won,
			// so it can learn with the victory.
			// Also says to the loser that it was defeated,
			// so it can learn with the lost (poetic, hun?).
			if(hasWinner) {
				if(this.isPlayer1) {
					this.player2.onWin();
					this.player1.onLose();

					console.log('Player 2 won');
				}
				else {
					this.player1.onWin();
					this.player2.onLose();

					console.log('Player 1 won');
				}
			}
		},

		turn: function turn(player) {

			var turn = player.turn(this.board, this.output);

			this.board[turn.row][turn.column] = player.getSymbol();

			this.output.update(this.board, {
				row: turn.row,
				column: turn.column,
				player: player
			});
		},

		isFull: function isFull() {

			for(var i = 0; i < 3; i++) {
				for(var j = 0; j < 3; j++) {
					if(this.board[i][j] === '-') {
						return false;
					}
				}
			}

			return true;
		},

		hasWinner: function hasWinner() {

			// First three rows and first three columns
			if (this.check(0, 1)
				|| this.check(1, 1)
				|| this.check(2, 1)

				|| this.check(0, 2)
				|| this.check(1, 2)
				|| this.check(2, 2)) {

				return true;

			}

			// First diagonal

			var i = 0,
				j = 0;

			if (this.board[i][j] == this.board[i+1][j+1]
			&& this.board[i+1][j+1] == this.board[i+2][j+2]
			&& this.board[i][j] !== '-') {
				return true;
			}

			// Second diagonal
			if (this.board[i][j] == this.board[i+1][j-1]
			&& this.board[i+1][j-1] == this.board[i+2][j-2]
			&& this.board[i][j] !== '-') {
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
		check: function check(i, type) {
			if (type == 1) {
				if (this.board[i][0] == this.board[i][1]
				&& this.board[i][1] == this.board[i][2]
				&& this.board[i][0] !== '-') {

					return true;
				}
			}

			if (this.board[0][i] === this.board[1][i]
			&& this.board[1][i] === this.board[2][i]
			&& this.board[0][i] !== '-') {

				return true;
			}

			return false;
		}

	};

	return TicTacToe;

});