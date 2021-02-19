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
    let cell = parseInt(this.id);
    // Grab axis control from radio buttons
    let axis = ($("#x-axis").is(":checked") ? 'x' : 'y');
    // Grab size from buttons
    let size = getShipSize();
    // Grab occupied cells
    let cells = getCells(cell, axis, size);

    console.log(cells);

    if (cells.length == size)
    {
        for (let i = 0; i < size; i++)
            $("#" + cells[i]).addClass("ship-outline");
    } else {
        for (let i = 0; i < size; i++)
            $("#" + cells[i]).addClass("ship-outline-fail");
    }
});

// Keeping ships placed
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

    console.log(cells);
    console.log(newShip);
    console.log(player1);
});

// Remove classes on mouse leave
$(document).on('mouseleave', ".board-tile", function () {
    $(".board-tile").removeClass("ship-outline");
    $(".board-tile").removeClass("ship-outline-fail");
});