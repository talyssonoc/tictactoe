define([], function() {

	var Player = function Player(symbol) {
		this.symbol = symbol;
		this.score = 0;
	};

	Player.prototype.getSymbol = function getSymbol() {
		return this.symbol;
	};

	Player.prototype.init = function init() {};

	Player.prototype.onWin = function onWin(board) {
		this.score++;
	};

	Player.prototype.onLose = function onLose(board) {};

	Player.prototype.onDraw = function onDraw(board) {};

	return Player;
});