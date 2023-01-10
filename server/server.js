require('dotenv').config();

const path = require('path');
const express = require('express');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGO_DBNAME
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const userController = require(path.join(__dirname, 'controller', 'userController.js'));

const app = express();
const PORT = process.env.PORT || 3000;

const { json, urlencoded } = require('express');

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res)=> res.status(200).sendFile(path.join(__dirname, '../client', 'index.html')));

//app.get('/signup', (req, res) => res.sendFile(path.resolve(__dirname, '../client/signup.html')));

app.post('/signup', 
  userController.createUser,
  (req, res) => {
    // what should happen here on successful sign up?
    res.status(200).json({});
    //res.redirect('/secret');
});

/*app.post('/login', userController.
  (req, res) => {
  // what should happen here on successful log in?
    res.redirect('/secret');
});*/

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, {message: {err: err}});
  console.log(`${errorObj.log}`);
  
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
  
module.exports = app;
