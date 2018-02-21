/*

function Circle (radius) {
  this.radius = radius
  this.getArea = function(){
    return Math.PI * this.radius * this.radius
  }
}

*/


//function Constructor
function Circle (radius) {
  this.radius = radius
}

//Circle prototypes
Circle.prototype.getArea = function(){
    var self = this
    var foo = function (){
      self.radius = 99
    }
    foo()
    return Math.PI * this.radius * this.radius
}

var myCircle = new Circle(10)
console.log(myCircle.getArea())



class Rectangle {
  constructor(width, height){
    this.width = width
    this.height = height
  }
  getArea(){
    return this.width * this.height
  }
}

var myRec = new Rectangle(3,4)
console.log(myRec.getArea())

console.log(myRec)



class Square extends Rectangle {
  constructor(size){
    super(size,size)
  }
}
var mySq = new Square(5)
console.log(mySq.getArea())
console.log(mySq)
