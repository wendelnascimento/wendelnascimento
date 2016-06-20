'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sequence from 'run-sequence';
import browsersync from 'browser-sync';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';


const dirs = {
  client: 'client',
  build: 'build'
};

const sassPaths = {
  client: `${dirs.client}/**/*.scss`,
  build: `${dirs.build}/css/`
}

const jsPaths = {
  client: [`${dirs.client}/scss/**/*.js`],
  build: `${dirs.build}/js/`
}

const imgPaths = {
  client: [`${dirs.client}/img/**/*.*`],
  build: `${dirs.build}/img/`
}

gulp.task('browsersync', () => {
  browsersync({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  })
})

gulp.task('sass', () => {
  return gulp.src(sassPaths.client)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(sassPaths.build))
    .pipe(browsersync.reload({stream: true}))
});

gulp.task('js', () => {
  return gulp.src(jsPaths.client)
    .pipe(gulp.dest(jsPaths.build))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(jsPaths.build))
    .pipe(browsersync.reload({stream: true}))
})

gulp.task('img', () => {
  return gulp.src(imgPaths.client)
    .pipe(gulp.dest(imgPaths.build))
})

gulp.task('build', () => {
  return sequence(['sass', 'js', 'img'])
})

gulp.task('default', ['build', 'browsersync'], () => {
  gulp.watch(sassPaths.client, ['sass']);
  gulp.watch(jsPaths.client, ['js']);
})



