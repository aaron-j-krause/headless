const app = require('koa')();
const static = require('koa-static');
const router = require('koa-route');

//app.use(require('koa-multer')({}))
app.use(require('koa-bodyparser')());
app.use(static(`${__dirname}/dashboard/`));

app.use(router.post('/content', function *() {
  this.body = 'made ti';
}));

app.use(function *() {
  this.body = 'hi';
});

app.listen(3000);
