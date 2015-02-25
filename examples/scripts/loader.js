var Entry = require('../templates/entry.jsx');
var React = require('react');

// Isomorphic React renders twice. Once on the HTML page, once in JavaScript. If the props are the same on HTML and JavaScript, the template is synced, allowing subsequent updates without destroying user input: http://www.crmarsh.com/react-ssr/
var props = JSON.parse(document.querySelector("#props").innerHTML); // templates/entry.jsx populates this value
React.renderComponent(Entry(props), document.querySelector('body'));
