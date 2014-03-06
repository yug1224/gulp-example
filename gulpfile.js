// Generated by CoffeeScript 1.7.1
(function() {
  var clean, coffee, development, gulp, minify, nodemon, production, src, stylus, uglify;

  gulp = require('gulp');

  coffee = require('gulp-coffee');

  uglify = require('gulp-uglify');

  stylus = require('gulp-stylus');

  minify = require('gulp-minify-css');

  clean = require('gulp-clean');

  nodemon = require('gulp-nodemon');

  src = {
    app: './src/app.coffee',
    routes: './src/routes/*.coffee',
    coffee: './src/coffee/*.coffee',
    stylus: './src/stylus/*.styl',
    images: './src/images/*'
  };

  development = {
    scripts: './public/javascripts/*.js',
    css: './public/stylesheets/*.css',
    images: './public/images/*'
  };

  production = {
    scripts: './build/javascripts/*.js',
    css: './build/stylesheets/*.css',
    images: './build/images/*'
  };

  gulp.task('coffee', function() {
    gulp.src(src.app).pipe(coffee()).pipe(gulp.dest('./'));
    gulp.src(src.routes).pipe(coffee()).pipe(gulp.dest('./routes/'));
    gulp.src(src.coffee).pipe(coffee()).pipe(gulp.dest('./public/javascripts/')).pipe(uglify()).pipe(gulp.dest('./build/javascripts/'));
  });

  gulp.task('stylus', function() {
    gulp.src(src.stylus).pipe(stylus()).pipe(gulp.dest('./public/stylesheets')).pipe(minify()).pipe(gulp.dest('./build/stylesheets/'));
  });

  gulp.task('copy', function() {
    gulp.src(src.images).pipe(gulp.dest('./public/images/')).pipe(gulp.dest('./build/images/'));
  });

  gulp.task('watch', function() {
    gulp.watch([src.app, src.routes, src.coffee], function(event) {
      gulp.run('coffee');
    });
    gulp.watch(src.stylus, function(event) {
      gulp.run('stylus');
    });
    return gulp.watch('./src/images', function(event) {
      gulp.run('copy');
    });
  });

  gulp.task('clean', function() {
    gulp.src(['app.js', './routes/*', './public/*/*', './build/*/*']).pipe(clean());
  });

  gulp.task('nodemon', function() {
    nodemon({
      script: 'app.js',
      env: {
        TZ: 'UTC',
        NODE_ENV: 'development'
      }
    }).on('restart', ['coffee', 'stylus']);
  });

  gulp.task('default', function() {
    gulp.run('clean', 'coffee', 'stylus', 'copy', 'watch', 'nodemon');
  });

}).call(this);