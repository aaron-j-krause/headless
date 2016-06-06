'use strict';
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const Article = require('../models/article');
chai.use(chaiHTTP);

const request = chai.request;
const expect = chai.expect;

const baseUri = 'http://localhost:3000';
process.env.MONGODB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('Article Router', function() {
  after(done => {
    mongoose.connection.db.dropDatabase(() => done());
  });

  it('should create a new article', done => {
    let testArticle = {
      author: 'test_author',
      body: 'test_body',
      title: 'test_title'
    };

    request(baseUri)
      .post('/content')
      .send(testArticle)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('createdAt');
        expect(res.body.author).to.eql('test_author');
        done();
      });
  });

  it('should get a view', done => {
    request(baseUri)
      .get('/content')
      .end((err, res) => {
        if (err) throw err;
        expect(res.text).to.contain('<main>');
        done();
      });
  });

  describe('Tests that require data', function() {
    this.testArticle;
    beforeEach(done => {
      let article = {author: 'test', body: 'test', title: 'test'};
      let newArticle = new Article(article);

      newArticle.save((err, article) => {
        this.testArticle = article;
        done();
      });
    });

    it('should update an article', done => {
      let updated = {article: 'update', body: 'update', title:'update'};
      request(baseUri)
        .put(`/content/${this.testArticle._id}`)
        .send(updated)
        .end((err, res) => {
          expect(res.body.message).to.eql('updated!');
          done();
        });
    });

    it('should delete an article' , done => {
      request(baseUri)
        .delete(`/content/${this.testArticle._id}`)
        .end((err, res) => {
          expect(res.body.message).to.eql('deleted!');
          done();
        });
    });
  });
});