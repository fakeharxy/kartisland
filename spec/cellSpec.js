var Cell = require('../game/cell.js');
var cell;

beforeEach(function() {
  cell = Object.create(Cell);
});

describe("cell", function() {
  it("has a default type of 0", function() {
    expect(cell.type).toEqual(0);
  });

});
