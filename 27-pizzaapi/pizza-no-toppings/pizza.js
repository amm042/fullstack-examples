const express = require('express')
const app = express()

// a place to store all of the orders
var orders = {}
var orderId = 0

app.get('/', (req, res) => res.send('Hello World!'))

// route parameters are prefixed with a :
app.get('/:orderName', (req, res) => {
  if (req.params.orderName in orders){
    res.json({
        result:'success',
        order: orders[req.params.orderName]
      })
  }else{
    res.json({result:'order not found.'})
  }
})

// place an order, deal with toppincs later
// if order already exists, overwrite
app.put('/:orderName', (req, res) => {
  orders[req.params.orderName] = {
    number: orderId,
    toppings: ['cheese'] // default topping
  }
  orderId += 1 // increment order counter
  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    order: orders[req.params.orderName]
  })
})

app.delete('/:orderName', (req, res) => {
  if (req.params.orderName in orders){
    delete orders[req.params.orderName]
    res.json({result:"success"})
  }else{
    res.json({result:'order not found.'})
  }
})

app.post('/:orderName', (req, res) => {

})

app.listen(3000, () => console.log('Pizza server listening on port 3000!'))
