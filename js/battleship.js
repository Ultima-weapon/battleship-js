$("#btn-start-game").click(function() {
    let numberOfShips = parseInt($("#no-of-ships").val());

    if (numberOfShips <= 6 && numberOfShips > 0)
    {
        console.log("Acceptable input parameters to begin game.");
        addButtons(numberOfShips);
        generateBoard(1);

        generateBoard(2);
        $("#start-game").slideUp(400);
        $("#placement-options").slideDown(400);
        $("#player-1").slideDown(400);
    } else {
        $("#no-of-ships-err").slideDown(400);
    }
});

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
    let cellNo = 0;
    $("#board").append("<table id='player-" + playerNo + "' class='table is-bordered is-fullwidth has-text-centered hide'></table>");
    for (var i = 0; i < 11; i++) {
        $("#player-" + playerNo).append("<tr id='" + playerNo + "-row-" + i + "'></tr>");
        for (var j = 0; j < 11; j++) {
            if (i == 0 && j == 0)
            {
                $("#" + playerNo + "-row-" + i).append("<th id='origin'></th>");
            } else if (i == 0) {
                $("#" + playerNo + "-row-" + i).append("<th>" + j +"</th>")
            } else if (j == 0) {
                $("#" + playerNo + "-row-" + i).append("<th>" + String.fromCharCode(96 + i).toUpperCase() +"</th>")
            } else {
                $("#" + playerNo + "-row-" + i).append("<td id='" + cellNo + "' class='board-tile'>" + cellNo + "</td>");
                cellNo++;
            }
        }
    }

    console.log("Finished generating board for player " + playerNo + ".");
}