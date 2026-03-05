/**
 * Ship object - creates a ship object which acts like a ship in battleship
 */
export default function Ship(l) {
    // object properties
    let LENGTH = l;
    let HITS = 0;
    let SUNK = false;

    // methods

    /** getters **/
    const length = () => LENGTH;
    const hits = () => HITS;
    const isSunk = () => SUNK;

    /**
     * Increaes the amount of times the ship has been hit
     */
    const hit = () => {
        if (HITS < LENGTH) {
            HITS++;
            if (HITS === LENGTH) {
                SUNK = true;
            }
        }
    };


    return {length, hits, hit, isSunk}
}