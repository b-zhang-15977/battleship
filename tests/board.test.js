// board.test.js
import Board from "/src/board.js";
import Ship from "/src/ship.js";

const CellState = Object.freeze({
  EMPTY: 0,
  SHIP: 1,
  HIT: 2,
  MISS: 3,
});

// Mock Ship factory
jest.mock("/src/ship.js");

describe("Corrected Board Factory", () => {
  beforeEach(() => {
    Ship.mockClear();
  });

  test("initializes a board of EMPTY cells", () => {
    const board = Board(5);

    board.board.forEach(row =>
      row.forEach(cell => {
        expect(cell.state).toBe(CellState.EMPTY);
        expect(cell.ship).toBeNull();
      })
    );
  });

  test("places a ship horizontally across correct cells", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(10);
    board.placeShip(2, 3, 3, true);

    expect(board.board[2][3]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.board[3][3]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.board[4][3]).toEqual({ state: CellState.SHIP, ship: mockShip });
  });

  test("places a ship vertically across correct cells", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(10);
    board.placeShip(1, 1, 3, false);

    expect(board.board[1][1]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.board[1][2]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.board[1][3]).toEqual({ state: CellState.SHIP, ship: mockShip });
  });

  test("multiple cells reference the same ship instance", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(5);
    board.placeShip(0, 0, 3, true);

    const a = board.board[0][0].ship;
    const b = board.board[1][0].ship;
    const c = board.board[2][0].ship;

    expect(a).toBe(b);
    expect(b).toBe(c);
  });

  test("recieveAttack marks MISS on EMPTY cell", () => {
    const board = Board(5);

    board.recieveAttack(0, 0);

    expect(board.board[0][0].state).toBe(CellState.MISS);
  });

  test("recieveAttack marks HIT and calls ship.hit() on SHIP cell", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(5);
    board.placeShip(0, 0, 2, true);

    board.recieveAttack(0, 0);

    expect(board.board[0][0].state).toBe(CellState.HIT);
    expect(mockShip.hit).toHaveBeenCalledTimes(1);
  });

  test("allSunk becomes false when ships exist, true when all are hit", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(5);
    board.placeShip(0, 0, 2, true);

    // After placement, ships exist → allSunk should be false
    expect(board.sunk()).toBe(false);

    // Hit first segment
    board.recieveAttack(0, 0);
    expect(board.sunk()).toBe(false);

    // Hit second segment
    board.recieveAttack(1, 0);
    expect(board.sunk()).toBe(true);
  });
});