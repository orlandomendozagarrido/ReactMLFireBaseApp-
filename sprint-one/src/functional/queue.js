var Queue = function () {
  var someInstance = {};

  // Use an object with numeric keys to store values
  someInstance.storage = {};//a storage prop in someintance obj
  someInstance.start = 0
  someInstance.end = 0
  // Implement the methods below

  someInstance.enqueue = function (value) {
    someInstance.storage[someInstance.end] = value
    someInstance.end++
  };

  someInstance.dequeue = function () {
    var size = someInstance.start - someInstance.end
    if (size === 0){ return undefined;}
    //if (size <= 0) return undefined;
    var item = someInstance.storage[someInstance.start];
    delete someInstance.storage[someInstance.start];
    someInstance.start++
    return item;
  };

  someInstance.size = function () {
    return (someInstance.end - someInstance.start)
  };

  return someInstance;
};