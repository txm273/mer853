require('dotenv').config();

const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('REST API listening on port ', port);
});

//test routes 1
app.get('/', async (req, res) => {
  res.json({
    status: 'API is ready to serve printers from ' + process.env.PORT,
  });
});

//test routes 2
app.route('/printers').get(function (req, res, next) {
  connection.query('SELECT * FROM `printers` ', function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

//connection
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});
connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);
});
