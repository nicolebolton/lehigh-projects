const express = require('express');
const Post = require('../models/Post.js');
const router = express.Router();
var unirest = require("unirest");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MangoDB' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'MangoDB' });
});

router.get('/saved', function(req, res, next) {
  res.render('saved', { title: 'MangoDB' });
});

router.get('/users', function(req, res, next) {
  res.render('users', { title: 'MangoDB' });
});

module.exports = router;
