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
				}
				else {
					this.player1.onWin();
					this.player2.onLose();
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

		/** 
		 * @TODO implement it
		 */
		hasWinner: function hasWinner() {
			
			return false;
		}

	};

	return TicTacToe;

});