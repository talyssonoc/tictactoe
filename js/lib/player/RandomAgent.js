define(['player/Agent'], function(Agent) {

	var RandomAgent = function RandomAgent(symbol) {
		this.symbol = symbol;
		this.score = 0;
		this.knowledge = {};

		this.init();
	}

	RandomAgent.prototype = Object.create(Agent.prototype);

	RandomAgent.prototype.turn = function turn(board) {
		return this.getRandomTurn(board);
	};

	RandomAgent.prototype.onWin = function onWin() {
		this.score++;
	};

	RandomAgent.prototype.onDraw = function onDraw() {};

	return RandomAgent;

});