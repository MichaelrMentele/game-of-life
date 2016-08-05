var gridObject = {
	init: function(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.initRows();
		this.initCols();
		this.reset();
	},
	initRows: function() {
		this.state = new Array(this.rows);
	},
	initCols: function() {
		for (var i = 0; i < this.rows; i ++) {
			this.state[i] = new Array(this.cols);
		}
	},
	reset: function(){
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; i < this.cols; i++) {
				this.state[i][j] = 0;
			}
		}
	},
}

// Extends gridObject
var gridOfLifeObject = Object.create(gridObject);

gridOfLifeObject.countNeighbors = function(row, col) {
	// counts the neighbors of a given cell in the grid
	var num_neighbors = 0;

	for (var i = row - 1; i <= row + 1; i++) {
		for (var j = col - 1; j <= col + 1; j++) {
			// Don't count current cell as a neighbor
			// !!! This if statement sucks, refactor please
			if (i == row && j == col) {
				num_neighbors += 0;
			// if you are off the grid do nothing
			} else if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
				num_neighbors += 0;
			} else if (this.state[i][j] == 1){
				num_neighbors += 1;
			}
		}
	}
	return num_neighbors;
};

gridOfLifeObject.isAlive = function(row, col) {
		return this.state[row][col] == 1;
}

