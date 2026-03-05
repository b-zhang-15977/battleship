import Ship from "/src/ship.js"

test("initializes with correct default values", () => {
  const ship = Ship(3);

  expect(ship.length()).toBe(3);
  expect(ship.hits()).toBe(0);
  expect(ship.isSunk()).toBe(false);
  expect(typeof ship.hit).toBe("function");
  expect(typeof ship.isSunk).toBe("function");
});

test("hit() increments hits by 1", () => {
  const ship = Ship(3);

  ship.hit();

  expect(ship.hits()).toBe(1);
  expect(ship.isSunk()).toBe(false);
});

test("isSunk() returns false when hits < length", () => {
  const ship = Ship(3);

  expect(ship.isSunk()).toBe(false);
});

test("ship becomes sunk when hits === length", () => {
  const ship = Ship(2);

  ship.hit();
  ship.hit();

  expect(ship.hits()).toBe(2);
  expect(ship.isSunk()).toBe(true);
});

test("extra hits do not increase hits beyond length", () => {
  const ship = Ship(2);

  ship.hit();
  ship.hit();
  ship.hit(); // extra hit

  expect(ship.hits()).toBe(2); 
  expect(ship.isSunk()).toBe(true);
});

test("multiple ships maintain independent state", () => {
  const a = Ship(3);
  const b = Ship(4);

  a.hit();
  a.hit();
  b.hit();

  expect(a.hits()).toBe(2);
  expect(b.hits()).toBe(1);
});