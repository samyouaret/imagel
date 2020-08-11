module.exports = (options) => {
    let isDevMode = options.env.includes('dev');

    if (!isDevMode && !options.env.includes('prod')) {
        throw Error('invalid mode provided');
    }
    let plugins = [
        require('tailwindcss'),
        require('autoprefixer')
    ];
    if (!isDevMode) {
        plugins.push(
            require('@fullhuman/postcss-purgecss')({
                content: [
                    './resources/views/*.ejs',
                    './resources/views/**/*.ejs',
                    './resources/js/*.js',
                    './resources/js/**/*.js',
                ],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
            }),
            require('cssnano')({
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                }]
            })
        );
    }
    return { plugins }
}