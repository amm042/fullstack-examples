const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var orders = {}
var orderId = 0

app.use(bodyParser.json())

function pizzaParser(req, res, next){
  if (req.params.orderName in orders){
    req.pizzaOrder = orders[req.params.orderName]
    next()
  }else{
    res.json({result:'order not found.'})
  }
}

app.get('/:orderName', pizzaParser)
app.delete('/:orderName', pizzaParser)
app.post('/:orderName', pizzaParser)

app.get('/', (req,res)=>{
  res.json({
    result: 'success',
    orders: orders
  })
})


app.get('/:orderName', (req,res)=>{
  res.json({
    result: 'success',
    orders: req.pizzaOrder
  }) 
})

// place an order, deal with toppings later
// if order already exists, overwrite
app.put('/:orderName', (req, res) => {
  orders[req.params.orderName] = {
    number: orderId,
    toppings: []
  } // empty toppings for now!
  orderId += 1 // increment order counter
  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    order: orders[req.params.orderName]
  })
})


app.delete('/:orderName', (req, res) => {

  delete orders[req.params.orderName]
  res.json({result:"success"})

})

app.post('/:orderName', (req, res) => {

  console.log('post', req.body)
  req.pizzaOrder.toppings.push (...req.body)

  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    order: req.pizzaOrder
  })

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
