import Board from "./board.js";

/**
 * This is a player object 
 */
export default function Player(isComputer, size) {
    const playerBoard = Board();
    const attemptedMoves = [];

    /**
     * returns the board owned by the player
     */
    const board = () => playerBoard;

    /**
     * If player is a computer, generate a random coordinate to attack, else prompt for coordinates then attacks
     */
    const move = (enemyBoard, x, y) => {
        // CPU: ignore provided coords and generate valid ones
        if (isComputer) {
        const size = enemyBoard.size;

        // keep generating until we find a valid move
        let valid = false;
        while (!valid) {
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);

            // check if this move was already attempted
            valid = !attemptedMoves.some(m => m.x === x && m.y === y);
        }
        }

        // HUMAN: if invalid, return null so UI can retry
        const alreadyTried = attemptedMoves.some(m => m.x === x && m.y === y);
        if (!isComputer && alreadyTried) {
        return null;
        }

        // record the move as an object
        attemptedMoves.push({ x, y });

        // perform the attack
        return enemyBoard.recieveAttack(x, y);
    };

    return {board, move};
}