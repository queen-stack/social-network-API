//import express.js server module
const express = require('express');
//instantiate a server
const app = express();
//import mongooseJS library that will be used to create the models and integrate with MongoDB
const mongoose = require('mongoose');
//set a port to validate locally
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//importing routes
app.use(require('./routes'));

// mongoose library connection to local mongo database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetDB', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// log for mongoDB queries that are run
mongoose.set('debug', true);


// console log port listening to
app.listen(PORT, () => console.log(`Connected on localhost PORT: ${PORT}`));
