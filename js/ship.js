/* -----------------------------------------------------------------------------
 *
 * File Name: ship.js
 * Author: (Team 7 - Project 2 Team) & (Team 3 - Original Team)
 * Assignment: EECS 448 - Project 2
 * Description: Ship Class
 * Date: 14 Mar 2020
 *
 ---------------------------------------------------------------------------- */
 
class Ship
{
	/**
	* @constructor
	* @pre None
	* @post CONSTRUCTOR: Constructs a Ship class with the size of the ship and the ID of the cells it occupies
	* @param size, number representing the ship size.
	* @return cells, array of cell IDs that the ship occupies.
	**/
    constructor(size, cells) 
    {
        this.size = parseInt(size);
        this.cells = cells;
        this.hits = [];
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [isSunk()]: Returns whether the ship has been sunk or not.
	* @param None.
	* @return [boolean], true if ship has been sunk.
	**/
    isSunk() 
    {
        return (this.hits.length == this.size);
    }

	/**
	* @pre None
	* @post PUBLIC METHOD [hit(hitCell)]: Sets a cell of the ship to hit if it is one of the Ship's occupied cells.
	* @param hitCell, number representing the ID of the cell hit.
	* @return None
	**/
    hit(hitCell)
    {
        for (cell in this.cells) {
            if (hitCell == cell)
                this.hits.push(hitCell);
        }
    }
};
