define([], function() {

	var Player = function Player(symbol) {
		this.symbol = symbol;
		this.score = 0;

		this.init();
	};

	Player.prototype.init = function init() {
		this.currentGame = {};
	};
	
	Player.prototype.getSymbol = function getSymbol() {
		return this.symbol;
	};

	Player.prototype.getTurn = function getTurn(board) {
		var turn = this.turn(board),
			linearizedBoard = turn.linearizedBoard || this.linearize(board);

		this.currentGame[linearizedBoard] = {
			row: turn.row,
			column: turn.column
		};

		return turn;
	};

	Player.prototype.linearize = function linearize(matrix) {
		return matrix.map(function(line) {
			return line.join('');
		}).join('');
	};

	Player.prototype.onWin = function onWin(board) {
		this.score++;
	};

	Player.prototype.onLose = function onLose(board) {};

	Player.prototype.onDraw = function onDraw(board) {};

	return Player;
});