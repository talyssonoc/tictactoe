define([], function() {

	var Player = function Player(symbol) {
		this.symbol = symbol;
	};

	Player.prototype.getSymbol = function getSymbol() {
		return this.symbol;
	};

	Player.prototype.init = function init() {};

	Player.prototype.onWin = function onWin(board) {};
	Player.prototype.onLose = function onLose(board) {};

	return Player;
});