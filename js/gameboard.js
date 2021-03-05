/**
 * Gets the adjacent cells when hovering or placing ships in the initial phase of the game.
 * @param {number} cell - The HTML ID of the origin cell
 * @param {char} axis - The axis of orientation. 'x' or 'y'
 * @param {number} size - The size of the ship currently selected.
 */
function getCells(cell, axis, size)
{
    let cells = [];

    if (axis == 'x')
    {
        // Show cells horizontally

        for (let i = 0; i < size; i++)
        {
            let adjCell = cell + i;
            if ((adjCell % 10) >= cell % 10)
                cells.push(adjCell);
        }
    }
    else
    {
        // Show cells vertically
        for (let i = 0; i < size; i++)
        {
            let adjCell = parseInt(cell) + parseInt(i)*10;
            if (adjCell < 100)
                cells.push(adjCell);
        }
    }

    return cells;
}

/**
 * Returns the size of the currently selected ship button on the page.
 * @returns {number} - (Integer) the size of the ship
 */
function getShipSize()
{
    let shipSize = 0;
    $('#ship-selector').children('button').each(function () {
        if ($('#' + this.id).is(":disabled") && !$('#' + this.id).hasClass("hide")) {
            shipSize = (this.id).slice(3);
        }
    });

    return parseInt(shipSize);
}

/**
 * Gets the currently selected axis of orientation on the page.
 * @returns {char} - 'x' or 'y'
 */
function getAxis()
{
    return ($("#x-axis").is(":checked") ? 'x' : 'y');
}

// Selector button logic
$(document).on('click', ".selector-btn", function() {
    $('#ship-selector').children('button').each(function () {
        $("#" + this.id).attr("disabled", false);
    });
    $("#" + this.id).attr("disabled", true);
});

// Showing ship outline
$(document).on('mouseover', ".board-tile", function() {
    // Set cell to the ID of td being hovered
    let origin = parseInt(this.id);

    // Grab axis control from radio buttons
    let axis = ($("#x-axis").is(":checked") ? 'x' : 'y');
    
    // Grab size from buttons
    let size = getShipSize();
    // Grab occupied cells
    let cells = getCells(origin, axis, size);

    // Grab current player
    let player = game.currentPlayer();

    // Check if these cells are already occupied
    let alreadyOccupied = false;
    for (let i = 0; i < cells.length; i++)
        if (player.board.cells[cells[i]].occupied == true)
            alreadyOccupied = true;

    if (cells.length == size && alreadyOccupied == false)
    {
        for (let i = 0; i < size; i++)
            $("#" + cells[i]).addClass("ship-outline");
    } else {
        for (let i = 0; i < size; i++)
            $("#" + cells[i]).addClass("ship-outline-fail");
    }
});

// Placement of ships
$(document).on('click', ".board-tile", function() {
    let player = game.currentPlayer();

    // Check if player has any ships left to place
    if (player.placedShips != game.numShips)
    {
        // Grab origin cell
        let origin = parseInt(this.id);
        // Grab ship size
        let size = getShipSize();
        // Grab orientation
        let axis = getAxis();
        // Grab list of cells
        let cells = getCells(origin, axis, size);
        // Grab current player
        let player = game.currentPlayer();
        // Check if these cells are already occupied
        let alreadyOccupied = false;
        for (let i = 0; i < cells.length; i++)
            if (player.board.cells[cells[i]].occupied == true)
                alreadyOccupied = true;

        // If the ship is the right size and none of the cells are occupied, occupy them
        if (cells.length == size && alreadyOccupied == false && size != 0)
        {
            for (let i = 0; i < size; i++) {
                // Add occupied class
                $("#" + cells[i]).addClass("ship-clicked");
                
                // Store that these cells are occupied
                player.board.cells[cells[i]].occupied = true;
                
                // Remove ship button
                $("#btn" + size).addClass("hide");
            }
            // Increment number of ships player has placed
            player.placedShips++;

            // Check if turn is over
            if (player.placedShips == game.numShips) {
                // Hide placement options
                $("#axis-controls").toggle(function () {
                    $("#end-turn").fadeIn(400);
                });
            }
        } else {
            // Failure to place ship
            console.log("Can not place ship. Cell already occupied or no ship size selected.");
        }
    } else {
        console.log("Don't place any ships.");
    }
});

// Remove classes on mouse leave
$(document).on('mouseleave', ".board-tile", function () {
    $(".board-tile").removeClass("ship-outline");
    $(".board-tile").removeClass("ship-outline-fail");
});

// Firing at enemy board
let allowUserInput = true;
$(document).on('click', ".firing-tile", function() {
	if(allowUserInput){
		allowUserInput = false;
		let cell = parseInt(this.id);
		let enemyPlayer = game.otherPlayer();
		console.log(enemyPlayer);
		if (enemyPlayer.board.cells[cell].occupied == true) {
			enemyPlayer.board.cells[cell].hit = true;
			soundHit.play();
			console.log('hit')
		} else {
			enemyPlayer.board.cells[cell].missed = true;
			soundMiss.play();
			console.log('miss')
		}
		if (game.checkWinCondition(enemyPlayer)) {
			game.state = 3;

			$("#board-space").slideUp(1000, function() {
				if (game.players[0].isTurn)
				{
					$("#player-winner").text("Player 1 Wins!");
					soundPlayer1Win.play();
				} else {
					$("#player-winner").text("Player 2 Wins!");
					soundPlayer2Win.play();
				}

				$("#win-screen").slideDown(1000);
			});
		}
		$("#axis-controls").toggle(function () {
			// $("#end-turn").fadeIn(400);
			$('#end-turn').trigger('click');
		});
		redrawFiringBoard(enemyPlayer);
		setTimeout(() => { allowUserInput = true; }, 1000);
	};
});



