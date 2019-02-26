var Stack = function() {
  var obj = Object.create(stackMethods);

  obj.storage = {};  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  obj.counter = 0;// but try not not reference your old code in writing the new style.

  return obj;
};

var stackMethods = {
  push: function () {

  },

  pop: function () {

  },

  size: function () { // expect(stack.size()).to.equal(0);
    return obj.counter;
  }
};
