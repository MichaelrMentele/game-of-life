$(function() {
	var rows = 4,
			cols = 4,
			playing = false;

	function initializeGrids() {
		grid = Object.create(gridOfLifeObject);
		grid.init(rows, cols);

		nextGrid = Object.create(gridOfLifeObject);
		nextGrid.init(rows, cols);
	}

	function copyAndResetGrid() {
		for (var i = 0; i < rows; i++) {
			for (var j = 0; i < cols; i++) {
				grid.state[i][j] = nextGrid.state[i][j];
				nextGrid.state[i][j] = 0;
			}
		}
	}

	// Begin Game Logic
	function init() {
		createTable(rows, cols);
		initializeGrids();
	}

	function createTable(rows, cols) {
		var gridContainer = $("#gridContainer")

		if (!gridContainer) {
			console.log("Error: no div for the grid table.");
		}
		
		gridContainer.append("<table></table>")
		createCells(rows, cols);
	}

	function createCells(rows, cols) {
		var $table = $("table");

		for (var i = 0; i < rows; i++) {
			var tr = document.createElement("tr");
			for (var j = 0; j < cols; j++) {
				var cell = document.createElement("td");
				cell.setAttribute("id", i + "_" + j);
				cell.setAttribute("class", "dead");
				cell.onclick = cellClickHandler;
				tr.appendChild(cell);
			}
			$table.append(tr)
		}
	}

	function cellClickHandler() {
		var rowcol = this.id.split("_");
		var row = rowcol[0];
		var col = rowcol[1];

		var classes = this.getAttribute("class");
		if (classes.indexOf("live") > -1) {
			this.setAttribute("class", "dead");
			grid.state[row][col] = 0;
		} else {
			this.setAttribute("class", "live");
			grid.state[row][col] = 1;
		}
	}

	function kill(cell) {
		cell.setAttribute("class", "dead");
	}

	function play() {
		computeNextGen();
		copyAndResetGrid();
		updateView();
	}

	function computeNextGen() {
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < cols; j++) {
				applyRules(i, j);
			}
		}
	}

	// RULES
	// Any live cell with < two live neighbors dies
	// Any live cell with 2 or 3 live neighbors lives on
	// Any live cell with > 3 live neighbors dies
	// Any dead cell with 3 live neighbors becomes live
	function applyRules(row, col) {
		var num_neighbors = grid.countNeighbors(row, col);
		if (grid.isAlive(row, col)) {
			if (num_neighbors < 2) {
				nextGrid.state[row][col] == 0;
			} else if (num_neighbors == 2 || num_neighbors == 3) {
				nextGrid.state[row][col] == 1;
			} else if (num_neighbors > 3) {
				nextGrid.state[row][col] = 0;
			}
		} else if (!grid.isAlive(row, col)) {
			if (num_neighbors == 3) {
				nextGrid.state[row][col] = 1;
			}
		}
	}
	
	function updateView() {
		for (var i = 0; i < rows; i++) {
			for (var j = 0; i < cols; i++) {
				var cell = document.getElementById(i + "_" + j);
				if (grid.state[i][j] == 0) {
					cell.setAttribute("class", "dead");
				} else {
					cell.setAttribute("class", "live");
				}
			}
		}
	}

	//////////////
	// HANDLERS //
	//////////////

	$("#clear").on("click", function(event) {
		event.preventDefault();
		playing = false;

		$("td").each(function(idx, cell){
			kill(cell);
		})
	});

	$("#start").on("click", function(event){
		event.preventDefault();

		if (playing) {
			console.log("Paused.")
			playing = false;
			this.innerHTML = "Continue";
		} else {
			console.log("Continue the game");
			playing = true;
			this.innerHTML = "Pause";
			play();
		}
		
	});

	init();
});
