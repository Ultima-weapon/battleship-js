function addButtons(numberOfShips)
{
    for (i = 0; i < numberOfShips; i++)
    {
        var btnHTML = '<button id="btn' + (i+1) + '" class="button is-success selector-btn">1 x ' + (i + 1) + '</button>';
        $("#ship-selector").append(btnHTML)
    }
}

function showPlayer1()
{
    $("#board-1").slideDown(400);
}

function showPlayer2()
{

}

$("#btn-start-game").click(function() {
    let numberOfShips = parseInt($("#no-of-ships").val());

    if (numberOfShips <= 6 && numberOfShips > 0)
    {
        addButtons(numberOfShips);
        $("#start-game").slideUp(400);
        $("#placement-options").slideDown(400);
        $("#board-space").slideDown(400);
    } else {
        $("#no-of-ships-err").fadeIn(200);
    }
});
