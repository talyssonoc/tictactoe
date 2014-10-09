define(['player/Player'], function(Player) {

	var Agent = function Agent() {
		Player.apply(this, arguments);

		var knowledge = prompt('Current knowledge');

		if(knowledge) {
			this.knowledge = JSON.parse(knowledge);
		}
		else {
			this.knowledge = {};
		}


		this.init();
	}

	Agent.prototype = Object.create(Player.prototype);

	Agent.prototype.turn = function turn(board, output) {

		var currentBoard = this.linearize(board);

		// If already knows how to play given the current board, use it.
		// Otherwise, it gets a random turn.

		var turn = this.knowledge[currentBoard];

		if(!turn) {
			turn = this.getRandomTurn(board);
			// console.log('Random');
		}/*
		else {
			console.log('Knowledge');
		}*/

		turn.linearizedBoard = currentBoard;

		return turn;

	};

	Agent.prototype.onWin = function onWin(board, oponent) {
		this.score++;
		
		this.learn(this.currentGame);
	};

	Agent.prototype.onDraw = function onDraw(board, oponent) {
		this.learn(this.currentGame);
	};

	Agent.prototype.onLose = function onLose(board, oponent) {
		this.learn(this.inverseSteps(oponent.currentGame));
	};

	Agent.prototype.learn = function learn(gameSteps) {
		for(var t in gameSteps) {
			// if(this.currentGame.hasOwnProperty(t)) {
				this.knowledge[t] = gameSteps[t];
			// }
		}

		this.knowledge['---------'] = false;
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

	Agent.prototype.inverseSteps = function inverseSteps(gameSteps) {
		var matrix,
			invertedSteps = {};

		for(var step in gameSteps) {
			invertedSteps[this.inverseSingleStep(step)] = gameSteps[step];
		}

		return inverseSteps;
	};

	Agent.prototype.inverseSingleStep = function inverseSingleStep(singleStep) {
		var invertedStep = singleStep + '';

		for(var i in invertedStep) {
			if(invertedStep[i] !== '-') {
				invertedStep[i] = (invertedStep[i] == 'x' ? 'o' : 'x');
			}
		}

		return invertedStep;
	};

	return Agent;

});