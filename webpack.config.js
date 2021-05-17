const path                      =   require( 'path' );
const MiniCssExtractPlugin      =   require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin }    =   require( 'clean-webpack-plugin' );
const OptimizeCssAssetsPlugin   =   require( 'optimize-css-assets-webpack-plugin' );
const cssnano                   =   require( 'cssnano' );
const UglifyJsPlugin            =   require( 'uglifyjs-webpack-plugin' );

const JS_DIR                    =   path.resolve(__dirname, 'assets/src/js');
const BUILD_DIR                 =   path.resolve(__dirname, 'assets/build');

const entry = {
    main: JS_DIR + '/index.js'
};
const output = {
    path: BUILD_DIR, 
    filename: 'js/main.js'
};
const rules = [
    {
        test: /\.js$/,
        include: [ JS_DIR ],
        exclude: /node_modules/,
        use: 'babel-loader'
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
    }
];

const plugins = ( argv ) => [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: ( 'production' === argv.mode )
    }),
    new MiniCssExtractPlugin({
        filename: 'css/main.css'
    })
];

module.exports = ( env, argv ) => ({
    entry: entry,
    output: output,
    devtool: 'source-map',
    module: {
        rules: rules
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessor: cssnano
            }),
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: false
            })
        ]
    },
    plugins: plugins( argv ),
    externals: {
        jquery: 'jQuery'
    }
});