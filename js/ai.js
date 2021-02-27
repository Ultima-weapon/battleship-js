class Ai extends Player
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
        super(playerID, board);
        this.difficulty = difficulty;
    }

    /**
     * Calls a seperate move function depending on the difficulty of the Ai
     * @param {Board} opponentBoard - the current Board of the Opponent
     */
    moveHard(opponentBoard)
    {
        // Finds next ship to hit
        for (let i = 0; i < 100; i++){
            let currentCell = opponentBoard.cells[i];
            if(currentCell.occupied && !currentCell.hit){
                console.log("Clicked on " + (30+i));
                $("#\\" + (30+i)).click();
            }
        }
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
                this.moveHard(opponentBoard);
                break;
            default:
                // Invalid Difficulty Setting

        }
    }
};

let aiEasy = new Ai(2, player2Board, 1);
let aiMedium = new Ai(2, player2Board, 2);
let aiHard = new Ai(2, player2Board, 3);