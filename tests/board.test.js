// gameboard.test.js
import Gameboard from "../gameboard";
import Ship from "../ship";

// Mock Ship factory so we can track hit() and isSunk()
jest.mock("../ship");

describe("Gameboard Factory", () => {
  beforeEach(() => {
    Ship.mockClear();
  });

  test("initializes an empty grid", () => {
    const board = Gameboard(5);

    expect(board.grid.length).toBe(5);
    expect(board.grid[0].length).toBe(5);

    // All cells should be null
    board.grid.forEach(row =>
      row.forEach(cell => expect(cell).toBeNull())
    );
  });

  test("places a ship horizontally", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Gameboard(10);
    board.placeShip(3, 2, 4, true);

    expect(board.grid[2][4]).toBe(mockShip);
    expect(board.grid[2][5]).toBe(mockShip);
    expect(board.grid[2][6]).toBe(mockShip);
  });

  test("places a ship vertically", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Gameboard(10);
    board.placeShip(3, 1, 1, false);

    expect(board.grid[1][1]).toBe(mockShip);
    expect(board.grid[2][1]).toBe(mockShip);
    expect(board.grid[3][1]).toBe(mockShip);
  });

  test("records a miss when attacking empty water", () => {
    const board = Gameboard(10);

    const result = board.receiveAttack(0, 0);

    expect(result).toBe("miss");
    expect(board.misses).toContainEqual([0, 0]);
  });

  test("calls hit() on a ship when attacked", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Gameboard(10);
    board.placeShip(2, 0, 0, true);

    const result = board.receiveAttack(0, 0);

    expect(result).toBe("hit");
    expect(mockShip.hit).toHaveBeenCalledTimes(1);
  });

  test("allShipsSunk returns false when at least one ship is not sunk", () => {
    const mockShip1 = { hit: jest.fn(), isSunk: jest.fn(() => false) };
    const mockShip2 = { hit: jest.fn(), isSunk: jest.fn(() => true) };

    Ship
      .mockReturnValueOnce(mockShip1)
      .mockReturnValueOnce(mockShip2);

    const board = Gameboard(10);
    board.placeShip(2, 0, 0, true);
    board.placeShip(3, 5, 5, true);

    expect(board.allShipsSunk()).toBe(false);
  });

  test("allShipsSunk returns true when all ships are sunk", () => {
    const mockShip1 = { hit: jest.fn(), isSunk: jest.fn(() => true) };
    const mockShip2 = { hit: jest.fn(), isSunk: jest.fn(() => true) };

    Ship
      .mockReturnValueOnce(mockShip1)
      .mockReturnValueOnce(mockShip2);

    const board = Gameboard(10);
    board.placeShip(2, 0, 0, true);
    board.placeShip(3, 5, 5, true);

    expect(board.allShipsSunk()).toBe(true);
  });
});