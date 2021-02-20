//removes ship if same size shipped is tried to place again
function removes_ship(spots, button, axis, origin){
    if (button=='btn6'){
        if($("#btn6").hasClass('clicked')){
            checkspots(spots)
        }
        else{
            if($('#'+origin).hasClass('ship-outline-fail')){
                
            }
            else{
                if(overlap(spots)){//overlap keeps being true so ship never placed
                    checkspots(spots)
            }
                else{
                    for(var x in spots){
                        $(spots[x]).addClass("unique");
                        $(spots[x]).addClass("6");
                    }
                    add_ship_to_class(6, axis, origin)
                    $("#btn6").addClass('clicked')
                }
            }
        }
    }
    else if (button=='btn5'){
        if($("#btn5").hasClass('clicked')){
            checkspots(spots)
        }
        else{
            if($('#'+origin).hasClass('ship-outline-fail')){
                
            }
            else{
                if(overlap(spots)){
                    checkspots(spots)
                }
                else{
                    for(var x in spots){
                        $(spots[x]).addClass("unique");
                        $(spots[x]).addClass("5");
                    }
                    add_ship_to_class(5, axis, origin)
                    $("#btn5").addClass('clicked')
                }
            }
        }
    }
    else if (button=='btn4'){
        if($("#btn4").hasClass('clicked')){
            checkspots(spots)

        }
        else{
            if($('#'+origin).hasClass('ship-outline-fail')){
                
            }
            else{
                if(overlap(spots)){
                    checkspots(spots)
                }
                else{
                    for(var x in spots){
                        $(spots[x]).addClass("unique");
                        $(spots[x]).addClass("4");
                    }
                    add_ship_to_class(4, axis, origin)
                    $("#btn4").addClass('clicked')
                }
            }
        }
    }
    else if (button=='btn3'){
        if($("#btn3").hasClass('clicked')){
            checkspots(spots)
        }
        else{
            if($('#'+origin).hasClass('ship-outline-fail')){
                
            }
            else{
                if(overlap(spots)){
                    checkspots(spots)
                }
                else{
                    for(var x in spots){
                        $(spots[x]).addClass("unique");
                        $(spots[x]).addClass("3");
                    }
                    add_ship_to_class(3, axis, origin)
                    $("#btn3").addClass('clicked')
                }
            }
        }
    }
    else if (button=='btn2'){
        if($("#btn2").hasClass('clicked')){
            checkspots(spots)
        }
        else{
            if($('#'+origin).hasClass('ship-outline-fail')){
                
            }
            else{
                if(overlap(spots)){
                    checkspots(spots)
                }
                else{
                    for(var x in spots){
                        $(spots[x]).addClass("unique");
                        $(spots[x]).addClass("2");
                    }
                    add_ship_to_class(2, axis, origin)
                    $("#btn2").addClass('clicked')
                }
            }
        }
    }
    else if (button=='btn1'){
        if($("#btn1").hasClass('clicked')){
            checkspots(spots)
        }
        else{
            if($('#'+origin).hasClass('ship-outline-fail')){
                
            }
            else{
                if(overlap(spots)){
                    checkspots(spots)
                }
                else{
                    for(var x in spots){
                        $(spots[x]).addClass("unique");
                        $(spots[x]).addClass("1");
                    }
                    add_ship_to_class(1, axis, origin)
                    $("#btn1").addClass('clicked')
                }
            }
        }
    }

}

function add_ship_to_class(size, axis, origin){
    let newShip = new Ship(size, axis, origin);//this.id is origin
    console.log(newShip);
}

function overlap(spots){
    for(var x in spots){
        if($(spots[x]).hasClass('unique')){
            console.log('true')
            return true
        }
        else{
            lap=false
            console.log(lap)
        }
    }
    return lap
}

function checkspots(spots){
    for(var x in spots){
        if($(spots[x]).hasClass("6")||$(spots[x]).hasClass("5")||$(spots[x]).hasClass("4")
        ||$(spots[x]).hasClass("3")||$(spots[x]).hasClass("2")||$(spots[x]).hasClass("1")){

    }
    else{
        $(spots[x]).removeClass("ship-clicked");
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

//removes buttons once clicked
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
        removes_ship(list, button, 'x', this.id)
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
        removes_ship(list, button, 'y', this.id)
    }
});

// Remove classes on mouse leave
$(document).on('mouseleave', ".board-tile", function () {
    $(".board-tile").removeClass("ship-outline");
    $(".board-tile").removeClass("ship-outline-fail");
});