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
			tr.appendChild(cell);
		}
		$table.append(tr)
	}
}

function kill(cell) {
	cell.setAttribute("class", "dead");
}

function play(gameManager) {
	gameManager.computeNextGen();
	gameManager.copyAndResetGrid();
	gameManager.updateView();
}

// !!! Needs refactoring, don't like the gamemanager being passed in
// also don't like use of the 'playing' global
function bindEventHandlers(gameManager, playing) {
	$("td").on("click", function(event){
		var rowcol = this.id.split("_");
		var row = rowcol[0];
		var col = rowcol[1];
		console.log("fired");
		var classes = this.getAttribute("class");
		if (classes.indexOf("live") > -1) {
			this.setAttribute("class", "dead");
			gameManager.grid.state[row][col] = 0;
		} else {
			this.setAttribute("class", "live");
			gameManager.grid.state[row][col] = 1;
		}
	});

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
			play(gameManager);
		}
	});
}