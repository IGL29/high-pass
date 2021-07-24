const { src, dest, series, watch } = require('gulp');

const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const image = require('gulp-image');
const sourceMaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');

const clean = () => {
  return del(['dist'])
};

const cleanCss = () => {
  return del(['dist/styles'])
};

const cleanImg = () => {
  return del(['dist/images'])
};

const html = () => {
  return src('src/**/*.html')
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
};

const htmlProduction = () => {
  return src('src/**/*.html')
  .pipe(htmlMin({ collapseWhitespace: true }))
  .pipe(dest('dist'))
};

const css = () => {
  return src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(dest('dist'))
    .pipe(sourceMaps.write())
    .pipe(browserSync.stream());
};

const cssProduction = () => {
  return src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso())
    .pipe(dest('dist'))
};

const img = () => {
  return src('src/images/*')
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream());
};

const imgProduction = () => {
  return src([
    'src/images/**/*.png',
    'src/images/**/*.jpeg',
    'src/images/**/*.jpg',
  ])
    .pipe(image())
    .pipe(dest('dist/images'))
};

const svg = () => {
  return src('src/images/**/*.svg')
    .pipe(dest('dist/images'))
}

const fonts = () => {
  return src('src/fonts/*')
    .pipe(dest('dist/fonts'))
}

const watcher = () => {
  browserSync.init({
    server: {
        baseDir: "dist"
    }
  });
}

const js = () => {
  return src('src/scripts/**/*')
    .pipe(dest('dist/scripts'))
    .pipe(browserSync.stream());
}

watch('src/*.html', html);
watch('src/styles/**/*.scss', css);
watch('src/scripts/**/*', js);

exports.css = series(cleanCss, css);
exports.html = html;
exports.img = series(cleanImg, img);
exports.fonts = fonts;
exports.cleaner = clean;
exports.js = js;

exports.htmlProduction = htmlProduction;
exports.cssProduction = cssProduction;
exports.imgProduction = imgProduction;

exports.watcher = watcher;

exports.default = series(clean, fonts, img, html, css, js, watcher);
exports.build = series(clean, fonts, htmlProduction, cssProduction, svg, imgProduction, js, watcher);
