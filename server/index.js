const envFound = require('dotenv').config();
if (!envFound) {
  console.log('⚠️  No .env file found');
  process.exit(0);
}

const express = require('express');

const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const historyApiFallback = require('connect-history-api-fallback');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const friendsRoutes = require('./routes/friends');
const gameRoutes = require('./routes/game');

const { initSocket } = require('./controllers/SocketController');
 
const app = express();

app
  // Parse JSON
  .use(bodyParser.json())
  .use(fileUpload({
    createParentPath: true
  }))
  // Cors
  .use(cors())
  // Enable routes
  .use('/api/auth', authRoutes)
  .use('/api/user', userRoutes)
  .use('/api/friends', friendsRoutes)
  .use('/api/game', gameRoutes)
  // Serve static files
  .use('/animations', express.static(path.join(__dirname, './animations')))
  .use('/icons', express.static(path.join(__dirname, './icons')))
  // Enable history API
  .use(historyApiFallback())

function startServer() {
  // Start the Express server
  if(process.env.MODE == 'development') {
    const http = require("http").createServer(app)

    const io = require('socket.io')(http)

  // const redisAdapter = require('socket.io-redis');

  // io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

    initSocket(io)

    http.listen(process.env.PORT, () => {
      console.log(`⚡️ Server started: http://localhost:${process.env.PORT}`);
    });
  }

  if(process.env.MODE == 'production') {
    const fs = require("fs")

    var sslCerts = {
      key: fs.readFileSync("/etc/letsencrypt/live/app.thetutor.link/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/app.thetutor.link/fullchain.pem")
    }

    const https = require("https").createServer(sslCerts, app)
    
    const io = require('socket.io')(https)

    // const redisAdapter = require('socket.io-redis');

    // io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

    initSocket(io)
  
    https.listen(process.env.PORT);
  }
}

// Run the async function to start our server
startServer();