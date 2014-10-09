requirejs.config({
    baseUrl: 'js/lib',

    paths: {
    	jquery: 'libs/jquery',
    	backbone: 'libs/backbone',
    	underscore: 'libs/underscore'
    }
});

requirejs(['TicTacToe', 'player/User', 'player/Agent', 'TicTacToeView'],
	function(TicTacToe, User, Agent,  TicTacToeView) {

	// var player1 = new User('x'),
	var player1 = new Agent('x'),
		player2 = new Agent('o');

	var model = new TicTacToe(player1, player2);

	window.game = new TicTacToeView({
		el: document.getElementById('table'),
		model: model
	});

	var games = 0;

	while(games++ < 50000/*game.count() < 100*/) {
		// console.log(games++, 'generations. ', game.count(), 'games learned');
		game.run();
		console.log(games++, ':', game.getCounts(), model.get('player1').score, 'x', model.get('player2').score);
	}

	console.log(Object.keys(game.model.get('player1').knowledge));
	console.log(Object.keys(game.model.get('player2').knowledge));

});