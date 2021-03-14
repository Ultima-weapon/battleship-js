/* -----------------------------------------------------------------------------
 *
 * File Name: battleship.js
 * Author: (Team 7 - Project 2 Team) & (Team 3 - Original Team)
 * Assignment: EECS 448 - Project 2
 * Description: Gameboard Hypertext Generation
 * Date: 14 Mar 2020
 *
 ---------------------------------------------------------------------------- */

/**
* @pre None
* @post FUNCTION [addButtons(numberOfShips)]: Adds ship placement buttons for placing of different sized ships.
* @param numberOfShips, number from 1 to 6
* @return None
**/
function addButtons(numberOfShips)
{
    for (i = 0; i < numberOfShips; i++)
    {
        var btnHTML = '<button id="btn' + (i+1) + '" class="ship-selector selector-btn">1 x ' + (i + 1) + '</button>';
        $("#ship-selector").append(btnHTML)
    }
}

/**
* @pre None
* @post FUNCTION [generateBoard()]: Dynamically generates the HTML for the display of the board.
* @param None
* @return None
**/
function generateBoard()
{
    let cellNo = 0;
    $("#board").append("<table id='game-board' class='generated-board'></table>");
    for (let i = 0; i < 11; i++) {
        $("#game-board").append("<tr id='row-" + i + "'></tr>");
        for (var j = 0; j < 11; j++) {
            if (i == 0 && j == 0)
            {
                $("#row-" + i).append("<th id='origin'></th>");
            } else if (i == 0) {
                $("#row-" + i).append("<th>" + j +"</th>")
            } else if (j == 0) {
                $("#row-" + i).append("<th>" + String.fromCharCode(96 + i).toUpperCase() +"</th>")
            } else {
                $("#row-" + i).append("<td id='" + cellNo + "' class='board-tile'>" + cellNo + "</td>");
                cellNo++;
            }
        }
    }

    console.log("Finished generating board.");
}

/**
* @pre None
* @post FUNCTION [generateFiringBoard()]: Dynamically assigns the firing board to the DOM
* @param None
* @return None
**/
function generateFiringBoard()
{
    let cellNo = 0;
    $("#board").prepend("<table id='firing-board' class='generated-board'></table>")
    for (let i = 0; i < 11; i++) {
        $("#firing-board").append("<tr id='f-row-" + i + "'></tr>")
        for (let j = 0; j < 11; j++) {
            if (i == 0 && j == 0)
            {
                $("#f-row-" + i).append("<th id='origin'></th>");
            } else if (i == 0) {
                $("#f-row-" + i).append("<th>" + j + "</th>");
            } else if (j == 0) {
                $("#f-row-" + i).append("<th>" + String.fromCharCode(96 + i).toUpperCase() + "</th>");
            } else {
                $("#f-row-" + i).append("<td id='" + cellNo + "' class='firing-tile'>" + cellNo + "</td>");
                cellNo++;
            }
        }
    }
}