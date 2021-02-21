class Cell 
{
    constructor()
    {
        this.hit = false;
        this.missed = false;
        this.occupied = false;
    }
};

class Board
{
    constructor()
    {
        this.cells = Array(100);
        for (let i = 0; i < 100; i++)
            this.cells[i] = new Cell();
    }
};

function redrawBoard(player)
{
    for (let i = 0; i < 100; i++) {
        $("#" + i).removeClass("ship-clicked");
        $("#" + i).removeClass("hit");
        $("#" + i).removeClass("miss");
    }
}