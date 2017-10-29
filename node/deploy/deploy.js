#!/usr/bin/env node

// My job is to template out all the files to an out dir.
// I write the out dir to STDOUT at the end so the following
// process can sync it with S3.

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
const template = dot.template(fs.readFileSync('index.html', 'utf8'));
// cd to project root.
process.chdir('../../');

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

const its = [];

// const indexIt = {
//   older: []
// };

// reverse sort array on link
function compare(a, b) {
  if (a.link > b.link)
    return -1;
  if (a.link < b.link)
    return 1;
  return 0;
}

function templateOutFiles() {
  its.sort(compare);
  let older = [];
  its.forEach(function(it) {
    older.push(it);
  });
  its.forEach(function(it) {
    it.older = older;
  });
  //console.log(JSON.stringify(older,null,2));
  for (let i = 0, l = its.length; i < l; i++) {
    if (i === 0) {
      fs.writeFileSync(
        path.join(outDir, 'index.html'),
        template(its[i]));
    }
    fs.writeFileSync(
      its[i].filePath,
      template(its[i]));
  }
}

function doTemplate(year, mdFile) {
  mkdirp.sync(path.join(outDir, year));
  const htmlFilePath =
    path.join(outDir, year, mdFile.replace('.md', ''));
  const olderLink =
    path.join(year, mdFile.replace('.md', ''));
  const mdString = fs.readFileSync(path.join(year, mdFile), 'utf8');
  its.push({
    html: marked(mdString),
    title: getTitle(mdString),
    filePath: htmlFilePath,
    link: path.join(year, mdFile.replace('.md', ''))
  });
  // indexIt.html = it.html;
  // indexIt.title = it.title;
  // indexIt.older.push({
  //   link: olderLink,
  //   title: it.title
  // });
  // const result = template(it);
  // fs.writeFileSync(htmlFilePath, result);
}

function doJsCss() {
  mkdirp.sync(path.join(outDir, 'jscss'));
  fs.writeFileSync(
    path.join(outDir, 'jscss', 'blog.css'),
    fs.readFileSync(
      path.join('node', 'deploy', 'jscss', 'blog.css')));
  fs.writeFileSync(
    path.join(outDir, 'jscss', 'bootstrap.min.css'),
    fs.readFileSync(
      path.join('node', 'deploy', 'jscss', 'bootstrap.min.css')));
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
templateOutFiles();
doJsCss();
// Write outDir to STDOUT so following process knows
// which folder to sync with S3.
console.log(outDir);