let imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    cwebp = require('gulp-cwebp'),
    imgPATH = {
        "input": ["./dev/static/images/**/*.{png,jpg,gif,svg}",
            '!./dev/static/images/svg/*'],
        "webpInput": "./dev/static/images/content/*.{png,jpg}",
        "webpOutput": "./build/static/images/content/",
        "ouput": "./build/static/images/"
    };

module.exports = function () {
    $.gulp.task('img:dev', () => {
        return $.gulp.src(imgPATH.input)
            .pipe($.gulp.dest(imgPATH.ouput));
    });

    $.gulp.task('cwebp:dev', () => {
        return $.gulp.src(imgPATH.webpInput)
            .pipe(cwebp())
            .pipe($.gulp.dest(imgPATH.webpOutput));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src(imgPATH.input)
            .pipe(cache(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imageminJpegRecompress({
                    loops: 5,
                    min: 70,
                    max: 75,
                    quality: 'medium'
                }),
                imagemin.svgo(),
                imagemin.optipng({optimizationLevel: 3}),
                pngquant({quality: '65-70', speed: 5})
            ], {
                verbose: true
            })))
            .pipe($.gulp.dest(imgPATH.ouput));
    });
};
