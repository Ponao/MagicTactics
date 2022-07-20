const express = require('../server/node_modules/express');
const path = require('path');
const http = require("http")
const fs = require("fs")
const cookieParser = require("../server/node_modules/cookie-parser")

// const sslCerts = {
//   key: fs.readFileSync("/etc/letsencrypt/live/mastercardmaze.com/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/mastercardmaze.com/fullchain.pem")
// }

const app = express()
app.use(cookieParser())

const options = {
  headers: {
    'Cache-Control': 'no-cache',
  }
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), options)
  return 0
})

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), options)
  return 0
})

http.createServer(app).listen(80)

// const http = require('http')

// http.createServer(function (req, res) {
//   res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url })
//   res.end()
// }).listen(80)