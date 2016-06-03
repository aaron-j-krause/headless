'use strict';
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const request = chai.request;
const expect = chai.expect;

const baseUri = 'http://localhost:3000';
process.env.MONGODB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('Article Router', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => done());
  });

  it('should create a new article', (done) => {
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
});