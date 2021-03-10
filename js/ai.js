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

        this.targeting = 'x';
        this.targetingPlacement = 0;
        this.targetingNext = 0;

        this.checkTop = false;
        this.checkRight = false;
        this.checkBottom = false;
        this.checkLeft = false;

    }

    moveEasy(opponentBoard)
    {
        var index = Math.floor(Math.random() * this.randomMoves.length);
        var num = this.randomMoves[index];
        this.targetingPlacement = num;
        this.targetingNext = num;
        this.randomMoves.splice(index,1);
        console.log("Clicked on " + num);
        console.log("Techinnally: " + "#\\3" + Math.floor((num)/10) + " " + ((num)%10))
        if(opponentBoard.cells[num].occupied){
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
            }            return false;
        }
    }

    moveMedium(opponentBoard, move, placement)
    {
        console.log("Current State: " + this.targeting);
        console.log("Top:" + this.checkTop);
        console.log("Right: " + this.checkRight);
        console.log("Left: " + this.checkLeft);
        console.log("Bottom: " + this.checkBottom);
        if(this.checkTop == true && this.checkRight == true && this.checkDown == true && this.checkLeft == true){
            this.checkTop = false;
            this.checkRight = false;
            this.checkDown = false;
            this.checkLeft = false;
            this.targeting = 'x';
            move = 'x';
            console.log("Resetting");
        }


        switch(move){
            
            case 'u':
                console.log("Checking Top")
                if(this.checkTop && this.checkBottom){
                    this.moveMedium(opponentBoard, 'r', this.targetingPlacement);
                    break;
                }
                if(!this.checkTop){
                    if( placement-10 < 0 || opponentBoard.cells[placement-10].hit || opponentBoard.cells[placement-10].missed){
                        this.checkTop = true;
                        this.moveMedium(opponentBoard, 'd', this.targetingPlacement);
                    } else {
                        console.log("Clicked on " + (placement-10));
                        if((placement-10)<10){
                            $("#\\3"+(placement-10)).click()
                        } else {
                            $("#\\3" + Math.floor((placement-10)/10) + " " + ((placement-10)%10)).click()
                        }
                        if(!opponentBoard.cells[placement-10].occupied){
                            this.checkTop = true;
                            this.targeting = 'd';
                        } else {
                            this.targeting = 'u';
                            this.targetingNext = this.targetingNext-10;
                        }
                    }
                }

                break;

            case 'r':
                console.log("Checking Right")
                console.log("Right: " + this.checkRight);
                console.log("Left: " + this.checkLeft);
                if(this.checkRight && this.checkLeft){
                        this.moveMedium(opponentBoard, 'u', this.targetingPlacement);
                }

                if(!this.checkRight){
                    if(Math.floor((placement+1)/10) > Math.floor(placement/10)|| opponentBoard.cells[placement+1].hit || opponentBoard.cells[placement+1].missed){
                        this.checkRight = true;
                        this.moveMedium(opponentBoard, 'l', this.targetingPlacement);
                    } else {
                        console.log("Clicked on " + (placement+1));
                        if((placement+1)<10){
                            $("#\\3"+(placement+1)).click()
                        } else {
                            $("#\\3" + Math.floor((placement+1)/10) + " " + ((placement+1)%10)).click()
                        }
                        if(!opponentBoard.cells[placement+1].occupied){
                            this.checkRight = true;
                            this.targeting = 'l';
                        } else {
                            this.targeting = 'r';
                            this.targetingNext = this.targetingNext+1;
                        }
                    }
                } else {
                    this.moveMedium(opponentBoard, 'l', this.targetingPlacement);
                }

                break;

            case 'd':
                console.log("Checking Bottom")

                if(this.checkTop && this.checkBottom){
                    this.moveMedium(opponentBoard, 'r', this.targetingPlacement);
                }
                if(!this.checkBottom){
                    if(placement+10 >100 ||  opponentBoard.cells[placement+10].hit || opponentBoard.cells[placement+10].missed){
                        this.checkBottom = true;
                        this.moveMedium(opponentBoard, 'u', this.targetingPlacement);
                    } else {                        
                        console.log("Clicked on " + (placement+10));
                        if((placement+10)<10){
                            $("#\\3"+(placement+10)).click()
                        } else {
                            $("#\\3" + Math.floor((placement+10)/10) + " " + ((placement+10)%10)).click()
                        }
                        if(!opponentBoard.cells[placement+10].occupied){
                            this.checkBottom = true;
                            this.targeting = 'd';
                        } else {
                            this.targeting = 'd';
                            this.targetingNext = this.targetingNext+10;
                        }
                    }
                }
                break;

            case 'l':
                console.log("Checking Left")
                if(this.checkRight && this.checkLeft){
                    this.moveMedium(opponentBoard, 'u', this.targetingPlacement);
                }

                if(!this.checkLeft){
                    console.log("Statement 1: " + Math.floor((placement-1)/10));
                    console.log("Statement 2: " + Math.floor(placement/10));
                    if(Math.floor((placement-1)/10) < Math.floor(placement/10)|| opponentBoard.cells[placement-1].hit || opponentBoard.cells[placement-1].missed){
                        this.checkLeft = true;
                        this.moveMedium(opponentBoard, 'r', this.targetingPlacement);
                    } else {                
                        console.log("Clicked on " + (placement-1));
                        if(placement-1<10){
                            $("#\\3"+(placement-1)).click()
                        } else {
                            $("#\\3" + Math.floor((placement-1)/10) + " " + ((placement-1)%10)).click()                        
                        }
                        
                        if(!opponentBoard.cells[placement-1].occupied){
                            this.checkLeft = true;
                            this.targeting = 'r';
                        } else {
                            this.targeting = 'l';
                            this.targetingNext = this.targetingNext-1;
                        }
                    }
                } else {
                      this.moveMedium(opponentBoard, 'r', this.targetingPlacement);
                } 
                break;

            default:
                console.log("Firing Random")
                var gotHit = this.moveEasy(opponentBoard);
                if(gotHit){
                    this.targeting = 'u';
                }
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

