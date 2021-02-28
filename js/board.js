class Cell 
{
    /**
     * @constructor 
     * @param None 
     */
    constructor()
    {
        this.hit = false;
        this.missed = false;
        this.occupied = false;
    }
};

class Board
{
    /**
     * @constructor 
     * @param None 
     */
    constructor()
    {
        this.cells = Array(100);
        for (let i = 0; i < 100; i++)
            this.cells[i] = new Cell();
    }
};

/**
 * Redraws the board with the information from the Player classes's Board object
 * @param {Player} player 
 * @return None
 */
function redrawBoard(player)
{
    for (let i = 0; i < 100; i++) {
        $("#game-board").find("#" + i).removeClass("hit");
        $("#game-board").find("#" + i).removeClass("miss");
        $("#game-board").find("#" + i).removeClass("ship-clicked");
    }

    for (let i = 0; i < 100; i++) {
        if (player.board.cells[i].hit) {
            $("#game-board").find("#" + i).addClass("hit");
        } else if (player.board.cells[i].miss) {
            $("#game-board").find("#" + i).addClass("miss");
        } else if (player.board.cells[i].occupied) {
            $("#game-board").find("#" + i).addClass("ship-clicked");
        }
    }
}

// Redraws the firing board with the information from another player
function redrawFiringBoard(player)
{
    console.log("Redrawing firing board...");
    for (let i = 0; i < 100; i++) {
        /*
        if($("#firing-board").find("#" + i).hasClass("hit")){
            count++;
            console.log(count)
        }
        */
        $("#firing-board").find("#" + i).removeClass("hit");
        $("#firing-board").find("#" + i).removeClass("miss");
        $("#firing-board").find("#" + i).removeClass("ship-clicked");
    }
    for (let i = 0; i < 100; i++) {
        if (player.board.cells[i].hit == true) {
            $("#firing-board").find("#" + i).addClass("hit");
        } else if (player.board.cells[i].missed == true) {
            $("#firing-board").find("#" + i).addClass("miss");
        }
    }
}
