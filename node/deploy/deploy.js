#!/usr/bin/env node

/*
  So my job is to template out all the files to an out dir folder.
  I write the folder to STDOUT so the following process can sync
  the folder with S3.
*/

const fs = require('fs');
const os = require('os');
const path = require('path');
const marked = require('marked');
const mkdirp = require('mkdirp');
const dot = require('dot');
marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
const wrapper = fs.readFileSync('wrapper.html', 'utf8');
const template = dot.template(wrapper);
const folder = '../../';
process.chdir(folder);

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 11; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
const outDir = path.join(os.tmpdir(), makeid());

function getTitle(mdString) {
  var lexer = new marked.Lexer();
  var tokens = lexer.lex(mdString);
  for (let i = 0, l = tokens.length; i < l; i++) {
    if (tokens[i].type === 'heading') {
      return tokens[i].text;
    }
  }
  return 'NO TITLE';
}

function doTemplate(year, mdFile) {
  mkdirp.sync(path.join(outDir, year));
  const htmlFilePath =
    path.join(outDir, year, mdFile.replace('.md', '.html'));
  const mdString = fs.readFileSync(path.join(year, mdFile), 'utf8');
  const it = {
    html: marked(mdString),
    title: getTitle(mdString)
  }
  const result = template(it);
  fs.writeFileSync(htmlFilePath, result);
}
fs.readdirSync('.').forEach(year => {
  // Loop any folders in glo root whose names are years (4 digits).
  if (year.match('\\d\{4\}')) {
    fs.readdirSync(year).forEach(mdFile => {
      // Process any .md files in those folders.
      if (path.extname(mdFile) === '.md') {
        doTemplate(year, mdFile);
      }
    });
  }
});
// Write outDir to STDOUT so following process knows
// which folder to sync with S3.
console.log(outDir);