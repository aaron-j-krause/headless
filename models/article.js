'use strict';

const mongoose = require('mongoose');

const Article = new mongoose.Schema({
  author: String,
  title: String,
  body: String
}, {timestamps: true});

module.exports = mongoose.model('article', Article);
