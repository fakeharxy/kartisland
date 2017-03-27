var Cell = require('../game/cell.js');
var cell;

beforeEach(function() {
  cell = Object.create(Cell);
});

describe("cell", function() {
  it("has a type", function() {
    expect(cell.type).toEqual(jasmine.anything());
  });

});
