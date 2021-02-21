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
        $("#" + i).removeClass("ship-clicked");
        $("#" + i).removeClass("hit");
        $("#" + i).removeClass("miss");
    }
}