'use strict';
const app           = require('koa')();
const staticServe   = require('koa-static');
const articleRouter = require('./routes/article_routes');
const mongoose      = require('mongoose');
const cors          = require('koa-cors');
const dbport        = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';

//config
mongoose.connect(dbport);
app.use(cors());

app.use(function *(next) {
  console.log(this.request.url, this.request.method);
  yield next;
});

app.use(require('koa-bodyparser')());
app.use(staticServe(`${__dirname}/`));


app.use(articleRouter.routes());

app.use(function *() {
  this.body = 'hi';
});

app.listen(3000);
