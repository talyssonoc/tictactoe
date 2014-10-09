define(['player/Agent'], function(Agent) {

	var RandomAgent = function RandomAgent() {
		Agent.apply(this, arguments);
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