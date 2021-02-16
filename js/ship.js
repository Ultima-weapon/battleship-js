class Ship
{
    constructor(size, orientation, origin) 
    {
        this.size = size;
        this.origin = origin;
        this.cells = [];
        this.hits = [];
        this.name = "";

        switch(this.size)
        {
            case 1:
                this.name = "Patrol Boat";
                break;
            case 2:
                this.name = "Destroyer";
                break;
            case 3:
                this.name = "Cruiser";
                break;
            case 4:
                this.name = "Submarine";
                break;
            case 5:
                this.name = "Battleship";
                break;
            case 6:
                this.name = "Carrier";
                break;
        }

        if (orientation == 'x')
        {
            for (let i = 0; i < size; i++)
            {
                this.cells.push(origin + i);
            }
        }
        else if (orientation == 'y')
        {
            for (let i = 0; i < size; i++)
            {
                this.cells.push(origin + (i*10));
            }
        }
    }

    isSunk() 
    {
        return (this.hits.length == this.size);
    }
};