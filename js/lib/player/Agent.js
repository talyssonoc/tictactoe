define(['player/Player'], function(Player) {

	var Agent = function Agent() {
		Player.apply(this, arguments);

		this.knowledge = {};

		this.init();
	}

	Agent.prototype = Object.create(Player.prototype);

	Agent.prototype.turn = function turn(board, output) {

		var currentBoard = this.linearize(board);

		// If the agent already knows how to play given the current board's state, use it.
		// Otherwise, it gets a random turn.

		var turn = this.knowledge[currentBoard];

		if(!turn) {
			turn = this.getRandomTurn(board);
		}

		this.currentGame[currentBoard] = turn;

		return turn;

	};

	Agent.prototype.init = function init() {
		this.currentGame = {};
	};

	Agent.prototype.onWin = function onWin(board) {
		for(var t in this.currentGame) {
			if(this.currentGame.hasOwnProperty(t)) {
				this.knowledge[t] = this.currentGame[t];
			}
		}
	};

	Agent.prototype.linearize = function linearize(matrix) {
		return matrix.map(function(line) {
			return line.join('');
		}).join('');
	};

	Agent.prototype.getRandomTurn = function getRandomTurn(board) {
		var availablePositions = [];

		for(var i = 0; i < board.length; i++) {
			for(var j = 0; j < board[i].length; j++) {
				if(board[i][j] === '-') {
					availablePositions.push({
						row: i,
						column: j
					});
				}
			}
		}

		return availablePositions[Math.floor(Math.random() * availablePositions.length)];
	}

	return Agent;

});