#!/usr/bin/env node

const dot = require('dot');
const t = dot.template(`
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Super Cool Site</title>
</head>
<body>
  <h1>Super Cool Site</h1>
  <p>Hello, {{=it.name}}</p>
  <p>Here are your friends.</p>
  <ul>
    {{~it.friends :value:index}}
    <li>{{=index + 1}}: {{=value}}</li>
    {{~}}
  </ul>
</body>
</html>
`);
var result = t({
  name: 'Joe Schmoe',
  friends: [
    'Joe',
    'Frank',
    'Reynolds'
  ]
});
console.log(result);