var Entry = require('../templates/entry.jsx');
var React = require('react');

var props = JSON.parse(document.querySelector("#props").innerHTML);
React.renderComponent(Entry(props), document.querySelector('body'));
