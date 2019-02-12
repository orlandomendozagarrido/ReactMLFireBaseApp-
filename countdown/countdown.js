// Given an integer start_num, write code to print a countdown from
// start_num to 1. After the countdown is up, print the line "Liftoff!".

function liftOff(num) {
  // Your code here.
  /* START SOLUTION */
  for (var i = num; i>=0;i--){
    if(i===0){
      return "Liftoff!"
    }
    console.log("T minus " + i )
  }
  /* END SOLUTION */
}
liftOff(60)
