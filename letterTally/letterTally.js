//Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {'p':1, 'o':2, 't':2, 'a':1}

var letterTally = function(str) {
  var newObj = {};  // create placeholder for return object
  for (i = 0; i < str.length; i++) {  // loop through string to accesss each letter
    if (!newObj[str[i]]) {   // check if that letter is a key in your object
      newObj[str[i]] = 1;  // create property for each new letter you see
    } else {
      newObj[str[i]]++
    }  // add count to each non-new letter you see
  }
// return object
  return newObj;
};

/*
I - string
O - object with a tally of each letter

console.log(letterTally("potato"));