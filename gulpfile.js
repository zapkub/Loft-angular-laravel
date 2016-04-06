var elixir = require('laravel-elixir');
var Task = elixir.Task;
var browserify = require('browserify');
var babelify = require('babelify');
var path = require('path');
var gulp = require('gulp');
var conf = require('./gulp/conf.js');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var _ = require('lodash');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace');
var source     = require('vinyl-source-stream');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
 elixir.extend('browserifyAnotate', function(inputFile, inputFileName, outputDirectory) {

        new Task('babelifyInject', function() {
            var b = browserify();
            b.transform(babelify, {presets: ["es2015", "react"]});
            b.add('resources/assets/js/'+inputFile);
            return b.bundle()
                .pipe(source(inputFileName))
                .pipe(ngAnnotate())
                .pipe(gulp.dest(outputDirectory));
        })
        .watch('resources/assets/js/**/*.js');
 });

elixir(function(mix) {
  elixir.config.js.browserify.transformers.push({
    name: 'aliasify',
    options: {}
  })  ;
  mix.sass('app.scss')
    .browserifyAnotate('index.module.js','all.js','public/js/')

});


gulp.task('inject', [], function() {
  return gulp.src(path.join(conf.paths.src + '/views/layouts/src/main.blade.php'))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(useref())
    .pipe(replace('../../../public/', ''))
    .pipe(gulp.dest(path.join(conf.paths.src + '/views/layouts/')))
})
