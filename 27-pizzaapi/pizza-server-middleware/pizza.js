const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// a place to store all of the orders
var orders = {}
var orderId = 0

// .use binds to all http methods
// no route, means apply to ALL routes
// so all req's will be passed through
// the bodyParser.json() function
app.use(bodyParser.json())


// The API always uses the route :orderName,
// we can move checking for the order into an application-level
// middleware
function pizzaParser(req, res, next){
  if (req.params.orderName in orders){
    req.pizzaOrder = orders[req.params.orderName]
    next()
  }else{
    res.json({result:'order not found.'})
  }
}
// bind middleware to the application
// for GET, DELETE, and POST
app.get('/:orderName', pizzaParser)
app.delete('/:orderName', pizzaParser)
app.post('/:orderName', pizzaParser)

// show all orders
app.get('/', (req, res) => res.json(orders))

// route parameters are prefixed with a :
app.get('/:orderName', (req, res) => {
  res.json({
      result:'success',
      order: req.pizzaOrder
    })
})

// place an order, deal with toppincs later
// if order already exists, overwrite
// Does not use pizzaParser middleware!
app.put('/:orderName', (req, res) => {
  console.log("Create order for", req.params.orderName)
  orders[req.params.orderName] = {
    number: orderId,
    toppings: ['Cheese'] // default topping
  }
  orderId += 1 // increment order counter
  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    order: orders[req.params.orderName]
  })
})

app.delete('/:orderName', (req, res) => {
  console.log("Delete order for", req.pizzaOrder)

  // can't use req.pizzaOrder we want to delete from orders directly!
  delete orders[req.params.orderName]

  res.json({result:"success"})
})

// assume post is a JSON array of topping strings.
// like ["pepperoni", "extra cheese" ,"pickles"]
app.post('/:orderName', (req, res) => {

  console.log('post', req.body)
  // push new toppings array to toppings array
  // ... is the ES6 spread operator like *args in python
  req.pizzaOrder.toppings.push(...req.body)
  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    order: req.pizzaOrder
  })

})

app.listen(3000, () => console.log('Pizza server listening on port 3000!'))
