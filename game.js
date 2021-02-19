class Game
{
    constructor(players)
    {
        // States
        // 1 = Placing
        // 2 = Firing
        // 3 = Game Over
        this.state = 1;
        this.players = players;
    }

    getState()
    {
        return this.state;
    }
};