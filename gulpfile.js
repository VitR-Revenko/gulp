const gulp = require("gulp");
const sass = require("sass");
const gulpSass = require("gulp-sass");
const scss = gulpSass(sass);
const BUILD_FOLDER = "./dist/";
const SRC_FOLDER = "./src/js/*.js";
const SCSS_FOLDER = "./src/scss/*.scss";
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");

function watcher() {
  return gulp.watch(SRC_FOLDER, copy, jsPrep);
}

function copy() {
  return gulp.src("src/*.html").pipe(gulp.dest(BUILD_FOLDER));
}

function scssTask() {
  return gulp.src(SCSS_FOLDER).pipe(scss()).pipe(gulp.dest(BUILD_FOLDER));
}


function jsPrep() {
  return gulp.src(SRC_FOLDER).pipe(uglify()).pipe(concat("build.js")).pipe(gulp.dest(BUILD_FOLDER));
}

gulp.task("default", gulp.series(copy, scssTask, jsPrep, watcher));
