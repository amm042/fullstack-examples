const fetch = require('node-fetch')

var students = `Dunni
Natalie
Aleksandar
Keller
Stefano
Jason
Jack
Evan
Junjie
Dan
Uttam
Allan
Jeff
Eric
Jacob
Morgan
Jack2
Christian
Ryan
Jenna
Haipu
Danny
John
Jordan
Parker
Cole
Jingya
Sarah
Dylan`.split("\n")


//randomly add some toppings
var toppings = `Pepperoni
Mushrooms
Onions
Sausage
Bacon
Extra cheese
Black olives
Green peppers
Pineapple
Spinach`.split("\n")


function order(name){
  // create a new order with <name>
  console.log("create order", name)
  return fetch('http://localhost:3000/'+name, {method: 'PUT'})
}

function top(order, t){
  // add toppings t to order
  // returns a promise
  console.log("add", t, "to", order)
  return fetch("http://localhost:3000/"+order,
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
      })
      .then(r=>r.json())
}

function addtoppings(){
    return students.map( student => {
    // some number of students to pick
    if (Math.random() > 1/2.0){
      var tmpToppings = []

      for (var t=0; t<toppings.length; t++){
        // add on average one topping.
        if (Math.random() < 1.0/toppings.length){
          tmpToppings.push(toppings[t])
        }
      }
      return top(student, tmpToppings)
    }
  } )
}

function getall(){
  //show the orders
  return fetch("http://localhost:3000/").then(resp=>resp.json())
}

function cleanup(name){
  //delete all of the orders.
  console.log("DELETE", name)
  return fetch('http://localhost:3000/'+name, {method: 'DELETE'})
}

// test cases begin here.
// create a pizza for everyone.
Promise.all(students.map(order)).then(()=>{

  // validate all orders exist
  getall().then(r => {

    // verify lengths
    // result is an object where each key is an order
    let orderNames = Object.keys(r)

    console.log(orderNames)
    students.map(student => {
      let i = orderNames.indexOf(student)
      console.assert(i >= 0, student + ' missing from server!')
    })

    Promise.all(addtoppings()).then( ()=>{

      getall().then(r => {
        console.log("--All orders--")
        console.log(r)

        Promise.all(students.map(cleanup)).then( ()=>{
          console.log("--All Done!--")

          // double check!
          getall().then(r => {
            console.log("--All orders--")
            console.log(r)
          })
        })
      })
    })
  })


})
