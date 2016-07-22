'use strict';

import gulp from 'gulp';
import sequence from 'run-sequence';
import browsersync from 'browser-sync';
import pug from 'gulp-pug';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';


const dirs = {
	client: 'assets',
	build: 'build/assets',
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
	client: [`${dirs.client}/**/*.js`],
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
			gutil.log(gutil.colors.red(err.message));
		})
    .pipe(gulp.dest(pugPaths.build));
});

gulp.task('webpack', (callback) => {
	let myConfig = Object.create(webpackConfig);
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError('webpack:build', err);
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('reload', () => {
	return browsersync.reload({stream: true});
});

// gulp.task('sass', () => {
// 	return gulp.src(sassPaths.client)
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(autoprefixer())
//     .pipe(concat('style.css'))
//     .pipe(gulp.dest(sassPaths.build))
//     .pipe(browsersync.reload({stream: true}));
// });

// gulp.task('js', () => {
// 	return gulp.src(jsPaths.client)
// 		.pipe(webpack( require('./webpack.config.js') ))
// 		// .pipe(concat('index.js', {newLine: ';'}))
//     // .pipe(rename({suffix: '.min'}))
//     // .pipe(babel())
//     // .pipe(uglify())
//     .pipe(gulp.dest(jsPaths.build))
//     .pipe(browsersync.reload({stream: true}));
// });

gulp.task('img', () => {
	return gulp.src(imgPaths.client)
    .pipe(gulp.dest(imgPaths.build));
});

gulp.task('build', () => {
	return sequence(['webpack', 'pug', 'fonts', 'img']);
});


gulp.task('default', ['build', 'browsersync'], () => {
	gulp.watch(sassPaths.client, ['webpack', 'reload']);
	gulp.watch(jsPaths.client, ['webpack', 'reload']);
	gulp.watch(imgPaths.client, ['img', 'pug', 'reload']);
	gulp.watch(pugPaths.client, ['pug', 'reload']);
});
