var Board = require('../game/board.js');
var board;

beforeEach(function() {
  board = Object.create(Board);
});

describe("board", function() {
  it("is set up at certain size", function() {
    board.setup(5,3);
    expect(board.width).toEqual(5);
    expect(board.height).toEqual(3);
  });

  it("will be full of cells", function() {
    var width = 5;
    var height = 3;
    board.setup(width,height);
    for (var i=0; i < width; i++) {
      for (var j=0; j < height; j++) {
    expect(board.getCellAt(i,j)).toEqual(jasmine.anything());
      }
    }
  });

});
