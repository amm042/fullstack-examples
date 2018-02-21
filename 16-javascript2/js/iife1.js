/*
var fruit = 'apple'

function run(){
  console.log("Have a " + fruit + " they are red!")
}

*/

(function(window) {
  //this is now in this funciton's scope!

  // empty namespace
  var ns1 = {}

  ns1.fruit = 'apple'

  ns1.run = function() {
    console.log("Have a " + ns1.fruit + " they are red!")
  }
  // export namespace globally as ns1
  window.ns1 = ns1

})(window)
