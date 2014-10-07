define([], function() {

	var Output = function Output() {

		this.element = document.createElement('table');
		this.board = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		];

		var currentRow;

		for(var i = 0; i < 3; i++) {
			currentRow = document.createElement('tr');
			this.element.appendChild(currentRow);

			for(var j = 0; j < 3; j++) {
				this.board[i][j] = document.createElement('td');
				currentRow.appendChild(this.board[i][j]);
			}
		}

		document.body.appendChild(this.element);

	}

	Output.prototype.update = function update(board, change) {
		
		this.board[change.row][change.column].innerHTML = change.player.getSymbol();

	};

	return Output;

});