var cssNext = require('postcss-cssnext');

module.exports = function() {
    return [
			cssNext({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ]
        })
    ];
};
