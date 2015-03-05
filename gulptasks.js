import Gulp from 'gulp';
import $ from 'gulp-load-plugins';

$ = $();

Gulp.task('build:scripts',
  () => Gulp.src('react-chartist-tooltip.js')
            .pipe($.rename('react-chartist-tooltip.min.js'))
            .pipe($.babel({
              loose: 'all',
              experimental: true
            }))
            .pipe($.uglify())
            .pipe(Gulp.dest('.'))
);
