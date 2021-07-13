import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import fs from 'fs';
import multer from 'multer';
import * as path from 'path';
import { signup, login, isAuth } from '../controllers/auth.js';
import Good from '../models/good.js';
import Auction from '../models/auction.js';
import User from '../models/user.js';
import schedule from 'node-schedule';

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const schedule = require('node-schedule');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const { signup, login, isAuth } = '../con'


const router = express.Router();
const __dirname = path.resolve();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'loginDB'
});

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

router.get('/text', (req, res, next) => {
    res.status(200).json({ message: "asdfasdf" });
});

router.get("/aaa", (req, res) => {
    res.sendFile(path.join(__dirname, "/routes", "main.html"));
});

router.get("/view", (req, res) => {
    res.sendFile(path.join(__dirname, "/routes", "test.json"));
});

router.get("/vi", (req, res) => {
  res.sendFile(path.join(__dirname, "/views", "asdf.html"));
});

router.get('/users', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query (select all data from the 'users' table).
  connection.query('SELECT * FROM loginDB.users', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
  });
});
});

router.get('/goods', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query (select all data from the 'users' table).
  connection.query('SELECT * FROM loginDB.goods', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
  });
});
});

router.get('/auctions', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query (select all data from the 'users' table).
  connection.query('SELECT * FROM loginDB.auctions', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
  });
});
});

fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// router.post('/img', upload.single('img'), (req, res) => {
//   console.log(req.file);
//   res.json({url: `/img/${req.file.filename}`});
// })

router.post('/goods', upload.single('img'), async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const good = await Good.create({
      name,
      img: null,
      price,
    });
    // const end = new Date();
    // end.setDate(end.getDate() + 1); // 하루 뒤
    // schedule.scheduleJob(end, async () => {
    //   const success = await Auction.find({
    //     where: { goodId: good.id },
    //     order: [['bid', 'DESC']],
    //   });
    //   await Good.update({ soldId: success.userId }, { where: { id: good.id } });
    //   await User.update({
    //     money: sequelize.literal(`money - ${success.bid}`),
    //   }, {
    //     where: { id: success.userId },
    //   });
    // });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.get('/goods/:id', async (req, res, next) => {
  try {
    const [good, auction] = await Promise.all([
      Good.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          as: 'owner',
        },
      }),
      Auction.findAll({
        where: { goodId: req.params.id },
        include: { model: User },
        order: [['bid', 'ASC']],
      }),
    ]);
    res.render('auctions', {
      title: `${good.name} - NodeAuction`,
      good,
      auction,
      auctionError: req.flash('auctionError'),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/goods/:id/bid', async (req, res, next) => {
  try {
    const { bid, msg } = req.body;
    const good = await Good.findOne({
      where: { id: req.params.id },
      include: { model: Auction },
      order: [[{ model: Auction }, 'bid', 'DESC']],
    });
    if (good.price > bid) { // 시작 가격보다 낮게 입찰하면
      return res.status(403).send('시작 가격보다 높게 입찰해야 합니다.');
    }
    // 경매 종료 시간이 지났으면
    if (new Date(good.createdAt).valueOf() + (24 * 60 * 60 * 1000) < new Date()) {
      return res.status(403).send('경매가 이미 종료되었습니다');
    }
    // 직전 입찰가와 현재 입찰가 비교
    if (good.auctions[0] && good.auctions[0].bid >= bid) {
      return res.status(403).send('이전 입찰가보다 높아야 합니다');
    }
    const result = await Auction.create({
      bid,
      msg,
      userId: req.user.id,
      goodId: req.params.id,
    });
    req.app.get('io').to(req.params.id).emit('bid', {
      bid: result.bid,
      msg: result.msg,
      nick: req.user.nick,
    });
    return res.send('ok');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;