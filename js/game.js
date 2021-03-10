class Game
{
    /**
     * Creates the over-arching Game object responsible for managing most aspects of the game.
     * @constructor
     * @param {Array[Players]} players - array of Players to start the Game with.
     */
    constructor(players)
    {
        // States
        // 1 = Placing
        // 2 = Firing
        // 3 = Game Over
        this.state = 1;
        this.type = 0;
        this.difficulty = 0;
        this.players = players;
        this.numShips = 0;

        console.log("Game class initialized and in state " + this.state);
    }

    /**
     * Sets the numberOfShips variable which is integral for turn checking during the placement phase of the game.
     * @param {number} num - Number of ships each player should have
     */
    setNumberOfShips(num)
    {
        this.numberOfShips = num;
    }

    /**
     * Gets the number of ships player's are allowed to place.
     * @param None
     * @returns {number} - the number of ships player's are allowed to place.
     */
    getNumberOfShips()
    {
        return this.numberOfShips;
    }

    /**
     * Returns the current state of the game.
     * @params None
     * @returns {number} - The current state of the game: 1, the placement phase. 2, the firing phase. 3, win condition has been met.
     */
    getState()
    {
        return this.state;
    }

    /**
     * Changes which player is currently active. Used for ending of turns.
     * @params None
     * @returns None
     */
    switchPlayer()
    {
        this.players[0].isTurn = !this.players[0].isTurn;
        this.players[1].isTurn = !this.players[1].isTurn;
		if (this.players[0].isTurn){
			soundPlayer1Turn.play();
		} else {
			soundPlayer2Turn.play();
		}
    }

    /**
     * Returns the Player object of the currently active player.
     * @params None
     * @returns {Player} - the currently active Player object
     */
    currentPlayer()
    {
        if (this.players[0].isTurn){
            return this.players[0];
        } else {
            return this.players[1];
		}
    }

    otherPlayer()
    {
        if (this.players[0].isTurn){
			return this.players[1];
		} else {
			return this.players[0];
		}
    }

    checkWinCondition(player)
    {
        // Get number of occupied cells
        let occupiedCells = 0;
        let hitCells = 0;
        for (let i = 0; i < 100; i++) {
            if (player.board.cells[i].occupied == true)
                occupiedCells++;

            if ((player.board.cells[i].hit == true) || (player.board.cells[i].sunk == true))
                hitCells++;
        }

        console.log("Occupied: " + occupiedCells);
        console.log("Hit: " + hitCells);

        return (occupiedCells == hitCells)
    }
};
/**
 * Resets the ship placement buttons for player 2 to place ships
 * @params None
 * @returns None
 */
function resetBoardControls()
{
    $('#ship-selector').children('button').each(function () {
        $("#" + this.id).removeClass("hide");
        $("#" + this.id).attr("disabled", false);
    });

    $('#axis-controls').show();
}

// Start game button
$("#btn-single").click(function() {
    game.type = 1;
    $("#start-game").hide();
    $("#difficulty-selector").slideDown(400);
});

$("#btn-easy").click(function() {
    
    game.players = [player1, aiEasy];
    $("#difficulty-selector").hide();
    $("#pick-ship-number").slideDown(400);
});


$("#btn-medium").click(function() {
    
    game.players = [player1, aiMedium];
    $("#difficulty-selector").hide();
    $("#pick-ship-number").slideDown(400);
});

$("#btn-hard").click(function() {
    
    game.players = [player1, aiHard];
    $("#difficulty-selector").hide();
    $("#pick-ship-number").slideDown(400);
});

// Start game button
$("#btn-multi").click(function() {
    game.type = 2;
    game.players = [player1, player2];
    $("#start-game").hide();
    $("#pick-ship-number").slideDown(400);
});

// Start game button
$("#btn-start-game").click(function() {
    let numberOfShips = parseInt($("#no-of-ships").val());
    if (numberOfShips <= 6 && numberOfShips > 0)
    {
        console.log("Acceptable input parameters to begin game.");
        addButtons(numberOfShips);
        generateBoard();
        $("#start-game").hide();
        $("#pick-ship-number").hide();
        $("#div-start-game").hide();
        $("#placement-options").slideDown(400);
        $("#player-1").slideDown(400);
    } else {
        $("#no-of-ships-err").slideDown(400);
    }
    game.numShips = numberOfShips;
    console.log(game);
});

game = new Game([player1, player2]);
// No Peek time between turns in seconds
let timeBetweenTurns = 2;
// End Turn button
$(document).on('click', '#end-turn', function () {
    // Hide end turn button
    $("#end-turn").slideUp(400);
    // If the game is in AI mode, we need to switch here
    if(game.type==1){game.switchPlayer();}
	$('#axis-controls').hide();
    // Hide the board
    $("#board-space").slideUp(400, function() {
        // Redraw the board with the next players information
        let player = game.currentPlayer();
        redrawBoard(player);

        if(player.isPlayer1 == false && game.type == 1 && game.state == 1){
            player.placeAIShip();
        }

        if(game.type == 1 && player.isPlayer1 == false && game.state == 2){
            setTimeout(() => { console.log("Ai Moving"); player.move(game.players[0].board) }, 7000);
        }

        if (game.state == 1 && game.players[0].isTurn) {
			resetBoardControls();
		} else if (game.state == 1 && game.players[1].isTurn) {
			game.state = 2;
			console.log("Advance game state.");
			generateFiringBoard();
		}
		if(game.state != 3){
			// Change whose turn it is
			game.switchPlayer();
			$("#hide-screen").fadeIn((timeBetweenTurns*1000)/2, function() {
				$("#hide-screen").fadeOut((timeBetweenTurns*1000)/2, function() {
					// Redraw the board with the next players information
					redrawBoard(game.currentPlayer());
					redrawFiringBoard(game.otherPlayer());
					// Show the board
					$("#board-space").slideDown(1000);
				});
			});
		}
    });
});
