class Ship
{
    constructor(size, cells) 
    {
        this.size = parseInt(size);
        this.cells = cells;
        this.hits = [];
    }

    isSunk() 
    {
        return (this.hits.length == this.size);
    }

    hit(hitCell)
    {
        for (cell in this.cells) {
            if (hitCell == cell)
                this.hits.push(hitCell);
        }
    }
};