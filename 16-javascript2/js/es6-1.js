
{
  // let uses block scope
  let fruit = 'apple'

  // var uses "regular" js scope, so global or functional
  var run_1 = function (){
    console.log("Have a " + fruit + " they are red!")
  }
}
