'use strict';

const mongoose = require('mongoose');

const Article = new mongoose.Schema({
  author: String,
  title: String,
  body: String
});

module.exports = mongoose.model('article', Article);
