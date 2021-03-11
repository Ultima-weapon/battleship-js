// Place AI Ships
function placeAIShip(shipSize=1){
	let player = game.players[1];
	if (player.placedShips != game.numShips){
		let size = shipSize;
		//Determine orientation
		let axis = (Math.random() < 0.5 ? 'x':'y');
		let origin;
		let cells = [];
		let alreadyOccupied = false;
		//Find an empty valid location to place the ship
		while(cells.length != size || alreadyOccupied == true){
			alreadyOccupied = false;
			origin = Math.ceil(Math.random()*100)-1;
			cells = getCells(origin, axis, size);
			for (let i = 0; i < cells.length; i++){
				if (player.board.cells[cells[i]].occupied == true) {
				 	alreadyOccupied = true;
				}
			}
		}
		//Occupy the cells
		for (let i = 0; i < size; i++) {
			// Add occupied class
			$("#" + cells[i]).addClass("ship-clicked");
			// Store that these cells are occupied
			player.board.cells[cells[i]].occupied = true;
        }
		// Increment number of ships player has placed
		player.placedShips++;
		if (player.placedShips != game.numShips) {
			placeAIShip(size+1);
		} else {
			console.log(player.board.cells);
		}
	} else {
		console.log('All AI Ships have already been placed');
	}
}

