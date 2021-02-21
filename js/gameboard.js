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

/*
// Keeping ships placed and checking if turn is over
$(document).on('click', ".board-tile", function() {
    let player = game.currentPlayer();
    if (player.placedShip == game.numShips) {
        console.log("Stop placing ships.");
    } else {
        // State 1: Placing ships
        if (game.state == 1)
        {
            // Grab cell number
            let cell = parseInt(this.id);
            // Grab ship size
            let shipSize = getShipSize();
            // Grab orientation
            let axis = ($("#x-axis").is(":checked") ? 'x' : 'y');
            // Grab cells
            let cells = getCells(cell, axis, shipSize);
            // Check if these cells are already occupied
            let alreadyOccupied = false;
            for (let i = 0; i < cells.length; i++)
                if (player.board.cells[cells[i]].occupied == true)
                    alreadyOccupied = true;
            // Add occupied cells to the player's board object if it's successful
            if (cells.length == shipSize) {
                for (let i = 0; i < cells.length; i++) {
                    player.board.cells[cells[i]].occupied = true;
                }
                // Increment number of ships player has placed
                player.placedShips += 1;
                // Remove button for this ship if it is successful
                $("#btn" + shipSize).addClass("hide");
                // Create ship and add it to player
                let newShip = new Ship(shipSize, cells);
                player.ships.push(newShip);   
            }
            // Update the board
            redrawBoard(player);
            // Check if all ships placed
            if (player.placedShips == game.numShips)
                $("#end-turn").show();
        } else  {
            console.log("Not placing anymore stop it.");
        }
    }
});
*/
/*
// Keeping ships placed and checking if turn is over
$(document).on('click', ".board-tile", function() {
    // Grab cell number
    let cell = parseInt(this.id);
    // Grab ship size
    let shipSize = getShipSize();
    // Grab orientation
    let axis = ($("#x-axis").is(":checked") ? 'x' : 'y');

    let cells = getCells(cell, axis, shipSize);

    let newShip = new Ship(shipSize, cells);

    if (cells && shipSize != 0) {
        if (player1.isTurn) {
            player1.ships.push(newShip);
        } else {
            player2.ships.push(newShip);
        }
    }

    if (cells.length == shipSize)
    {
        for (let i = 0; i < cells.length; i++)
        {
            // Add class to keep track of ships
            $("#" + newShip.cells[i]).addClass("ship-clicked");
        }

        // Remove button from ship
        $("#btn" + shipSize).addClass("hide");
    }

    redrawBoard(player1);

    // Check if turn is over
    let turnOver = false;
    if (player1.isTurn && player1.ships.length == $(".selector-btn").length)
        turnOver = true;
    if (player2.isTurn && player2.ships.length == $(".selector-btn").length)
        turnOver = true;

    if (turnOver)
        $("#end-turn").show();
});
*/
// Remove classes on mouse leave
$(document).on('mouseleave', ".board-tile", function () {
    $(".board-tile").removeClass("ship-outline");
    $(".board-tile").removeClass("ship-outline-fail");
});




