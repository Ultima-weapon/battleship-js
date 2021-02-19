class Ship
{
    constructor(size, cells) 
    {
        this.size = size;
        this.cells = cells;
        this.hits = [];
    }

    isSunk() 
    {
        return (this.hits.length == this.size);
    }
};