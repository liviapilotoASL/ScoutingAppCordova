var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render')

gulp.task('nunjucks', function() {
  return gulp.src('pages/**/*.+(nunjucks)').pipe(nunjucksRender({path: ['pages']})).pipe(gulp.dest("."))
})