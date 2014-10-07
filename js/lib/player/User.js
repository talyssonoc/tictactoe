define(['player/Player'], function(Player) {

	var User = function User() {
		Player.apply(this, arguments);
	}

	User.prototype = Object.create(Player.prototype);

	User.prototype.turn = function turn(board, output) {
		var input = prompt('row column').split(/\s+/);

		return {
			row: parseInt(input[0]),
			column: parseInt(input[1])
		}
	};

	return User;

});