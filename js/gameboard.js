function checkIfLegal(origin, orientation, size)
{
    let row = ""; let col = "";
    if ((origin >= 101 && origin <= 109) || origin == 1010) {
        row = parseInt((origin).substr(0, 2));
        col = parseInt((origin).substr(2, 4));
    } else {
        row = parseInt((origin).substr(0, 1));
        col = parseInt((origin).substr(1, 2));
    }

    console.log("Row: " + row);
    console.log("Col: " + col);
    console.log("Row + Col: " + (row + col));

    size = parseInt(size);

    if (orientation == 'x' && (col + size) >= 10)
    {
        console.log(col + size);
        return false;
    }
    else if (orientation == 'y' && (row + size) >= 10)
    {
        return false;
    }
    else
    {
        return true;
    }
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
    console.log(newShip);

    if (checkIfLegal(this.id, axis, size))
    {
        console.log("Valid placement. Push to player");
    }
    else
    {
        console.log("Invalid placement. Do not push to player.");
    }
});

// Showing ship outline
$(document).on('mouseover', ".board-tile", function() {
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
            addedClass = "ship-outline";
        }

        for (let i = 0; i < shipSize; i++)
        {
            let selector = "#" + row.toString() + (parseInt(col) + i).toString();
            $(selector).addClass(addedClass);
        }
    }
    else if ($("#y-axis").is(":checked"))
    {
        checkSum = (parseInt(row) + parseInt(shipSize));

        if (checkSum > 11) {
            addedClass = "ship-outline-fail";
        } else {
            addedClass = "ship-outline";
        }

        for (let i = 0; i < shipSize; i++)
        {
            let selector = "#" + (parseInt(row) + i).toString() + col.toString();
            $(selector).addClass(addedClass);
        }
    }
});

//keeps ships where clicked
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

// Remove classes on mouse leave
$(document).on('mouseleave', ".board-tile", function () {
    $(".board-tile").removeClass("ship-outline");
    $(".board-tile").removeClass("ship-outline-fail");
});