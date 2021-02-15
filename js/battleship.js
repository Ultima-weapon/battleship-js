$("#btn-start-game").click(function() {
    let numberOfShips = parseInt($("#no-of-ships").val());

    if (numberOfShips <= 6 && numberOfShips > 0)
    {
        alert("Success");
    } else {
        alert("Failure.");
        $("#no-of-ships-err").fadeIn(200);
    }
});
