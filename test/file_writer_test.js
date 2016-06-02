'use strict';
const expect = require('chai').expect;
const fileWriter = require('../lib/file_writer');
const fs = require('fs');
const del = require('del');

//use non arrow to set suite props
describe('File Writer', function() {
  before((done) => {
    this.tempDirPath = `${__dirname}/${Date.now()}`;
    fs.mkdir(this.tempDirPath, (err) => {
      if (err) throw err;
      done();
    });
  });

  after((done) => {
    del(this.tempDirPath)
      .then(() => done(), (err) =>  {throw err;});
  });

  it('should write a file', (done) => {
    let path = `${this.tempDirPath}/test_text.txt`;

    fileWriter.writeTextFile(path, 'test', (err) => {
      if (err) throw err;
      fs.readFile(path, (err, data) => {
        if (err) throw err;
        expect(data.toString()).to.eql('test');
        done();
      });
    });
  });

  it('should write an HTML file', (done) => {
    let path = `${this.tempDirPath}/test_html.html`;
    let content = {
      title: 'test title',
      author: 'test author',
      body: 'test body'
    };

    fileWriter.writeHTMLFile(path, content, (err) => {
      if (err) throw err;

      fs.readFile(path, (err, data) => {
        data = data.toString();

        expect(~data.indexOf('test title')).to.not.eql(0);
        expect(~data.indexOf('test author')).to.not.eql(0);
        expect(~data.indexOf('test body')).to.not.eql(0);
        expect(~data.indexOf('<section>')).to.not.eql(0);

        done();
      });
    });
  });
});
