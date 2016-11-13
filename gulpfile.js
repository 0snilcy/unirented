"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var run = require("run-sequence");
var del = require("del");
var csscomb = require("gulp-csscomb");
var pug = require('gulp-pug');
var ghPages = require('gulp-gh-pages');

gulp.task("style", function() {
  gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]
    }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(csscomb())
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });
  gulp.watch("src/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch(["src/*.pug", "src/pug/**/*.pug"], ["views"]);
  gulp.watch("src/js/*.js", ["scripts"]);
  gulp.watch("build/*.html").on("change", server.reload);
  // gulp.watch("src/*.html").on("change", server.reload);
});

gulp.task("images", function() {
  return gulp.src("build/img/**")
  .pipe(imagemin([
     imagemin.optipng({optimizationLevel: 3}),
     imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  return gulp.src("src/img/icons/*.svg")
  .pipe(svgmin())
  .pipe(svgstore({
     inlineSvg: true
     }))
  .pipe(rename("symbols.pug"))
  .pipe(gulp.dest("src/pug/components/"));
});

gulp.task('views', function() {
  return gulp.src("src/*.pug")
  .pipe(plumber())
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest("build/"));
});

gulp.task('scripts', function() {
  return gulp.src("src/js/*.js")
  .pipe(gulp.dest("build/js/"));
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "views",
    "style",
    "images",
    "symbols",
    fn
  );
});

gulp.task("copy", function() {
  return gulp.src([
      "src/fonts/**/*.{woff,woff2,ttf,eot,otf}",
      "src/img/**/*.{png,jpg,gif,ico}",
      "!src/img/icons/",
      "src/js/**",
      "src/*.html"
    ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task("clean", function() {
 return del("build");
});
