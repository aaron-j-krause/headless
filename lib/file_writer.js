'use strict';
const fs = require('fs');

module.exports = exports = {};

exports.writeTextFile = function(path, content, cb) {
  writeFile(path, content, cb);
};

/**
*Read a content object and write to html article
*
*@param {string} path
*@param {object} content
*@param {function} cb
*/
exports.writeArticleToFile = function(path, content, cb) {
  if (typeof content !== 'object') return cb(new Error('Needs article object'));
  content = parseArticle(content);
  writeFile(path, content, cb);
};

/**
*Take array of content objects and write to html page
*
*@param {string} path
*@param {array} articles
*@param {function} cb
*/
exports.writePageToFile = function(path, articles, cb) {
  //TODO async
  let template = fs.readFileSync(`${__dirname}/templates/main_view.html`);

  let splitTemplate = template.toString().split('<!--middle-->');
  let firstPart = splitTemplate[0] + '\n';
  let secondPart = splitTemplate[1] + '\n';
  articles = articles.reduce((acc, article) => acc += parseArticle(article),
    firstPart) + secondPart;

  writeFile(path, articles, (err) => {
    if (err) cb(err);
    cb();
  });
};

/**
*FS writeFile helper
*
*@private
*/

function writeFile(path, content, cb) {
  fs.writeFile(path, content, (err) => {
    if (err) cb(err);
    cb && cb();
  });
}

/**
*Parses content object to HTML string
*
*@private
*/
function parseArticle(content) {
  let start = '<section>\n';
  start += makeElement('h1', content.title);
  start += makeElement('h3', content.author);
  start += makeElement('p', content.body);

  return start + '\n</section>\n';

  function makeElement(tagname, content) {
    return `<${tagname}>\n  ${content}\n</${tagname}>\n`;
  }
}

