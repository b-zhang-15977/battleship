/**
 * Ship object - creates a ship object which acts like a ship in battleship
 */
export default function Ship(l) {
    // object properties
    let LENGTH = l;
    let HITS = 0;
    let SUNK = false;

    // methods

    // getters
    const length = () => LENGTH;
    const hits = () => HITS;

    /**
     * Increaes the amount of times the ship has been hit
     */
    const hit = () => { 
        hits++;
    }

    /**
     * Returns if the ship has been sunk
     */
    const isSunk = () => { 
        length - hits > 0 ? SUNK = false : SUNK = true;
        return SUNK;
    }

    return {length, hits, hit, isSunk}
}