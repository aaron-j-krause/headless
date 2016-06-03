'use strict';
const app           = require('koa')();
const staticServe   = require('koa-static');
const articleRouter = require('./routes/article_routes');
const mongoose      = require('mongoose');
const dbport        = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';

//config
mongoose.connect(dbport);

app.use(require('koa-bodyparser')());
app.use(staticServe(`${__dirname}/`));


app.use(articleRouter.routes());

app.use(function *() {
  this.body = 'hi';
});

app.listen(3000);
