var Stack = function() {
  var instance = {}
  instance.storage = {}// Hey! Rewrite in the new style. Your code will wind up looking very similar,
  instance.c = 0;// but try not not reference your old code in writing the new style.
 extend(instance, stackMethods)
return instance
};
var extend = function(obj, methods) {
  for (let key in methods) {
    obj[key] = methods[key]
  }
}
var stackMethods = {
  push: function (value) {
    var res = instance.storage[instance.c++]=value
    return res;
  },
  pop: function() {
    if(instance.c === 0)
    return;
  },
  size: function() {
    return instance.c;
  }
};


