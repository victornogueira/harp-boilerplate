var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');

gulp.task('serve', function () {
  harp.server(__dirname + '/public', {
    port: 9000
  }, function () {
    
    // Browser Sync Proxy
    browserSync({
      proxy: "localhost:9000",
      open: true,
      notify: false
    });
    
    // Watch and Inject CSS
    gulp.watch("public/**/*.scss", function () {
      reload("style.css", {stream: true});
    });
    
    // Watch everything else and reload page
    gulp.watch(["public/**/*.jade", "public/**/*.json", "public/**/*.js"], function () {
      reload();
    });
  })
});

// Make "serve" the default task, so you can simply run 'gulp'
gulp.task('default', ['serve']);