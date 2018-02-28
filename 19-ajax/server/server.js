const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8888

var names = ["Jordan Voves", "Keller Chambers", "Stefano Cobelli",
"Jenna Slusar", "Jason Corriveau", "Cole Whitley", "Dylan Zucker",
"Danny Toback", "Eric Marshall", "Allan La", "Natalie Altman",
"Evan Harrington", "Jack Napor", "Jingya Wu", "Christian Ouellette",
"Junjie Jiang", "Morgan Muller", "Sarah Xu", "Aleksandar Antonov",
"Parker Watson", "Haipu Sun", "Ryan Pencak", "Dan Kershner",
"John Venditti", "Jacob Mendelowitz", "Dunni Adenuga", "Jeff Lee",
"Uttam Kumaran", "Jack Hall-Tipping"]

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))


app.listen(port, () => {
  console.log("server started on: " + port)
})

app.get ('/', ((req, res) => res.json({
  success: false,
  message: "This is not a valid REST endpoint."
})))

app.get ('/names', ((req, res) => res.json({
  success: true,
  names: names
})))

app.get ('/names_err', ((req, res) => res.json({
  success: false,
  names: null
})))

app.get ('/names_slow', ((req, res) => {
  setTimeout( () => {
    res.json({
      success: true,
      names: names
    })
  }, 2500)
  }))
