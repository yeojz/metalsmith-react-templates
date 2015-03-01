/*jslint browser:true */

// Isomorphic React renders twice. Once on the HTML page, once in JavaScript.
// If the props are the same on HTML and JavaScript, the template is synced,
// allowing subsequent updates without destroying user input:
// Modified from: http://www.crmarsh.com/react-ssr/

var EntryTemplate = require('../templates/entry.jsx');
var React = require('react');

// templates/entry.jsx populates this value
var props = JSON.parse(document.getElementById('props').innerHTML);

// Render
var Entry = React.createFactory(EntryTemplate);
React.render(
  new Entry(props),
  document.getElementById('contents')
);
