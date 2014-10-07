requirejs.config({
    baseUrl: 'js/lib'
});

requirejs(['TicTacToe', 'player/User', 'player/Agent', 'output/Output'], function(TicTacToe, User, Agent, Output) {

	var player1 = new User('x'),
		player2 = new Agent('o'),
		output = new Output();

	var game = new TicTacToe(player1, player2, output);
	game.run();

});