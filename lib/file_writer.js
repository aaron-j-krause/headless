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
exports.writeHTMLFile = function(path, content, cb) {
  if (typeof content !== 'object') return cb(new Error('Needs article object'));
  content = parseArticle(content);
  writeFile(path, content, cb);
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

exports.writePage = function() {
  let data = fs.readFileSync(`${__dirname}/templates/main_view.html`);

  let splitTemplate = data.toString().split('<!--middle-->');
  let firstPart = splitTemplate[0] + '\n';
  let secondPart = splitTemplate[1] + '\n';
};

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

  return start + '\n</main>\n';

  function makeElement(tagname, content) {
    return `<${tagname}>\n  ${content}\n</${tagname}>\n`;
  }
}

