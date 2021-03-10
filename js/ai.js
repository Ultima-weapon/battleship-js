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
                break;
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
    // Place AI Ships
    placeAIShip(shipSize=1){
        let player = game.players[1];
        if (player.placedShips != game.numShips){
            let size = shipSize;
            //Determine orientation
            let axis = (Math.random() < 0.5 ? 'x':'y');
            let origin;
            let cells = [];
            let alreadyOccupied = false;
            //Find an empty valid location to place the ship
            while(cells.length != size || alreadyOccupied == true){
                alreadyOccupied = false;
                origin = Math.ceil(Math.random()*100)-1;
                cells = getCells(origin, axis, size);
                for (let i = 0; i < cells.length; i++){
                    if (player.board.cells[cells[i]].occupied == true) {
                        alreadyOccupied = true;
                    }
                }
            }
            //Occupy the cells
            for (let i = 0; i < size; i++) {
                // Add occupied class
                $("#" + cells[i]).addClass("ship-clicked");
                // Store that these cells are occupied
                player.board.cells[cells[i]].occupied = true;
            }
            // Increment number of ships player has placed
            player.placedShips++;
            if (player.placedShips != game.numShips) {
                this.placeAIShip(size+1);
            } else {
                console.log(player.board.cells);
            }
        } else {
            console.log('All AI Ships have already been placed');
        }
    }
};

let aiEasy = new Ai(2, player2Board, 1);
let aiMedium = new Ai(2, player2Board, 2);
let aiHard = new Ai(2, player2Board, 3);

