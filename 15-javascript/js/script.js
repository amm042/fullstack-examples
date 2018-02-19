// global scope
var name = 'My Name';

// Scope A: Global scope out here
var myFunction = function () {
  // Scope B: Functional (local) scope in here
  var name = 'Steve';
  if (true){
    // Scope B: {} blocks don’t have their own scope!
    var name = 'John';
  }
  console.log(name); // John
};
console.log(name); // My Name
