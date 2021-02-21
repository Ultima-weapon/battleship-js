class Game
{
    constructor(players)
    {
        // States
        // 1 = Placing
        // 2 = Firing
        // 3 = Game Over
        this.state = 1;
        this.players = players;
        this.numShips = 0;

        console.log("Game class initialized and in state " + this.state);
    }

    setNumberOfShips(num)
    {
        this.numberOfShips = num;
    }

    getNumberOfShips()
    {
        return this.numberOfShips;
    }

    getState()
    {
        return this.state;
    }

    switchPlayer()
    {
        this.players[0].isTurn = !this.players[0].isTurn;
        this.players[1].isTurn = !this.players[1].isTurn;
    }

    currentPlayer()
    {
        if (this.players[0].isTurn)
            return this.players[0];
        else
            return this.players[1];
    }
};

// Start game button
$("#btn-start-game").click(function() {
    let numberOfShips = parseInt($("#no-of-ships").val());

    if (numberOfShips <= 6 && numberOfShips > 0)
    {
        console.log("Acceptable input parameters to begin game.");
        addButtons(numberOfShips);
        generateBoard();
        $("#start-game").hide();
        $("#placement-options").slideDown(400);
        $("#player-1").slideDown(400);
    } else {
        $("#no-of-ships-err").slideDown(400);
    }

    game.numShips = numberOfShips;
    console.log(game);
});

game = new Game([player1, player2]);

function resetBoardControls()
{
    $('#ship-selector').children('button').each(function () {
        $("#" + this.id).removeClass("hide");
        $("#" + this.id).attr("disabled", false);
    });

    $('#axis-controls').show();
}

// End Turn button
$(document).on('click', '#end-turn', function () {
    console.log(game);

    // Hide end turn button
    $("#end-turn").slideUp(400);

    // Change whose turn it is
    game.switchPlayer();

    // Hide the board
    $("#board").slideUp(400);

    if (game.state == 1)
        resetBoardControls();

    // Redraw the board with the next players information
    let player = game.currentPlayer();
    redrawBoard(player);

    // Show the board
    $("#board").slideDown(400);
});