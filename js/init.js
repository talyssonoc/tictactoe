requirejs.config({
    baseUrl: 'js/lib',

    paths: {
    	jquery: 'libs/jquery',
    	backbone: 'libs/backbone',
    	underscore: 'libs/underscore'
    }
});

requirejs(['TicTacToe', 'player/User', 'player/Agent', 'player/RandomAgent', 'TicTacToeView'],
	function(TicTacToe, User, Agent, RandomAgent, TicTacToeView) {

	// var player1 = new User('x'),
	var player1 = new Agent('x'),
		player2 = new RandomAgent('o');

	var model = new TicTacToe(player1, player2);

	window.game = new TicTacToeView({
		el: document.getElementById('table'),
		model: model
	});


	document.train = function train() {
		game.model.set('show', false);

		game.prepareTrain();

		var games = 0;

		while(games++ < 1000) {
			// console.log(games++, 'generations. ', game.count(), 'games learned');
			game.run();
			console.log(game.count());
			// console.log(games++, ':', game.count(), model.get('player1').score, 'x', model.get('player2').score);
		}

		console.log(Object.keys(game.model.get('player1').knowledge));
	}

	document.playAgainst = function playAgainst() {
		game.model.set('show', true);

		game.preparePlayAgainst();

		game.run();
	}

});