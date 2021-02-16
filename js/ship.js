class Ship
{
    constructor(size, orientation, position) 
    {
        this.size = size;
        this.position = position;
        this.cells = [];
        this.hits = [];


        if (orientation == 'x')
        {
            for (let i = 0; i < size; i++)
            {
                this.cells.push(i);
            }
        }
        else if (orientation == 'y')
        {
            for (let i = 0; i < size; i += 10)
            {
                this.cells.push(i);
            }
        }

        console.log("Created ship of size: " + this.size);
        console.log("Ship occupies cells: " + this.cells);
    }

    isSunk() 
    {
        return (hits == size);
    }
};