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
        
        this.randomMoves = [];
        for (var i = 0; i <= 99; i++) {
           this.randomMoves.push(i);
        }

        this.moveList = [];        

    }

    moveEasy(opponentBoard)
    {
        var index = Math.floor(Math.random() * this.randomMoves.length);
        var num = this.randomMoves[index];
        this.randomMoves.splice(index,1);
        console.log("Clicked on " + num);
        console.log("Techinnally: " + "#\\3" + Math.floor((num)/10) + " " + ((num)%10))
        if(opponentBoard.cells[num].occupied){
            this.calculateNextMoves(num,opponentBoard);

            if(num<10){
                $("#\\3"+num).click()
            } else {
                $("#\\3" + Math.floor((num)/10) + " " + ((num)%10)).click()
            }
            return true;
        } else {
            if(num<10){
                $("#\\3"+num).click()
            } else {
                $("#\\3" + Math.floor((num)/10) + " " + ((num)%10)).click()
            }
            return false;
        }
    }

    calculateNextMoves(num, opponentBoard){
        //Check Up
            if( this.randomMoves.includes(num-10) && !opponentBoard.cells[num-10].hit && !opponentBoard.cells[num-10].missed){
                this.moveList.push(num-10);
            }
            //Check Right
            if(this.randomMoves.includes(num+1) && !opponentBoard.cells[num+1].hit && !opponentBoard.cells[num+1].missed){
                this.moveList.push(num+1);
            }
            //Check Down
            if( this.randomMoves.includes(num+10) && !opponentBoard.cells[num+10].hit && !opponentBoard.cells[num+10].missed){
                this.moveList.push(num+10);
            }
            //Check Left
            if(this.randomMoves.includes(num-1) && !opponentBoard.cells[num-1].hit && !opponentBoard.cells[num-1].missed){
                this.moveList.push(num-1);
            }
    }

    moveMedium(opponentBoard, move, placement)
    {
        console.log(this.moveList);
        if(this.moveList.length > 0){
            var currentMove = this.moveList.shift();
            var index = this.randomMoves.indexOf(currentMove);
            if (index > -1) {
              this.randomMoves.splice(index, 1);
            }
            if(opponentBoard.cells[currentMove].occupied){
                this.calculateNextMoves(currentMove,opponentBoard);
            }
            if(currentMove<10){
                $("#\\3"+currentMove).click()
            } else {
                $("#\\3" + Math.floor((currentMove)/10) + " " + ((currentMove)%10)).click()
            }
        } else {
            console.log("Firing Random")
            var gotHit = this.moveEasy(opponentBoard);
        }
    }

    moveHard(opponentBoard)
    {
        // Finds next ship to hit
        for (let i = 0; i < 100; i++){
            let currentCell = opponentBoard.cells[i];
            if(currentCell.occupied && !currentCell.hit){
                console.log("Clicked on " + (30+i));
                if(i<10){
                    $("#\\3"+i).click()
                } else {
                    $("#\\3" + Math.floor((i)/10) + " " + ((i)%10)).click()
                }
                break;
            }
        }
    }

    /**
     * Calls a seperate move function depending on the difficulty of the Ai
     * @param {Board} opponentBoard - the current Board of the Opponent
     */
    move(opponentBoard)
    {
        switch(this.difficulty){
            case 1:
                console.log("Firing Easy")
                this.moveEasy(opponentBoard);
                break;
            case 2:
                console.log("Firing Medium")
                this.moveMedium(opponentBoard, this.targeting, this.targetingNext);
                break;
            case 3:
                console.log("Firing Hard")
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

var aiEasy = new Ai(2, player2Board, 1);
var aiMedium = new Ai(2, player2Board, 2);
var aiHard = new Ai(2, player2Board, 3);

