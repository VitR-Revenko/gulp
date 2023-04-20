const gulp = require("gulp");
const sass = require("sass");
const gulpSass = require("gulp-sass");
const scss = gulpSass(sass);
const BUILD_FOLDER = "./dist/";
const SRC_FOLDER = "./src/js/*.js";
const SCSS_FOLDER = "./src/scss/*.scss";
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

function watcher() {
  return gulp.watch(SRC_FOLDER, minifyHTML, jsPrep);
}

function scssTask() {
  return gulp.src(SCSS_FOLDER).pipe(scss()).pipe(gulp.dest(BUILD_FOLDER));
}


function jsPrep() {
  return gulp.src(SRC_FOLDER).pipe(uglify()).pipe(concat("build.js")).pipe(gulp.dest(BUILD_FOLDER));
}

function liveServer() {

  browserSync.init({
      server: "./dist/"
  });

  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("*.css").on('change', browserSync.reload);
  gulp.watch("*.js").on('change', browserSync.reload);

}

function minifyHTML() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(BUILD_FOLDER));
}

gulp.task("default", gulp.series(minifyHTML, scssTask, jsPrep, liveServer, watcher));
