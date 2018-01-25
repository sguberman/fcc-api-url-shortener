// server.js
// where your node app starts

// init project
var express = require('express')
var requests = require('request')

var app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/:ID", function (request, response) {
  var url = urls[+request.params.ID]
  if (url === undefined) {
    response.send({
      error: "The URL is not in the database."
    })
  }
  response.redirect(url);
})

app.get("/new/*", function (request, response) {
  var requested_url = request.url.slice(5)
  var url = undefined
  
  requests(requested_url, function (err, resp, body) {
    if (err) {
      response.send({ 
        error: "Wrong url format, make sure you have a valid protocol and real site."
      })
    } else {
      url = requested_url
      var id = urls.length
      urls.push(url)
      response.send({
        original_url: url,
        short_url: "https://fierce-cost.glitch.me/" + id
      })
    }
  })
})

// Simple in-memory store for now
var urls = [
  "https://www.duckduckgo.com",
  "https://www.google.com",
  "https://www.freecodecamp.org"
]

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
