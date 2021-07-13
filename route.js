// // This is the routes.js file!
// import express from 'express';
// import bodyParser from 'body-parser';
// // const express = require('express');
// // const bodyParser = require('body-parser');
// import mysql from 'mysql2';

// const connection = mysql.createPool({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'loginDB'
// });
// // We're still in routes.js! Right below everything else.

// // Starting our app.
// const app = express();

// // Creating a GET route that returns data from the 'users' table.
// app.get('/users', function (req, res) {
//     // Connecting to the database.
//     connection.getConnection(function (err, connection) {

//     // Executing the MySQL query (select all data from the 'users' table).
//     connection.query('SELECT * FROM loginDB.users', function (error, results, fields) {
//       // If some error occurs, we throw an error.
//       if (error) throw error;

//       // Getting the 'response' from the database and sending it to our route. This is were the data is.
//       res.send(results)
//     });
//   });
// });


// // Starting our server.
// app.listen(80, () => {
//  console.log('Go to http://localhost:80/users so you can see the data.');
// });