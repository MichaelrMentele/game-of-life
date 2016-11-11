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
	// !!! Not tested
	iterate2D: function(callback) {
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				callback(i, j);
			}
		}
	}
}

////////////////////////
// Extends gridObject //
////////////////////////
var gridOfLifeObject = Object.create(gridObject);

gridOfLifeObject.countNeighbors = function(row, col) {
	// counts the neighbors of a cell in the grid
	var num_neighbors = 0;

	for (var i = row - 1; i <= row + 1; i++) {
		for (var j = col - 1; j <= col + 1; j++) {
			if (!this.isOffGrid(i, j) && 
					this.isAlive(i, j) &&
				 	!this.isCurrentCell(row, col, i, j)) 
			{
				num_neighbors += 1;
			}
		}
	}
	console.log("Cell [" + row + "][" + col + "] has " + num_neighbors);
	return num_neighbors;
};

gridOfLifeObject.isAlive = function(row, col) {
	return this.state[row][col] === 1;
};

gridOfLifeObject.setCell = function(row, col) {
	this.state[row][col] = 1;
};

gridOfLifeObject.killCell = function(row, col) {
	this.state[row][col] = 0;
};

gridOfLifeObject.isOffGrid = function(row, col) {
	return (( row < 0 || row >= this.rows ) || ( col < 0 || col >= this.cols ))
};

gridOfLifeObject.isCurrentCell = function(row, col, i, j) {
	return (i === row && j === col)
};