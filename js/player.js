class Player
{
    /**
     * Constructs a blank Player class and attaches a Board object.
     * @constructor
     * @param {number} playerID 
     * @param {Board} board 
     */
    constructor(playerID, board)
    {
        // Array to hold ships
        this.ships = [];
        // If Player 1, isTurn is true, if not, isTurn is false
        this.isTurn = (playerID == 1 ? true : false);
        this.board = board;
        this.placedShips = 0;
        this.isPlayer1 = (playerID == 1 ? true : false);
    }
};

// Create a board for each player
let player1Board = new Board();
let player2Board = new Board();

// Create a player and attach each board
let player1 = new Player(1, player1Board);
let player2 = new Player(2, player2Board);