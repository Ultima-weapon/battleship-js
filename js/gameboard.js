/* -----------------------------------------------------------------------------
 *
 * File Name: gameboard.js
 * Author: (Team 7 - Project 2 Team) & (Team 3 - Original Team)
 * Assignment: EECS 448 - Project 2
 * Description: Gameboard Functions & Events
 * Date: 14 Mar 2020
 *
 ---------------------------------------------------------------------------- */

/**
* @pre None
* @post FUNCTION [getCells(cell, axis, size)]: Gets the adjacent cells when hovering or placing ships in the initial phase of the game.
* @param cell, number - The HTML ID of the origin cell
* @param axis, string - The axis of orientation. 'x' or 'y'
* @param size, number - The size of the ship currently selected.
* @return None
**/
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
* @pre None
* @post FUNCTION [getShipSize()]: Returns the size of the currently selected ship button on the page.
* @param None
* @return [number], size of currently selected ship.
**/
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
* @pre None
* @post FUNCTION [getAxis()]: Gets the currently selected axis of orientation on the page.
* @param None
* @return [string], 'x' or 'y'
**/
function getAxis()
{
    return ($("#x-axis").is(":checked") ? 'x' : 'y');
}

/**
* @pre None
* @post EVENT [onClick, ".selector-btn"]: Ship Selector button logic
* @param None
* @return None
**/
$(document).on('click', ".selector-btn", function() {
    $('#ship-selector').children('button').each(function () {
        $("#" + this.id).attr("disabled", false);
    });
    $("#" + this.id).attr("disabled", true);
});

/**
* @pre None
* @post EVENT [onMouseOver, ".board-tile"]: Show Ship Outline while placing ships
* @param None
* @return None
**/
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

/**
* @pre None
* @post EVENT [onClick, ".board-tile"]: Place Ship on the gameboard
* @param None
* @return None
**/
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
            ship_cell_ids = [];
            for (let i = 0; i < size; i++) {
                // Add occupied class
                $("#" + cells[i]).addClass("ship-clicked");
                
                // Store that these cells are occupied
                player.board.cells[cells[i]].occupied = true;
                
                // Remove ship button
                $("#btn" + size).addClass("hide");

                // Append this cell to the ship object's cells
                ship_cell_ids.push(cells[i]);
            }

            // Add a new ship reference
            player.ships[player.placedShips] = new Ship(size, ship_cell_ids);
            console.log(player.ships);

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

/**
* @pre None
* @post EVENT [onMouseLeave, ".board-tile"]: Remove classes on mouse leave
* @param None
* @return None
**/
$(document).on('mouseleave', ".board-tile", function () {
    $(".board-tile").removeClass("ship-outline");
    $(".board-tile").removeClass("ship-outline-fail");
});

// Global - Allow user input toggle.
let allowUserInput = true;

/**
* @pre None
* @post EVENT [onClick, ".firing-tile"]: Fire at enemy board
* @param None
* @return None
**/
$(document).on('click', ".firing-tile", function() {
    console.log(allowUserInput);
	if(allowUserInput){
		let cell = parseInt(this.id);
		let enemyPlayer = game.otherPlayer();
		if(enemyPlayer.board.cells[cell].missed == false && enemyPlayer.board.cells[cell].hit == false){
			allowUserInput = false;
			console.log(enemyPlayer);
			if (enemyPlayer.board.cells[cell].occupied == true) {
				enemyPlayer.board.cells[cell].hit = true;
				console.log('hit')
                // Add the new hit to the list of hits on the ship
                for (let ship of enemyPlayer.ships){
                    for (let ship_cell of ship.cells){
                        if (ship_cell == cell){
                            ship.hits.push(cell);
							if(ship.hits.length == ship.size){
								soundSunk.play();
							} else {
								soundHit.play();
							}
                        }
                    }
                }
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
						setTimeout(() => {soundPlayer1Win.play();},1500);
					} else {
						$("#player-winner").text("Player 2 Wins!");
						setTimeout(() => {soundPlayer2Win.play();},1500);
					}
					$("#win-screen").slideDown(1000);
				});
			}
			$("#axis-controls").toggle(function () {
				$('#end-turn').trigger('click');
			});
			redrawFiringBoard(enemyPlayer);
			setTimeout(() => { allowUserInput = true; }, 1000);
		};
	};
});