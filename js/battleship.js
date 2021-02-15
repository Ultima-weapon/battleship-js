function addButtons(numberOfShips)
{
    for (i = 0; i < numberOfShips; i++)
    {
        var btnHTML = '<button id="btn' + (i+1) + '" class="button is-success selector-btn">1 x ' + (i + 1) + '</button>';
        $("#ship-selector").append(btnHTML)
    }
}

function generateBoard(playerNo)
{
    console.log("Generating blank board...");

    $("#board").append("<table id='player-1' class='table is-bordered is-fullwidth has-text-centered'></table>");
    for (var i = 0; i < 11; i++) {
        $("#player-" + playerNo).append("<tr id='row-" + i + "'></tr>");
        for (var j = 0; j < 11; j++) {
            if (i == 0 && j == 0)
            {
                $("#row-" + i).append("<td id='origin'></td>");
            } else if (i == 0) {
                $("#row-" + i).append("<th>" + j +"</th>")
            } else if (j == 0) {
                $("#row-" + i).append("<th>" + String.fromCharCode(96 + i).toUpperCase() +"</th>")
            } else {
                $("#row-" + i).append("<td id='" + i.toString() + j.toString() + "'></td>");
            }
        }
    }

    console.log("Finished generating player board for " + playerNo + ".");
}

$("#btn-start-game").click(function() {
    let numberOfShips = parseInt($("#no-of-ships").val());

    if (numberOfShips <= 6 && numberOfShips > 0)
    {
        addButtons(numberOfShips);
        generateBoard(1);
        $("#start-game").slideUp(400);
        $("#placement-options").slideDown(400);
        $("#board").slideDown(400);
    } else {
        $("#no-of-ships-err").slideDown(400);
    }
});
