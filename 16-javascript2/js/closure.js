var text = 'global text';
var sayHello = function (name) {
  var text = 'Hello, ' + name;
  return function () {
    console.log(text);
  };
};
sayHello('Brian')(); // Hello, Brian!



var q = sayHello("Q")
var goodbye = sayHello("goodbye!")

q();
goodbye()

console.log(q)
console.log(goodbye)


console.dir(q)
console.dir(goodbye)
