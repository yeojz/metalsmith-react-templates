# Static Page Generator with Isomorphic React

This example generates a static site with Metalsmith. It uses React as a template engine on the server and the client. This allows high performance static files while relying on JavaScript to handle dynamic events.

```
npm install
npm run build

# open build/index.html in a browser
```

Note: Higher-order component `withInitialProps` is used in `Entry.jsx` to render initial state into the dom
