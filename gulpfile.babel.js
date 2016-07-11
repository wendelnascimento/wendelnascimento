'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sequence from 'run-sequence';
import browsersync from 'browser-sync';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import pug from 'gulp-pug';
import babel from 'gulp-babel';
import gutil from 'gulp-util';


const dirs = {
	client: 'client',
	build: 'build',
	node_modules: 'node_modules'
};

const sassPaths = {
	client: [
		`${dirs.client}/**/*.scss`,
		`${dirs.node_modules}/font-awesome/scss/font-awesome.scss`
	],
	build: `${dirs.build}/css/`
};

const jsPaths = {
	client: [`${dirs.client}/js/**/*.js`],
	build: `${dirs.build}/js/`
};

const imgPaths = {
	client: [`${dirs.client}/img/**/*.*`],
	build: `${dirs.build}/img/`
};

const pugPaths = {
	client: [`${dirs.client}/pug/**/*.pug`],
	build: './'
};

const fontPaths = {
	client: [
		`${dirs.client}/fonts/**/*.*`,
		`${dirs.node_modules}/font-awesome/fonts/*.*`
	],
	build: `${dirs.build}/fonts/`
};

gulp.task('browsersync', () => {
	browsersync({
		server: {
			baseDir: './',
			index: 'index.html'
		}
	});
});

gulp.task('fonts', () => {
	return gulp.src(fontPaths.client)
    .pipe(gulp.dest(fontPaths.build));
});

gulp.task('pug', () => {
	return gulp.src(pugPaths.client)
    .pipe(pug())
    .on('error', 
		(err) => {
			gutil.log(gutil.colors.red('[Compilation Error]'));
			gutil.log(gutil.color.red(err.message));
		})
    .pipe(gulp.dest(pugPaths.build));
});

gulp.task('sass', () => {
	return gulp.src(sassPaths.client)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(sassPaths.build))
    .pipe(browsersync.reload({stream: true}));
});

gulp.task('js', () => {
	return gulp.src(jsPaths.client)
		.pipe(concat('main.js', {newLine: ';'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(jsPaths.build))
    .pipe(browsersync.reload({stream: true}));
});

gulp.task('img', () => {
	return gulp.src(imgPaths.client)
    .pipe(gulp.dest(imgPaths.build));
});

gulp.task('build', () => {
	return sequence(['pug', 'fonts', 'sass', 'js', 'img']);
});


gulp.task('default', ['build', 'browsersync'], () => {
	gulp.watch(sassPaths.client, ['sass']);
	gulp.watch(jsPaths.client, ['js']);
	gulp.watch(imgPaths.client, ['img']);
	gulp.watch(pugPaths.client, ['pug']);
});
