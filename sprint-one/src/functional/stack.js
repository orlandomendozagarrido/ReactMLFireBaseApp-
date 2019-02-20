var Stack = function () {
  var someInstance = {};

  // Use an object with numeric keys to store values
  someInstance.storage = {};
  someInstance.c = 0
  // Implement the methods below
  someInstance.push = function (value) {
    someInstance.storage[someInstance.c++] = value
  };

  someInstance.pop = function () {
    if (someInstance.c === 0) {
      return
    }
    someInstance.c--
    var res = someInstance.storage[someInstance.c]
    return res
  };

  someInstance.size = function () {
    return someInstance.c
  };

  return someInstance;
};
