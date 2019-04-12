var browserSync  = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	concat       = require('gulp-concat'),
	minCSS       = require('gulp-clean-css'),
	imageMin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	rename       = require("gulp-rename"),
	uglify       = require('gulp-uglify'),
	clean        = require('gulp-clean');

function initProductionServer() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
}

function initBrowserSyncAndWatch() {
	browserSync.init({
		proxy: "Nash-Kamen"
	});
	gulp.watch('app/sass/**/*.+(scss|sass)').on('change', compileSass);
	gulp.watch(['app/js/**/*.js','app/**/*.html','app/**/*.php']).on('change', browserSync.reload);
};

function compileSass() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
};

function includeJSLibs() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/wow/dist/wow.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('app/js'));
};

function includeCSSLibs() {
	return gulp.src('app/libs/animate.css/animate.css')
		.pipe(concat('libs.min.css'))
		.pipe(gulp.dest('app/css'));
}

function buildJS() {
	return gulp.src('app/js/**/*')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
}

function buildCSS() {
	return gulp.src('app/css/**/*')
		.pipe(minCSS())
		.pipe(gulp.dest('dist/css'));
}

function buildHTML() {
	return gulp.src(['app/*.html','app/**/*.php'])
		.pipe(gulp.dest('dist'));
}

function buildImages() {
	return gulp.src('app/img/**/*')
		.pipe(imageMin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
};

function buildFonts() {
	return gulp.src('app/fonts/**')
		.pipe(gulp.dest('dist/fonts'));
};

function cleanDirectory() {
	return gulp.src('dist/*', {read:false})
		.pipe(clean());
}

exports.server = initProductionServer;
exports.cleanDist = cleanDirectory;
exports.sass = compileSass;
exports.includeLibs = gulp.series(includeJSLibs,includeCSSLibs);

exports.watch = gulp.series(compileSass, initBrowserSyncAndWatch);
exports.build = gulp.series(cleanDirectory,buildImages,buildFonts,includeJSLibs,includeCSSLibs,buildHTML,buildCSS,buildJS);

exports.clean = cleanDirectory;
exports.buildCss = buildCSS;
exports.buildJs = buildJS;
exports.buildFnt = buildFonts;
exports.standartBuild = gulp.series(cleanDirectory, compileSass, buildHTML, buildCSS, buildJS, buildImages, buildFonts, initProductionServer);

exports.default = gulp.series(compileSass, initBrowserSyncAndWatch);