function checkIfLegal(origin, orientation, size)
{
    size = parseInt(size);
    if (orientation == 'x')
    {
        // Check for bounds horizontally
        return ((origin % 10) + size < 11);
    }
    else
    {
        // Check for bounds vertically
        return ((Math.floor(origin / 10) + size < 11));
    }
}

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

    if (cells.length == size)
        return cells;
    else
        return false;
}

function getShipSize()
{
    let shipSize = 0;
    $('#ship-selector').children('button').each(function () {
        if ($('#' + this.id).is(":disabled")) {
            shipSize = (this.id).slice(3);
        }
    });

    return (shipSize);
}

// Selector button logic
$(document).on('click', ".selector-btn", function() {
    $('#ship-selector').children('button').each(function () {
        $("#" + this.id).attr("disabled", false);
    });
    $("#" + this.id).attr("disabled", true);
});

// Placing ships
$(document).on('click', ".board-tile", function() {
    let size= 0;
    let axis = ($("#x-axis").is(":checked")) ? 'x' : 'y';
    $('#ship-selector').children('button').each(function () {
        if ($('#' + this.id).is(":disabled")) {
            size = (this.id).slice(3);
        }
    });
    let newShip = new Ship(parseInt(size), axis, this.id);

    if (checkIfLegal(this.id, axis, size))
    {
        if (player1.isTurn) player1.ships.push(newShip);
        if (player2.isTurn) player2.ships.push(newShip);
    }
    else
    {

    }
});

// Showing ship outline
$(document).on('mouseover', ".board-tile", function() {
    // Set cell to the ID of td being hovered
    let cell = parseInt(this.id);
    // Grab axis control from radio buttons
    let axis = ($("#x-axis").is(":checked") ? 'x' : 'y');
    // Grab size from buttons
    let size = getShipSize();

    let isLegal = checkIfLegal(cell, axis, size);
    let addedClass = isLegal ? 'ship-outline' : 'ship-outline-fail';

    if (axis == 'x')
    {
        // Show cells horizontally

        for (let i = 0; i < size; i++)
        {
            let adjCell = cell + i;
            if ((adjCell % 10) >= cell % 10)
                $("#" + adjCell).addClass(addedClass);
        }
    }
    else
    {
        // Show cells vertically
        for (let i = 0; i < size; i++)
        {
            let adjCell = parseInt(cell) + parseInt(i)*10;
            $("#" + adjCell).addClass(addedClass);
        }
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

    if (cells) {
        if (player1.isTurn) {
            player1.ships.push(newShip);
            console.log(player1);
        }
    }
});

/*
$(document).on('click', ".board-tile", function() {
    let shipSize = 0;
    $('#ship-selector').children('button').each(function () {
        if ($('#' + this.id).is(":disabled")) {
            shipSize = (this.id).slice(3);
        }
    });

    let row = ""; let col = "";
    if ((this.id >= 101 && this.id <= 109) || this.id == 1010) {
        row = (this.id).substr(0, 2);
        col = (this.id).substr(2, 4);
    } else {
        row = (this.id).substr(0, 1);
        col = (this.id).substr(1, 2);
    }

    let addedClass = "";

    if ($("#x-axis").is(":checked"))
    {
        checkSum = (parseInt(col) + parseInt(shipSize));

        if (checkSum > 11) {
            addedClass = "ship-outline-fail";
        } else {
            addedClass = "ship-clicked";
        }

        for (let i = 0; i < shipSize; i++)
        {
            let selector = "#" + row.toString() + (parseInt(col) + i).toString();
            $(selector).addClass(addedClass);
        }
        $('#ship-selector').children('button').each(function () {
            if ($('#' + this.id).is(":disabled")) {
                $("#" + this.id).attr("disabled", true);
            }
        });
    }
    else if ($("#y-axis").is(":checked"))
    {
        checkSum = (parseInt(row) + parseInt(shipSize));

        if (checkSum > 11) {
            addedClass = "ship-outline-fail";
        } else {
            addedClass = "ship-clicked";
        }

        for (let i = 0; i < shipSize; i++)
        {
            let selector = "#" + (parseInt(row) + i).toString() + col.toString();
            $(selector).addClass(addedClass);
        }
    }
});
*/

// Remove classes on mouse leave
$(document).on('mouseleave', ".board-tile", function () {
    $(".board-tile").removeClass("ship-outline");
    $(".board-tile").removeClass("ship-outline-fail");
});