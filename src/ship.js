/**
 * Ship object - creates a ship object which acts like a ship in battleship
 */
export default function Ship(shipLength) {
    // object properties
    let length = shipLength;
    let hits = 0;
    let sunk = 0;

    // methods
    
    /**
     * Increaes the amount of times the ship has been hit
     */
    const hit = () => { 
        hits++;
    }

    /**
     * Returns if the ship has been sunk
     */
    const isSunk = () => { }

    return {hit, isSunk}
}