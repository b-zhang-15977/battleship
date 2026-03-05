import Ship from "/src/ship.js"

test('create ship with expected intial values', () => {
    const length = 3;
    const ship = Ship(length);
  
    expect(ship.length).toBe(length);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
});