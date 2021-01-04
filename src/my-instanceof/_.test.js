const nodePath = require('path');
const MyInstanceof = require('./function');

MyInstanceof.test = function (describe, it, assert) {
  describe(nodePath.join(__dirname, 'function.js'), function () {
    // base
    it('MyInstanceof("1", "String") should be true', function () {
      assert.equal(MyInstanceof('1', 'String'), true);
    });
    it('MyInstanceof(1, "Number") should be true', function () {
      assert.equal(MyInstanceof(1, 'Number'), true);
    });
    // object
    it('MyInstanceof(null, "Null") should be true', function () {
      assert.equal(MyInstanceof(null, 'Null'), true);
    });
  });
};

module.exports = MyInstanceof;
