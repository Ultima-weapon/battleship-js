function Checkclass(spots, button){
    if (button=='btn6'){
        if($("#btn6").hasClass('clicked')){
            for(var x in spots){
                $(spots[x]).removeClass("ship-clicked");
            }
        }
        else{
            $("#btn6").addClass('clicked')
        }
    }
    else if (button=='btn5'){
        if($("#btn5").hasClass('clicked')){
            for(var x in spots){
                $(spots[x]).removeClass("ship-clicked");
            }
        }
        else{
            $("#btn5").addClass('clicked')
        }
    }
    else if (button=='btn4'){
        if($("#btn4").hasClass('clicked')){
            for(var x in spots){
                $(spots[x]).removeClass("ship-clicked");
            }
        }
        else{
            $("#btn4").addClass('clicked')
        }
    }
    else if (button=='btn3'){
        if($("#btn3").hasClass('clicked')){
            for(var x in spots){
                $(spots[x]).removeClass("ship-clicked");
            }
        }
        else{
            $("#btn3").addClass('clicked')
        }
    }
    else if (button=='btn2'){
        if($("#btn2").hasClass('clicked')){
            for(var x in spots){
                $(spots[x]).removeClass("ship-clicked");
            }
        }
        else{
            $("#btn2").addClass('clicked')
        }
    }
    else if (button=='btn1'){
        if($("#btn1").hasClass('clicked')){
            for(var x in spots){
                $(spots[x]).removeClass("ship-clicked");
            }
        }
        else{
            $("#btn1").addClass('clicked')
        }
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
        list=[]
        for (let i = 0; i < shipSize; i++)
        {
            let selector = "#" + row.toString() + (parseInt(col) + i).toString();
                $('#ship-selector').children('button').each(function () {
                    if ($('#' + this.id).is(":disabled")) {
                        $(selector).addClass(addedClass);
                        list.push(selector)
                        button=this.id
                    }
                });
        }
        Checkclass(list, button)
    
    }
    else if ($("#y-axis").is(":checked"))
    {
        checkSum = (parseInt(row) + parseInt(shipSize));

        if (checkSum > 11) {
            addedClass = "ship-outline-fail";
        } else {
            addedClass = "ship-clicked";
        }
        list=[]
        for (let i = 0; i < shipSize; i++)
        {
            let selector = "#" + (parseInt(row) + i).toString() + col.toString();
            $('#ship-selector').children('button').each(function () {
                if ($('#' + this.id).is(":disabled")) {
                    $(selector).addClass(addedClass);
                    list.push(selector)
                    button=this.id
                }
            });
        }
        Checkclass(list, button)
    }
});

// Remove classes on mouse leave
$(document).on('mouseleave', ".board-tile", function () {
    $(".board-tile").removeClass("ship-outline");
    $(".board-tile").removeClass("ship-outline-fail");
});