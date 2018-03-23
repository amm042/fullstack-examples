const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// create db connection
const mongoose = require('mongoose')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('/home/amm042/creds/mongoose.json', 'UTF-8'))
mongoose.connect(config.dburl)
var db = mongoose.connection

// define the order schema
var orderSchema = mongoose.Schema({
  name: String,
  toppings: [String]
})
// bind schema to the mongodb collection 'pizza-orders'
var Order = mongoose.model('pizza-orders', orderSchema)

// set to remove all docs in database, if there is anything leftover
var cleanDb = false

if (cleanDb === true){
  Order.remove({}, err=>{
    if(err) console.log("failed to remove all docs")
  })
}
// a place to store all of the orders
// don't need this any more!
//var orders = {}
//var orderId = 0

// .use binds to all http methods
// no route, means apply to ALL routes
// so all req's will be passed through
// the bodyParser.json() function
app.use(bodyParser.json())

// The API always uses the route :orderName,
// we can move checking for the order into an application-level
// middleware
function pizzaParser(req, res, next){

  // this no longer works, we have to query the database (use Order.find()!)
  // if (req.params.orderName in orders){

  Order.find({name: req.params.orderName}, (err, orders)=>{
    if (err || orders.length === 0) {
      res.json({result:'order not found.'})
    }else{
      req.pizzaOrder = orders[0]
      next()
    }
  })

}
// bind middleware to the application
// for GET, DELETE, and POST
app.get('/:orderName', pizzaParser)
app.delete('/:orderName', pizzaParser)
app.post('/:orderName', pizzaParser)

// show all orders
app.get('/', (req, res) => {
  Order.find().then(orders => {
      res.json(orders)
    })
})

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


  // insert a new order in the database
  // don't forget to set the default toppings: ['Cheese']
  var order = Order({
      name:req.params.orderName,
      toppings:['Cheese']})
  order.save()

  // orders[req.params.orderName] = {
  //   number: orderId,
  //   toppings: ['Cheese'] // default topping
  // }

  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    order: order
  })
})

app.delete('/:orderName', (req, res) => {
  console.log("Delete order for", req.pizzaOrder)

  // this now has to delete from the database,
  // use Order.remove()!
  // delete orders[req.params.orderName]

  Order.remove({_id:req.pizzaOrder._id}, err=>{
    if (err) {
      res.json({result:"error", message:err})
    }else{
      res.json({result:"success"})
    }
  })


})

// assume post is a JSON array of topping strings.
// like ["pepperoni", "extra cheese" ,"pickles"]
app.post('/:orderName', (req, res) => {

  console.log('post', req.body)
  // push new toppings array to toppings array
  // ... is the ES6 spread operator like *args in python
  // don't forget to save it back to the database!
  req.pizzaOrder.toppings.push(...req.body)
  req.pizzaOrder.save()
  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    order: req.pizzaOrder
  })

})

app.listen(3000, () => console.log('Pizza server listening on port 3000!'))
