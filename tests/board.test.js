// gameboard.test.js
import Gameboard from "../gameboard";
import Ship from "../ship";

const CellState = Object.freeze({
  EMPTY: 0,
  SHIP: 1,
  HIT: 2,
  MISS: 3,
});

// Mock Ship factory
jest.mock("../ship");

describe("Gameboard Factory with CellState enum", () => {
  beforeEach(() => {
    Ship.mockClear();
  });

  test("initializes a grid of EMPTY cells", () => {
    const board = Gameboard(5);

    board.grid.forEach(row =>
      row.forEach(cell => {
        expect(cell.state).toBe(CellState.EMPTY);
        expect(cell.ship).toBeNull();
      })
    );
  });

  test("places a ship horizontally", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Gameboard(10);
    board.placeShip(3, 2, 4, true);

    expect(board.grid[2][4]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.grid[2][5]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.grid[2][6]).toEqual({ state: CellState.SHIP, ship: mockShip });
  });

  test("places a ship vertically", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Gameboard(10);
    board.placeShip(3, 1, 1, false);

    expect(board.grid[1][1]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.grid[2][1]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.grid[3][1]).toEqual({ state: CellState.SHIP, ship: mockShip });
  });

  test("records a MISS when attacking empty water", () => {
    const board = Gameboard(10);

    const result = board.receiveAttack(0, 0);

    expect(result).toBe("miss");
    expect(board.grid[0][0].state).toBe(CellState.MISS);
    expect(board.grid[0][0].ship).toBeNull();
  });

  test("calls hit() on a ship and marks HIT", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Gameboard(10);
    board.placeShip(2, 0, 0, true);

    const result = board.receiveAttack(0, 0);

    expect(result).toBe("hit");
    expect(mockShip.hit).toHaveBeenCalledTimes(1);
    expect(board.grid[0][0].state).toBe(CellState.HIT);
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