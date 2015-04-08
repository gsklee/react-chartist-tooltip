import Gulp from 'gulp';
import GulpLoadPlugins from 'gulp-load-plugins';

const _ = GulpLoadPlugins();

Gulp.task('build:scripts',
  () => Gulp.src('react-chartist-tooltip.babel.js')
            .pipe(_.rename('react-chartist-tooltip.js'))
            .pipe(_.babel({
              stage: 0,
              loose: 'all'
            }))
            .pipe(Gulp.dest('.'))
);
