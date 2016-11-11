var gameOfLifeController = {
	init: function(rows, cols) {
		this.grid = this.initializeGrid(rows, cols);
		this.nextGrid = this.initializeGrid(rows, cols);
	},
	initializeGrid: function(rows, cols) {
		var grid = Object.create(gridOfLifeObject);
		grid.init(rows, cols);
		return grid;
	},
	copyAndResetGrid: function() {
		// Refactor to use iterator funciton
		for (var i = 0; i < this.grid.rows; i++) {
			for (var j = 0; i < this.grid.cols; i++) {
				this.grid.state[i][j] = this.nextGrid.state[i][j];
				this.nextGrid.state[i][j] = 0;
			}
		}
	},
	computeNextGen: function() {
		// Refactor to use iterator function
		for (var i = 0; i < this.grid.rows; i++) {
			for (var j = 0; j < this.grid.cols; j++) {
				this.applyRules(i, j);
			}
		}
	},
	applyRules: function(row, col){ // row and col refer to a particular cell coordinates
		// RULES
		// Any live cell with < two live neighbors dies
		// Any live cell with 2 or 3 live neighbors lives on
		// Any live cell with > 3 live neighbors dies
		// Any dead cell with 3 live neighbors becomes live
		var num_neighbors = this.grid.countNeighbors(row, col);

		if (this.grid.isAlive(row, col)) {
			if (num_neighbors < 2) {
				this.nextGrid.state[row][col] = 0;
			} else if (num_neighbors === 2 || num_neighbors === 3) {
				this.nextGrid.state[row][col] = 1;
			} else if (num_neighbors > 3) {
				this.nextGrid.state[row][col] = 0;
			}
		} else if (!this.grid.isAlive(row, col)) {
			if (num_neighbors === 3) {
				this.nextGrid.state[row][col] = 1;
			}
		}
	},
	updateView: function() {
		// !!! Refactor to use iterator function
		for (var i = 0; i < this.grid.rows; i++) {
			for (var j = 0; i < this.grid.cols; i++) {
				var cell = document.getElementById(i + "_" + j);
				if (this.grid.isAlive(i, j)) { cell.setAttribute("class", "live"); } 
				else { cell.setAttribute("class", "dead"); }
			}
		}
	},
}


