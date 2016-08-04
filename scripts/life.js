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
		for (var i = 0; i < rows; i++) {
			for (var j = 0; i < cols; i++) {
				this.grid.state[i][j] = this.nextGrid.state[i][j];
				this.nextGrid.state[i][j] = 0;
			}
		}
	},
	computeNextGen: function() {
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				this.applyRules(i, j);
			}
		}
	},
	applyRules: function(row, col){
		// RULES
		// Any live cell with < two live neighbors dies
		// Any live cell with 2 or 3 live neighbors lives on
		// Any live cell with > 3 live neighbors dies
		// Any dead cell with 3 live neighbors becomes live
		var num_neighbors = this.grid.countNeighbors(row, col);

		if (this.grid.isAlive(row, col)) {
			if (num_neighbors < 2) {
				this.nextGrid.state[row][col] == 0;
			} else if (num_neighbors == 2 || num_neighbors == 3) {
				this.nextGrid.state[row][col] == 1;
			} else if (num_neighbors > 3) {
				this.nextGrid.state[row][col] = 0;
			}
		} else if (!this.grid.isAlive(row, col)) {
			if (num_neighbors == 3) {
				this.nextGrid.state[row][col] = 1;
			}
		}
	},
}






	// // Begin Game Logic
	// function init() {
	// 	createTable(rows, cols);
	// 	initializeGrids();
	// }

	// function createTable(rows, cols) {
	// 	var gridContainer = $("#gridContainer")

	// 	if (!gridContainer) {
	// 		console.log("Error: no div for the grid table.");
	// 	}
		
	// 	gridContainer.append("<table></table>")
	// 	createCells(rows, cols);
	// }

	// function createCells(rows, cols) {
	// 	var $table = $("table");

	// 	for (var i = 0; i < rows; i++) {
	// 		var tr = document.createElement("tr");
	// 		for (var j = 0; j < cols; j++) {
	// 			var cell = document.createElement("td");
	// 			cell.setAttribute("id", i + "_" + j);
	// 			cell.setAttribute("class", "dead");
	// 			cell.onclick = cellClickHandler;
	// 			tr.appendChild(cell);
	// 		}
	// 		$table.append(tr)
	// 	}
	// }

	// function cellClickHandler() {
	// 	var rowcol = this.id.split("_");
	// 	var row = rowcol[0];
	// 	var col = rowcol[1];

	// 	var classes = this.getAttribute("class");
	// 	if (classes.indexOf("live") > -1) {
	// 		this.setAttribute("class", "dead");
	// 		grid.state[row][col] = 0;
	// 	} else {
	// 		this.setAttribute("class", "live");
	// 		grid.state[row][col] = 1;
	// 	}
	// }

	// function kill(cell) {
	// 	cell.setAttribute("class", "dead");
	// }

	// function play() {
	// 	computeNextGen();
	// 	copyAndResetGrid();
	// 	updateView();
	// }

	
	// function updateView() {
	// 	for (var i = 0; i < rows; i++) {
	// 		for (var j = 0; i < cols; i++) {
	// 			var cell = document.getElementById(i + "_" + j);
	// 			if (grid.state[i][j] == 0) {
	// 				cell.setAttribute("class", "dead");
	// 			} else {
	// 				cell.setAttribute("class", "live");
	// 			}
	// 		}
	// 	}
	// }