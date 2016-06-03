'use strict';
const app         = require('koa')();
const staticServe = require('koa-static');
const router      = require('koa-route');
const Article     = require('./models/article');
const mongoose    = require('mongoose');

//config
mongoose.connect('mongodb://localhost/dev_db');

app.use(require('koa-bodyparser')());
app.use(staticServe(`${__dirname}/`));

app.use(router.post('/content', function *() {
  let newArticle = new Article(this.request.body);

  this.body = yield newArticle.save();
}));

app.use(function *() {
  this.body = 'hi';
});

app.listen(3000);
