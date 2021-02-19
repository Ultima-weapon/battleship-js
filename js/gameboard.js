function test(button_on, spots){
    spots_6=[]
    if (button_on=='btn6'){
        spots_6.push(spots)
        $("#btn6").addClass('clicked')
    }

}

function Getspots(spots){
    
}

function Checkclass(spots){
    if($("#btn6").hasClass('clicked')){
        console.log(spots)
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
    let size=0;
    $('#ship-selector').children('button').each(function () {
        if ($('#' + this.id).is(":disabled")) {
            size = (this.id).slice(3);
        }
    });
    let newShip = new Ship(parseInt(size), 'x', this.id);
    console.log(newShip);
    //player.addShip(newShip);
});

$(document).on('click', ".board-tile", function() {
    $('#ship-selector').children('button').each(function () {
        if ($('#' + this.id).is(":disabled")) {
            if(this.id=='btn1'){
                $("#btn1").hide()

            }else if(this.id=='btn2'){
                $("#btn2").hide()
            }else if(this.id=='btn3'){
                $("#btn3").hide()
            }else if(this.id=='btn4'){
                $("#btn4").hide()
            }else if(this.id=='btn5'){
                $("#btn5").hide()
            }else if(this.id=='btn6'){
                $("#btn6").hide()
            }
        }
    });
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
            //if($("#btn1").hasClass('clicked')){
             //   console.log('already placed ship')
            //}
                //we need to see which button we are on and if the button then the board has been clicked
                $('#ship-selector').children('button').each(function () {
                    if ($('#' + this.id).is(":disabled")) {
                        test(this.id, selector)
                        $(selector).addClass(addedClass);
                    }
                });
        }
        Checkclass()
    
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