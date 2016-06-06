'use strict';
const Article = require('../models/article');
const router = module.exports = exports = require('koa-router')();
const toHTML = require('../lib/file_writer').pageHTMLString;

router.post('/content', function *() {
  let newArticle = new Article(this.request.body);

  this.body = yield newArticle.save();
});

//renders view
router.get('/content', function *() {
  let articles = yield Article.find({});
  console.log(articles);
  let view = toHTML(articles);
  this.body = view;
});

router.put('/content/:id', function *() {
  let _id = this.params.id;
  yield Article.findOneAndUpdate({_id}, this.request.body)
    .exec().catch(err => console.dir(err));
  this.body = {message: 'updated!'};
});

router.delete('/content/:id', function *() {
  let _id = this.params.id;
  yield Article.findOneAndRemove({_id})
    .exec().catch( err => console.dir(err));
  this.body = {message: 'deleted!'};
});
