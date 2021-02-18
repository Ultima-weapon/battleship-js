class Player
{
    constructor(playerID)
    {
        // Array to hold ships
        this.ships = [];
        // If Player 1, isTurn is true, if not, isTurn is false
        this.isTurn = (playerID == 1 ? true : false);
    }
};

let player1 = new Player(1);
let player2 = new Player(2);