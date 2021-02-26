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
                // This is Hard Mode
                break;
            default:
                // Invalid Difficulty Setting
                
        }
    }
};