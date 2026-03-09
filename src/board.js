import Ship from "./ship";

/**
 * This is a board object, which stores the postition of ships and misses
 */
export default function Board(size) { 
    // board states
    const CellState = Object.freeze({
        EMPTY: 0,
        SHIP: 1,
        HIT: 2,
        MISS: 3,
    });
    

    // Properties:
    
    /** 
     * board - 2d board storing the state of each cell, as well as a refrence to a ship class.
     * allSunk - true if all ships are sunk, else false.
     */
    const board = Array.from(Array(size), () => new Array(size).fill({
        state: CellState.EMPTY,
        ship: null
    }));
    const allSunk = true;

    // Methods

    /**
     * Places an instance of a ship on the board.
     *  x - x cooardinate of ship (starting pos.)
     *  y - y cooardinate of ship (starting pos.)
     *  isHorizontal - if the ship is being placed horizontally or vertically.
     */
    const placeShip = (x, y, isHorizontal) => {}

    /**
     * Takes in coordinates of an attack, then determines if the attack hit or missed.
     *  x - x cooardinate of attack
     *  y - y cooardinate of attack
     */
    const recieveAttack = (x, y) => {}

    return {board, placeShip, recieveAttack}
}