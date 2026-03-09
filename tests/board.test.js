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

describe("Board Factory", () => {
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

  test("places a ship horizontally", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(10);
    board.placeShip(2, 3, 3, true); // x=2, y=3, length=3

    expect(board.board[2][3]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.board[2][4]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.board[2][5]).toEqual({ state: CellState.SHIP, ship: mockShip });
  });

  test("places a ship vertically", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(10);
    board.placeShip(1, 1, 3, false);

    expect(board.board[1][1]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.board[2][1]).toEqual({ state: CellState.SHIP, ship: mockShip });
    expect(board.board[3][1]).toEqual({ state: CellState.SHIP, ship: mockShip });
  });

  test("records a MISS when attacking an EMPTY cell", () => {
    const board = Board(10);

    const result = board.recieveAttack(0, 0);

    expect(result).toBe("miss");
    expect(board.board[0][0].state).toBe(CellState.MISS);
    expect(board.board[0][0].ship).toBeNull();
  });

  test("records a HIT and calls ship.hit() when attacking a ship cell", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(10);
    board.placeShip(0, 0, 2, true);

    const result = board.recieveAttack(0, 0);

    expect(result).toBe("hit");
    expect(mockShip.hit).toHaveBeenCalledTimes(1);
    expect(board.board[0][0].state).toBe(CellState.HIT);
  });

  test("multiple cells reference the same ship instance", () => {
    const mockShip = { hit: jest.fn(), isSunk: jest.fn() };
    Ship.mockReturnValue(mockShip);

    const board = Board(10);
    board.placeShip(0, 0, 3, true);

    const a = board.board[0][0].ship;
    const b = board.board[0][1].ship;
    const c = board.board[0][2].ship;

    expect(a).toBe(b);
    expect(b).toBe(c);
  });
});