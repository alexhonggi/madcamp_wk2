import express from 'express';

import sequelize from './utils/database.js';
// import sequelize from './models/index.js';

import router from './routes/routes.js';

import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const __dirname = path.resolve();
app.use('/img', express.static(path.join(__dirname, 'uploads')));


app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync(); 

app.listen(80);