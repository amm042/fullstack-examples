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
Jack
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

function order(name){
  return fetch('http://localhost:3000/'+name, {method: 'PUT'})
}

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
        // add each topping with 1/3 odds.
        if (Math.random() < 1.0/toppings.length){
          tmpToppings.push(toppings[t])
        }
      }
      return top(student, tmpToppings)
    }
  } )
}

//show the orders
function getall(){
 return fetch("http://localhost:3000/").then(resp=>resp.json())
}

function cleanup(student){
  //delete all of the orders.
  return fetch('http://localhost:3000/'+student, {method: 'DELETE'})
}

// create a pizza for everyone.
Promise.all(students.map(order)).then(()=>{

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
