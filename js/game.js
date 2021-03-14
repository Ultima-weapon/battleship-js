/* -----------------------------------------------------------------------------
 *
 * File Name: game.js
 * Author: (Team 7 - Project 2 Team) & (Team 3 - Original Team)
 * Assignment: EECS 448 - Project 2
 * Description: Game Class & Functions
 * Date: 14 Mar 2020
 *
 ---------------------------------------------------------------------------- */

class Game
{
	/**
	* @constructor
	* @pre None
	* @post CONSTRUCTOR: Creates the over-arching Game object responsible for managing most aspects of the game.
	* @param players, array of Players to start the Game with.
	* @return None
	**/
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
	* @pre None
	* @post PUBLIC METHOD [setNumberOfShips(num)]: Sets the numberOfShips variable which is integral for turn checking during the placement phase of the game.
	* @param num, Number of ships each player should have
	* @return None
	**/
    setNumberOfShips(num)
    {
        this.numberOfShips = num;
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [getNumberOfShips()]: Gets the number of ships player's are allowed to place.
	* @param None
	* @return [number], the number of ships player's are allowed to place.
	**/
    getNumberOfShips()
    {
        return this.numberOfShips;
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [getState()]: Returns the current state of the game.
	* @param None
	* @return [number],  The current state of the game: 1, the placement phase. 2, the firing phase. 3, win condition has been met.
	**/
    getState()
    {
        return this.state;
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [switchPlayer()]: Changes which player is currently active. Used for ending of turns. Also plays audio notification.
	* @param None
	* @return None
	**/
    switchPlayer()
    {
        this.players[0].isTurn = !this.players[0].isTurn;
        this.players[1].isTurn = !this.players[1].isTurn;
		if (this.players[0].isTurn){
			setTimeout(() => {soundPlayer1Turn.play();},1500);
		} else {
			if (this.state == 2 || this.type == 2){
				setTimeout(() => {soundPlayer2Turn.play();},1500);
			}
		}
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [currentPlayer()]: Returns the Player object of the currently active player.
	* @param None
	* @return [player], the currently active Player object
	**/
    currentPlayer()
    {
        if (this.players[0].isTurn){
            return this.players[0];
        } else {
            return this.players[1];
		}
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [isPlayer2()]: Checks if player 2 is the current active player.
	* @param None
	* @return [boolean], true if player 2 is the current active player.
	**/
    isPlayer2() {
        if (game.currentPlayer() == this.players[0])
        {
            return true;
        }
        return false;
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [otherPlayer()]: Gets the non-active player object
	* @param None
	* @return [player], returns the non-active player object
	**/
    otherPlayer()
    {
        if (this.players[0].isTurn){
			return this.players[1];
		} else {
			return this.players[0];
		}
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [checkWinCondition(player)]: Check if the win/lose condition has been satisfied
	* @param [player], the player object you want to check for win/lose conditions
	* @return [boolean], true if player has met the win conditions
	**/
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

// Setup new Game object.
game = new Game([player1, player2]);

/**
* @pre None
* @post FUNCTION [resetBoardControls()]: Reset gameboard to allow second player to place ships
* @param None
* @return None
**/
function resetBoardControls()
{
    $('#ship-selector').children('button').each(function () {
        $("#" + this.id).removeClass("hide");
        $("#" + this.id).attr("disabled", false);
    });

    $('#axis-controls').show();
}

/**
* @pre None
* @post EVENT [onClick, "#btn-easy"]: Easy AI Mode button
* @param None
* @return None
**/
$("#btn-easy").click(function() {
    
    game.players = [player1, aiEasy];
    $("#difficulty-selector").hide();
    $("#pick-ship-number").slideDown(400);
});

/**
* @pre None
* @post EVENT [onClick, "#btn-medium"]: Medium AI Mode button
* @param None
* @return None
**/
$("#btn-medium").click(function() {
    
    game.players = [player1, aiMedium];
    $("#difficulty-selector").hide();
    $("#pick-ship-number").slideDown(400);
});

/**
* @pre None
* @post EVENT [onClick, "#btn-hard"]: Hard AI Mode button
* @param None
* @return None
**/
$("#btn-hard").click(function() {
    
    game.players = [player1, aiHard];
    $("#difficulty-selector").hide();
    $("#pick-ship-number").slideDown(400);
});

/**
* @pre None
* @post EVENT [onClick, "#btn-multi"]: Multi-player select button
* @param None
* @return None
**/
$("#btn-multi").click(function() {
    game.type = 2;
    game.players = [player1, player2];
    $("#start-game").hide();
    $("#pick-ship-number").slideDown(400);
});

/**
* @pre None
* @post EVENT [onClick, "#btn-single"]: Single-player select button
* @param None
* @return None
**/
$("#btn-single").click(function() {
    game.type = 1;
    $("#start-game").hide();
    $("#difficulty-selector").slideDown(400);
});

/**
* @pre None
* @post EVENT [onClick, "#btn-start-game"]: Start game button
* @param None
* @return None
**/
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

// No Peek time between turns in seconds
let timeBetweenTurns = 2;

// End Turn button
/**
* @pre None
* @post EVENT [onClick, "#end-turn"]: End Turn button (Also called when clicking a gameboard button)
* @param None
* @return None
**/
$(document).on('click', '#end-turn', function () {
    // Hide end turn button
    $("#end-turn").slideUp(400);
    
    // Display the current player
    if (game.isPlayer2()) {
        $("#player-turn").text("Player 2");
    }
    else
    {
        $("#player-turn").text("Player 1");
    }

	$('#axis-controls').hide();
    // Hide the board
    $("#board-space").slideUp(400, function() {
        if (game.state == 1 && game.players[0].isTurn) {
			resetBoardControls();
		} else if (game.state == 1 && game.players[1].isTurn) {
			game.state = 2;
			console.log("Advance game state.");
			generateFiringBoard();
		}
		if(game.state != 3){
            game.switchPlayer();
            let player = game.currentPlayer();
            redrawBoard(player);
            console.log(player);

            if(player.isPlayer1 == false && game.type == 1 && game.state == 1){
                player.placeAIShip();
                $("#end-turn").click();
            }

            if(game.type == 1 && player.isPlayer1 == false && game.state == 2){
                allowUserInput = false;
                setTimeout(() => { console.log("Ai Moving"); player.move(game.players[0].board) }, timeBetweenTurns*2500);
            }
			// Change whose turn it is
			$("#hide-screen").fadeIn((timeBetweenTurns*1000)/2, function() {
				$("#hide-screen").fadeOut((timeBetweenTurns*1000)/2, function() {
					// Redraw the board with the next players information
					redrawBoard(game.currentPlayer());
					redrawFiringBoard(game.otherPlayer());
					$("#board-space").slideDown(1000);
					// Show the board
					if(player.isPlayer1 == false && game.type == 1){
						allowUserInput = false;
						$("#game-board").hide();
					} else {
						allowUserInput = true;
						$("#game-board").show();
					}
				});
			});
		}
    });
});
