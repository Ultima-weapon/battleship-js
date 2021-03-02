/**
 * Adds ship placement buttons for placing of different sized ships.
 * @param {number} numberOfShips 
 * @returns None
 */
function addButtons(numberOfShips)
{
    console.log("Add buttons")
    for (i = 0; i < numberOfShips; i++)
    {
        let btnHTML = '<button id="btn' + (i+1) + '" class="button is-success selector-btn">1 x ' + (i + 1) + '</button>';
        $("#ship-selector").append(btnHTML)
    }
}

/**
 * Dynamically generates the HTML for the display of the board
 * @param None
 * @returns None
 */
function generateBoard()
{
    let cellNo = 0;
    $("#board").append("<table id='game-board' class='table is-bordered is-fullwidth has-text-centered column'></table>");
    for (let i = 0; i < 11; i++) {
        $("#game-board").append("<tr id='row-" + i + "'></tr>");
        for (let j = 0; j < 11; j++) {
            if (i == 0 && j == 0)
            {
                $("#row-" + i).append("<th id='origin'></th>"); //affects top row
            } else if (i == 0) {
                $("#row-" + i).append("<th>" + j +"</th>") //affects 0-10
            } else if (j == 0) {
                $("#row-" + i).append("<th>" + String.fromCharCode(96 + i).toUpperCase() +"</th>") //affects A-Z
            } else {
                $("#row-" + i).append("<td id='" + cellNo + "' class='board-tile'>" + cellNo + "</td>");
                cellNo++;
            }
        }
    }

    console.log("Finished generating board.");
}

// Dynamically assigns the firing board to the DOM
function generateFiringBoard()
{
    console.log("Generating firing board...")
    let cellNo = 0;
    $("#board").append("<table id='firing-board' class='table is-bordered is-fullwidth has-text-centered column'></table>")
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