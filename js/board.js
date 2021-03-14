/* -----------------------------------------------------------------------------
 *
 * File Name: board.js
 * Author: (Team 7 - Project 2 Team) & (Team 3 - Original Team)
 * Assignment: EECS 448 - Project 2
 * Description: Gameboard Classes
 * Date: 14 Mar 2020
 *
 ---------------------------------------------------------------------------- */

class Cell 
{
	/**
	* @constructor
	* @pre None
	* @post CONSTRUCTOR: Setup default values for a cell.
	* @param None
	* @return None
	**/
    constructor()
    {
        this.hit = false;
        this.missed = false;
        this.sunk = false;
        this.occupied = false;
        this.occupied_by = "";
    }
};

class Board
{
	/**
	* @constructor
	* @pre None
	* @post CONSTRUCTOR: Setup default values for a gameboard.
	* @param None
	* @return None
	**/
    constructor()
    {
        this.cells = Array(100);
        for (let i = 0; i < 100; i++){
            this.cells[i] = new Cell();
        }
    }
};

/**
* @pre None
* @post FUNCTION [redrawBoard(player)]: Redraw the gameboard using new variable changes to each cell
* @param player, which player is the gameboard data being redrawn for?
* @return None
**/
function redrawBoard(player)
{
    for (let i = 0; i < 100; i++) {
        $("#game-board").find("#" + i).removeClass("hit");
        $("#game-board").find("#" + i).removeClass("sunk");
        $("#game-board").find("#" + i).removeClass("miss");
        $("#game-board").find("#" + i).removeClass("ship-clicked");
    }

    // Check if your ships are sank and if so add the sank class
    for (let ship of player.ships){
        if (ship.isSunk()){
            for(let cell_id of ship.cells){
                player.board.cells[cell_id].hit = false;
                player.board.cells[cell_id].sunk = true;
            }
        }
    }

    for (let i = 0; i < 100; i++) {
        if (player.board.cells[i].hit) {
            $("#game-board").find("#" + i).addClass("hit");
        } 
        else if (player.board.cells[i].miss) {
            $("#game-board").find("#" + i).addClass("miss");
        } 
        else if (player.board.cells[i].sunk) {
            $("#game-board").find("#" + i).addClass("sunk");
        } 
        else if (player.board.cells[i].occupied) {
            $("#game-board").find("#" + i).addClass("ship-clicked");
        }
    }
}

/**
* @pre None
* @post FUNCTION [redrawFiringBoard(player)]: Redraws the firing board with the information from another player
* @param player, which player is the gameboard data being redrawn for?
* @return None
**/
function redrawFiringBoard(player)
{
    console.log("Redrawing firing board...");
    for (let i = 0; i < 100; i++) {
        $("#firing-board").find("#" + i).removeClass("hit");
        $("#firing-board").find("#" + i).removeClass("miss");
        $("#firing-board").find("#" + i).removeClass("sunk");
        $("#firing-board").find("#" + i).removeClass("ship-clicked");
    }
    for (let i = 0; i < 100; i++) {
        if (player.board.cells[i].hit == true) {
            $("#firing-board").find("#" + i).addClass("hit");
        } else if (player.board.cells[i].missed == true) {
            $("#firing-board").find("#" + i).addClass("miss");
        } else if (player.board.cells[i].sunk == true) {
            $("#firing-board").find("#" + i).addClass("sunk");
        }
    }
}
