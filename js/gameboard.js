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
$(document).on('click', ".firing-tile", function() {
    let cell = parseInt(this.id);

    let enemyPlayer = game.otherPlayer();

    console.log(enemyPlayer);


    let isAHit = false;
    if (enemyPlayer.board.cells[cell].occupied == true) {
        isAHit = true;
        enemyPlayer.board.cells[cell].hit = true;
        console.log('hit')
    }
    else if(enemyPlayer.board.cells[cell].missed==true){
        
    }
    else{
        isAHit = false;
        enemyPlayer.board.cells[cell].missed = true;
        $("#axis-controls").toggle(function () {
            $("#end-turn").fadeIn(400);
            $('#end-turn').trigger('click');
        });
    }

    enemyPlayer.board.cells[cell].hit = isAHit;
    enemyPlayer.board.cells[cell].missed = !isAHit;



    let numberOfShips = parseInt($("#no-of-ships").val());
    count=0;
    for (let i = 0; i < 100; i++) {//
        if($("#firing-board").find("#" + i).hasClass("hit")){
            count++;
        }
    }
    if(numberOfShips==1){
        if(count==1){
            alert('winner')
        }
    }else if(numberOfShips==2){
        if(count==2){
            alert('winner')
        }
    }else if(numberOfShips==3){
        if(count==5){
            alert('winner')
        }
    }else if(numberOfShips==4){
        if(count==9){
            alert('winner')
        }
    }else if(numberOfShips==5){
        if(count==14){
            alert('winner')
        }
    }else if(numberOfShips==6){
        if(count==20){
            alert('winner')
        }
    }
    //$("#firing-board").find("#" + cell).addClass("hit");
    redrawFiringBoard(enemyPlayer);
});



