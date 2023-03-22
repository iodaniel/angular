// var express = require('express');
// var path = require('path');
// var http = require('http');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var mongoose = require('mongoose');  
                      
// // import the routing file to handle the default (index) route
// const index = require('./server/routes/app');
// const messageRoutes =require("./server/routes/messages");
// const contactRoutes = require("./server/routes/contacts");
// const documentRoutes = require("./server/routes/documents")
// // ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 

// var app = express(); // create an instance of express

// // Tell express to use the following parsers for POST data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(cookieParser());

// app.use(logger('dev')); // Tell express to use the Morgan logger

// // Add support for CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, PUT, DELETE, OPTIONS'
//   );
//   next();
// });

// // Tell express to use the specified director as the
// // root directory for your web site
// app.use(express.static(path.join(__dirname, 'dist/cms')));

// // Tell express to map the default route ('/') to the index route
// app.use('/', index);
// app.use('/messages', messageRoutes);
// app.use('/contacts', contactRoutes);
// app.use('/documents', documentRoutes);
// // ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...

// // Tell express to map all other non-defined routes back to the index page
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
// });

// // establish a connection to the mongo database
// mongoose.connect('mongodb+srv://iodaniel:Dharma_5158_@cluster0.gskaio0.mongodb.net/?retryWrites=true&w=majority',
//    { useNewUrlParser: true }, (err, res) => {
//       if (err) {
//          console.log('Connection failed: ' + err);
//       }
//       else {
//          console.log('Connected to database!');
//       }
//    }
   
// );
// mongoose.set('strictQuery', true);
// // Define the port address and tell express to use this port
// const port = process.env.PORT || '3000';
// app.set('port', port);

// // Create HTTP server.
// const server = http.createServer(app);

// // Tell the server to start listening on the provided port
// server.listen(port, function() {
//   console.log('API running on localhost: ' + port)
// });

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const index = require('./server/routes/app');
const messageRoutes = require('./server/routes/messages');
const contactRoutes = require('./server/routes/contacts');
const documentRoutes = require('./server/routes/documents');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'dist/cms')));

app.use('/', index);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

mongoose.set('strictQuery', true);



// Use environment variables for the database connection string and the port number
const dbURI = 'mongodb+srv://iodaniel:Dharma_5158_@cluster0.gskaio0.mongodb.net/?retryWrites=true&w=majority';
const port = process.env.PORT || 3000;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log('Connection failed: ' + err);
  });
