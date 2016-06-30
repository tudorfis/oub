var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./app/assets/css/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/assets/css/'))
});
