var Metalsmith = require('metalsmith');
var reactTemplate = require('metalsmith-react-templates');
var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');

new Metalsmith(__dirname)
    .source('./src')
    .clean(true)
    .use(reactTemplate({
        babel: true,
        directory: 'templates',
        baseFile: 'base.html',
        isStatic: false
    }))
    .destination('./build')
    .build(function(err) {
        if (err) {
            throw err;
        }

        browserify({ debug: true })
            .transform(babelify)
            .require('./scripts/loader.js', { entry: true })
            .bundle()
            .on("error", function (err) {
                console.log("Error: " + err.message);
            })
            .pipe(fs.createWriteStream('./build/bundle.js'));
    });



