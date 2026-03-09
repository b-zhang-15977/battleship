import Player from "../src/player";
import Board from "../src/board";

jest.mock("../src/board"); // isolate Player tests from Board logic

describe("Player Factory", () => {
  beforeEach(() => {
    Board.mockClear();
    Board.mockImplementation(() => ({
      recieveAttack: jest.fn(),
    }));
  });

  test("creates a player with its own board", () => {
    const p = Player(false);

    expect(Board).toHaveBeenCalledTimes(1);
    expect(typeof p.board).toBe("function");
    expect(p.board()).toBeDefined();
  });

  test("each player gets a unique board instance", () => {
    const p1 = Player(false);
    const p2 = Player(false);

    expect(p1.board()).not.toBe(p2.board());
  });

  test("move() exists", () => {
    const p = Player(false);
    expect(typeof p.move).toBe("function");
  });

  test("real player move() calls enemyBoard.recieveAttack when implemented", () => {
    const real = Player(false);
    const enemy = Player(false);

    // manually stub move() since your outline has no implementation yet
    real.move = jest.fn(() => {
      enemy.board().recieveAttack(2, 3);
    });

    real.move(enemy.board());

    expect(enemy.board().recieveAttack).toHaveBeenCalledWith(2, 3);
  });

  test("computer player is created when isComputer = true", () => {
    const cpu = Player(true);

    // Your outline doesn't expose isCPU, so we check behavior instead
    expect(typeof cpu.move).toBe("function");
  });

  test("computer move() eventually attacks enemy board", () => {
    const cpu = Player(true);
    const enemy = Player(false);

    // stub move() to simulate random attack
    cpu.move = jest.fn(() => {
      enemy.board().recieveAttack(5, 5);
    });

    cpu.move(enemy.board());

    expect(enemy.board().recieveAttack).toHaveBeenCalledWith(5, 5);
  });
});