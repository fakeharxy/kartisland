var Cell = require('./cell.js');

module.exports = {

  setup: function(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];
    for (var j = 0; j < this.height; j++) {
      this.cells[j] = [];
      for (var i = 0; i < this.width; i++) {
        var newCell = Object.create(Cell);
        this.cells[j][i] = newCell;
      }
    }
  },

  getCellAt: function(x, y) {
    return this.cells[y][x];
  }

}
