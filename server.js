require('dotenv').config()

const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// var http = require('http').createServer(app);
// var io = require('socket.io')(http);


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// io.on('connection', function(socket){
//   console.log('a user connected');

//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
//   socket.on('book saved', function(msg){
//     console.log('book saved: ' + msg);
//     socket.broadcast.emit("book saved", "Book: " + msg + " is saved.");
//   });
// });

// http.listen(PORT, function(){
//   console.log('listening on PORT : '+ PORT);
// });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
