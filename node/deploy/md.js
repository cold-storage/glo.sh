#!/usr/bin/env node

const marked = require('marked');
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
const md = `
# A Cool MD Doc

This is some kind of document. It will have stuff in it.

* Point One
* Point Two
* Point Three

\`\`\`bash
curl -vvv http://google.com
\`\`\`
`;

console.log(marked(md));

var lexer = new marked.Lexer();
var tokens = lexer.lex(md);

console.log(tokens);

for (let i = 0, l = tokens.length; i < l; i++) {
  if (tokens[i].type === 'heading') {
    console.log('HEADING: ' + tokens[i].text);
    break;
  }
}