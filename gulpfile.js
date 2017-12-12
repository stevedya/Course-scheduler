const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-clean-css');

//Copy all html files to dist
//npm install --save-dev gulp-
gulp.task('copyHtml', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Minify/uglify Js and Css
// npm install --save-dev gulp-uglify
// gulp.task('minify', function () {
//    gulp.src('src/js/**/*.js')
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/js'));
// });

//Scripts Concatenation & minify
//npm install --save-dev gulp-concat
gulp.task('scripts', function () {
    gulp.src('src/js/**/*.js')
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

gulp.task('default', ['copyHtml', 'scripts', 'minifyCss']);