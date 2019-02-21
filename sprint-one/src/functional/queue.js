var Queue = function () {
  var someInstance = {};

  // Use an object with numeric keys to store values
  someInstance.storage = {};
  someInstance.start = 0
  someInstance.end = 0
  // Implement the methods below

  someInstance.enqueue = function (value) {
    someInstance.storage[someInstance.end++] = value
  };

  someInstance.dequeue = function () {
    var size = someInstance.start-someInstance.end
    if(size<0)return undefined;
    //if (size <= 0) return undefined;
    var item = someInstance.storage[someInstance.start];
      delete someInstance.storage[someInstance.start];
    someInstance.storage[someInstance.start++]
    if (someInstance.start === someInstance.end){
      someInstance.start = 0;
      someInstance.end = 0;
    }
    return item;
  };

  someInstance.size = function () {
    return someInstance.start-someInstance.end
  };

  return someInstance;
};