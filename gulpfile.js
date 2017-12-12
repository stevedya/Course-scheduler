const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-clean-css');
const minifyJs = require('gulp-js-minify');

//Copy all html files to dist
//npm install --save-dev gulp-
gulp.task('copyHtml', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
//move files
gulp.task('copyFonts', function () {
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});
gulp.task('copyImg', function () {
    gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});
gulp.task('copyVendor', function () {
    gulp.src('src/vendor/**/*.*')
        .pipe(gulp.dest('dist/vendor/'));
});

var scripts = [
    'src/js/models/*.js',
    'src/js/collections/*.js',
    'src/js/views/*.js',
    'src/js/routers/*.js',
    'src/js/*.js'
];
// Minify/uglify Js and Css
// npm install --save-dev gulp-uglify
gulp.task('minify', function () {
   gulp.src(scripts)
       .pipe(uglify())
       .pipe(gulp.dest('dist/js'));
});

//Just minify templates
gulp.task('minifyTemplates', function () {
   gulp.src('src/templates/*.js')
       .pipe(minifyJs())
       .pipe(gulp.dest('dist/templates'))
});

//Scripts Concatenation & minify
//npm install --save-dev gulp-concat
gulp.task('scripts', function () {
    gulp.src(scripts)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//Minify Css
//npm instal --save-dev gulp-minifier
gulp.task('minifyCss', function () {
    gulp.src('src/css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

//default tasks
gulp.task('default', ['copyHtml', 'scripts', 'minifyCss', 'copyFonts', 'copyImg', 'copyVendor', 'minifyTemplates']);

//Tasks to watch for changes
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch(scripts, ['scripts']);
    gulp.watch('src/css/*.css', ['minifyCss']);
    gulp.watch('src/fonts/**/*.*', ['copyFonts']);
    gulp.watch('src/img/**/*.*', ['copyImg']);
    gulp.watch('src/vendor/**/*.*', ['copyVendor']);
    gulp.watch('src/templates/*.js', ['minifyTemplates']);
});