var gulp = require('gulp');
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');

gulp.task('lint', function() {
  return gulp.src([
      './source/ts/**/**.ts', './test/**/**.test.ts', '!./**/*.d.ts'
    ])
    .pipe(tslint())
    .pipe(tslint.report(tslint({
      formatter: "verbose"
    })));
});

var tsProject = ts.createProject({
  removeComments: true,
  noImplicitAny: true,
  target: 'ES3',
  module: 'commonjs',
  declarationFiles: false
});

gulp.task('tsc', function() {
  return gulp.src('./source/ts/**/**.ts').pipe(tsProject()).js.pipe(gulp.dest('./temp/source/js'));
});

var tsTestProject = ts.createProject({
  removeComments: true,
  noImplicitAny: true,
  target: 'ES3',
  module: 'commonjs',
  declarationFiles: false
});

gulp.task('tsc-tests', function() {
  return gulp.src('./test/**/**.test.ts').pipe(tsTestProject()).js.pipe(gulp.dest('./temp/source/js'));
});

var browserrify = require('browserify');
transform = require('vinyl-transform'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps');

var browseriified = transform(function(filename) {
  var b = browserify({
    entries: filename,
    debug: true
  });
  return b.bundle();
})

gulp.task('bundle-js', function() {
  return gulp.src('./temp/surce/js/main.js')
    .pipe(browseriified)
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/source/js/'));
});

gulp.task('bundle-test', function() {
  return gulp.src('./temp/test/**/**.test.js')
    .pipe(browseriified)
    .pipe(gulp.dest('./dist/test/'));
});

var karma = require('gulp-karma');
gulp.task('karma', function(cb) {
  gulp.src('./dist/test/**/**.test.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('end', cb)
    .on('error', function(err) {
      //确保测试失败后让gulp以非0的状态码退出
      console.log(err);
      throw err;
    })
});

var runSequence = require('run-sequence');

gulp.task('build',function(cb){
  runSequence(['tsc', 'tsc-tests'],cb);
});

gulp.task('bundle',function(cb){
  runSequence('build',['bundle-js','bundle-test'],cb);
});

gulp.task('test',function(cb){
  runSequence('bundle',['karma'],cb);
});

var browserSync = require('browser-sync');
gulp.task('browser-sync',['test'],function(){
  browserSync({
    server:{
      baseDir:"./dist"
    }
  });
  return gulp.watch([
    "./dist/source/js/**/*.js",
    "./dist/source/css/**.css",
    "./dist/test/**/**.test.js",
    "./dist/data/**/**",
    "./index.html"
  ],[browserSync.reload]);
});

gulp.task('default', function(cb) {
  runSequence(
    'lint', //lint
    'browser-sync',  //build +bundle + karma = serve
    cb
  );
});
