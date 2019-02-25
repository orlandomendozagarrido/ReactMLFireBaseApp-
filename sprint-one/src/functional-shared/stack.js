var Stack = function() {
  var instance = {};
  instance.storage = {}// Hey! Rewrite in the new style. Your code will wind up looking very similar,
  instance.c = 0;// but try not not reference your old code in writing the new style.
 extend(instance, stackMethods)//extends props of our method obj to our instance
return instance
};
var extend = function(obj, methods) {//adds props of one obj to another obj
  for (var key in methods) {
    obj[key] = methods[key]
  }
}
var stackMethods = {//methods we created that we can use on stack class
  push: function (value) {//push function pushes the value to the stack
    var res = this.storage[this.c++]=value
    return res;
  },
  pop: function() {//pops off from stack
    if(this.c === 0)
    return;
    this.c--
    var rslts = this.storage[this.c]
    return rslts;
  },
  size: function() {//reports size of stack 
    return this.c;
    
  }
};
