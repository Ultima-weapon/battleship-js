class ai extends player
{
    /**
     * Constructs a blank ai class and attaches a Board object.
     * @constructor
     * @param {number} playerID 
     * @param {Board} board 
     * @param {number} difficulty
     */
    constructor(playerID, board, difficulty)
    {
        // Calls contructor from Player Class
        this.difficulty = difficulty;
        super(playerID, board);
    }

    /**
     * Calls a seperate move function depending on the difficulty of the Ai
     * @param {Board} opponentBoard - the current Board of the Opponent
     */
    move(opponentBoard)
    {
        switch(this.difficulty){
            case 1:
                // This is Easy Mode
                break;
            case 2:
                // This is Medium Mode
                break;
            case 3:
                moveHard(opponentBoard);
                break;
            default:
                // Invalid Difficulty Setting

        }
    }

    moveHard(opponentBoard)
    {
        // Finds next ship to hit
        for (let i = 0; i < 100; i++){
            let currentCell = opponentBoard.cells[i];
            if(currentCell.occupied && !currentCell.hit){
                $("#\\" + (31+i)).click();
            }
        }
    }
};