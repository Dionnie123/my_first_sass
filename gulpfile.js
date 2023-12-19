
const sass = require("gulp-sass")(require("sass"));
var browserSync = require("browser-sync").create();
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require('gulp-cssnano');
var gulp = require("gulp");


//Say Hello
gulp.task("hello", async function () {
  console.log("Hello Zell");
});

//Convert a sass file into a css file
gulp.task("sass-one", function () {
  return gulp
    .src("app/scss/styles.scss")
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest("app/css"));
});

//Convert multiple sass files using pattern matching
gulp.task("sass-all", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("optimize", function () {
  return gulp
    .src("app/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest("dist")).pipe(
        browserSync.reload({
          stream: true,
        })
      );;
});

//Watch out for changes
gulp.task("watch", function () {
  browserSync.init({
    server: "./app",
  });
  gulp.watch("app/scss/**/*.scss", gulp.series("sass-all"));
  gulp.watch("app/*.html", gulp.series("optimize"));
  gulp.watch("app/js/**/*.js", gulp.series("optimize"));
});
