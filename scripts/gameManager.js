// $(function() {
	var rows = 4,
			cols = 4,
			gameManager,
			playing = false;

	// Begin Game Logic
	function init() {
		createTable(rows, cols); // Table element to display grid
		gameManager = Object.create(gameOfLifeController);
		gameManager.init(rows, cols);
		bindEventHandlers(gameManager, playing);
	}


	init();
// });
