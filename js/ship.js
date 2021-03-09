class Ship
{
    /**
     * Constructs a Ship class with the size of the ship and the ID of the cells it occupies
     * @param {number} size - the size of the Ship
     * @param {Array} cells - the ID of the cells the Ship occupies
     */
    constructor(size, cells) 
    {
        this.size = parseInt(size);
        this.cells = cells;
        this.hits = [];
    }

    /**
     * Helper class that returns whether the ship has been sunk or not.
     * @param None
     * @returns Boolean - True if ship has been sunk, False is ship has not been sunk.
     * @deprecated
     */
    isSunk() 
    {
        return (this.hits.length == this.size);
    }

    /**
     * Helper class that sets a cell of the ship to hit if it is one of the Ship's occupied cells.
     * @param {number} hitCell 
     * @deprecated
     */
    hit(hitCell)
    {
        for (cell in this.cells) {
            if (hitCell == cell)
                this.hits.push(hitCell);
        }
    }
};
