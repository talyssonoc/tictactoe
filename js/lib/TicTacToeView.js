define(['jquery', 'underscore', 'backbone', 'player/User', 'player/RandomAgent'], function($, _, Backbone, User, RandomAgent) {

	var TicTacToeView = Backbone.View.extend({

		initialize: function initialize() {
			this.model.set('show', false);
			this.cont = true;
		},

		run: function run() {

			this.prepare();

			this.listenTo(this.model, 'update', this.update);
			// this.listenTo(this.model, 'end', this.end);

			this.model.run();

			// this.showKnowledge();

		},

		prepare: function prepare() {
			if(this.model.get('show')) {
				this.$el.empty();

				this.$el.append('<tr><td id="00"></td><td id="01"></td><td id="02"></td></tr>');
				this.$el.append('<tr><td id="10"></td><td id="11"></td><td id="12"></td></tr>');
				this.$el.append('<tr><td id="20"></td><td id="21"></td><td id="22"></td></tr>');
			}
		},

		update: function update(turn) {
			if(this.model.get('show')) {
				this.$el.find('#' + turn.row + turn.column).text(turn.player.getSymbol());
			}
		},

		count: function count() {
			return Object.keys(this.model.get('player1').knowledge).length;
		},

		showKnowledge: function showKnowledge() {
			console.log(this.model.get('player1').knowledge)
		},

		preparePlayAgainst: function preparePlayAgainst() {
			this.model.set('player2', new User('o'));
		},

		prepareTrain: function prepareTrain() {
			this.model.set('player2', new RandomAgent('o'));
		}

	});

	return TicTacToeView;

});