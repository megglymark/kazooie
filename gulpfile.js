var gulp      = require('gulp');
var $         = require('gulp-load-plugins')();
var rimraf    = require('rimraf');
var sequence  = require('run-sequence');

console.log(JSON.stringify($));

var paths = {
  views: [
    'public/views/**/*.html'
  ],
  css: [
    'public/libs/foundation/css/foundation.css',
    'public/libs/foundation/css/normalize.css',
    'public/stylesheets/style.css'
  ],
  componentsJS: [
    'public/libs/angular/angular.js',
    'public/libs/angular-animate/angular-animate.js',
    'public/libs/angular-ui-router/release/angular-ui-router.js',
    'public/libs/fastclick/lib/fastclick.js',
    'public/libs/foundation/js/foundation.js',
    'public/libs/hammerjs/hammer.js',
    'public/libs/jquery-placeholder/jquery.placeholder.js',
    'public/libs/jquery.cookie/jquery.cookie.js',
    'public/libs/jquery/dist/jquery.js',
    'public/libs/modernizr/modernizr.js'
  ],
  appJS: [
    'public/javascripts/app.js',
    'public/javascripts/**/*.js'
  ]
}

//  clean
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

gulp.task('copy', ['copy:views', 'copy:components', 'copy:app', 'copy:css']);

gulp.task('copy:views', function() {
  return gulp.src(paths.views, {
    base: './public'
  })
    .pipe(gulp.dest('./build'))
  ;
});

gulp.task('copy:components', function() {
  return gulp.src(paths.componentsJS)
    .pipe($.concat('components.js'))
    //.pipe($.uglify)
    .pipe(gulp.dest('./build/javascripts/'))
  ;
});

gulp.task('copy:app', function() {
  return gulp.src(paths.appJS)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./build/javascripts/'))
  ;
});

gulp.task('copy:css', function() {
  return gulp.src(paths.css)
    .pipe($.concat('app.css'))
    .pipe(gulp.dest('./build/stylesheets/'))
  ;
});


gulp.task('build', function() {
  sequence('clean', 'copy');
});

gulp.task('default', ['build'], function() {
  gulp.watch([paths.views], ['copy:views']);
  gulp.watch([paths.componentsJS], ['copy:components']);
  gulp.watch([paths.appJS], ['copy:app']);
});

