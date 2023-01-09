require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const { json, urlencoded } = require('express');

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res)=> res.status(200).sendFile(path.join(__dirname, '../client', 'index.html')));

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
  
  /**
   * start server
   */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
  
module.exports = app;
