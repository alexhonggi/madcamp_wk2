// import express from 'express';

// import sequelize from './utils/database.js';
// import sequelize from './models/index.js';

// import router from './routes/routes.js';

// import path from 'path';

const express = require('express');
const path = require('path');

const indexRouter = require('./routes/routes.js');
const authRouter = require('./routes/auth.js');
const { sequelize } = require('./models');
// require('dotenv').config();
// const router = require('./routes/routes');

const app = express();
sequelize.sync(); 


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 80);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const __dirname = path.resolve();
// app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// app.use((req, res, next) => {
//     const err = new Error('왜 안되는지 생각해봐');
//     err.status = 404;
//     next(err);
//   });
  
  // app.use((err, req, res, next) => {
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};
  //   res.status(err.status || 500);
  //   res.json({ error: "인생.." });
  // });


const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });