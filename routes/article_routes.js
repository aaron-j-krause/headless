'use strict';
const Article = require('../models/article');
const router = module.exports = exports = require('koa-router')();

router.post('/content', function *() {
  let newArticle = new Article(this.request.body);

  this.body = yield newArticle.save();
});
